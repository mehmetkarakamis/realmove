import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/Axios.js";
import BottomBar from "../bottom-bar";
import Loading from "../loading/index.js";
import Toast from "../toast";
import TopNavigation from "../top-navigation";
import Types from "../../utils/Types.js";
import { Button, Divider, Icon, List, ListItem, Modal, Card, Text, Input } from "@ui-kitten/components";
import { Image, StyleSheet, View } from "react-native";
import { Pages } from "react-native-pages";

class AdvertDetails extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			advert: [],
			loading: false,
			visible: false,
			message: ""
		}
	}


	componentDidMount() {
		this.getAdvert(this.props.route.params.id);
		this.requestUser();
	}

	addFavorite = async() => {
		const data = new FormData();
		data.append("advertId", this.state.advert.advertId);
		axios.patch("/users-ws/api/user/favorites", data, {
			headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}` }
		})
		.then(() => {
			Toast.success("Bu ilan favorilerinize eklendi!");
		})
		.catch(() => {
			Toast.error("Favorilere eklenemedi!");
		});
	}

	getAdvert = (id) => {
		this.setState({ loading: true }, async() => {
			axios.get(`/adverts-ws/api/advert?advertId=${id}`, {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}` }
			})
			.then((response) => {
				this.setState({ advert: response.data });
			})
			.catch(() => {
				Toast.error("İlan getirilemedi!");
			})
			.finally(() => { this.setState({ loading: false }); });
		});
	}

	navigateProfile = () => {
		this.props.navigation.replace("Profile", { id: this.state.advert.userId });
	}

	onSend = async() => {

		this.setState({visible: true});
		const data = new FormData();

		console.log("fromUserId");
		console.log(this.state.userId);

		console.log("toUserId");
		console.log(this.state.advert.userId);
		
		console.log("Content");
		console.log(this.state.message);

		console.log("advertId");
		console.log(this.state.advert.advertId);

		data.append("fromUserId", this.state.userId);
		data.append("toUserId", this.state.advert.userId);
		data.append("Content", this.state.message);
		data.append("advertId", this.state.advert.advertId);
		axios.post("/users-ws/api/messages", data, {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}` }
		})
		.then(() => {
				Toast.success("Mesajınız gönderildi!");
				this.setState({visible: false});
		})
		.catch((err) => {
			console.log(JSON.stringify(err.response), null, 2);
			Toast.error("Mesajınız gönderilemedi!");
		});
	}

	requestUser = () => {
		this.setState({ loading: true }, async() => {
            console.log("reques user token")
            console.log(await AsyncStorage.getItem("@token"));
			axios.get("/users-ws/api/user", {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}`}
			})
			.then((response) => {
                this.setState({ userId: response.data.userId });
				console.log(response.data);
				console.log("useridyavvv");
				console.log(this.state.userId);
			})
			.catch(() => {
                
				Toast.error("Sunucuya bağlanırken hata ile karşılaşıldı USER ID için!");
			})
			.finally(() => { this.setState({ loading: false }); });
		});
    }

	starIcon = (props) => <Icon {...props} name="star" />

	render() {
		return (
			<Loading loading={this.state.loading}>
				<View style={CSS.advert_details}>
					<TopNavigation navigation={this.props.navigation} title="İlan Detayları" />

						<View style={CSS.carousel}>
							<Pages>
								{this.state.advert.advertPictures?.map((image, index) => {
									return <Image key={index} source={{uri: image}} style={CSS.images} />;
								})}
							</Pages>
						</View>

						<Modal visible={this.state.visible}>
							<Card disabled={true}>
							<Text>İlan sahibine mesaj gönderin 😻</Text>
							<Input
								multiline={true}
								textStyle={{ minHeight: 64 }}
								placeholder='Mesajınız'
								style={CSS.height}
								onChangeText={(value) => this.setState({message: value})}
								
							/>
							<Button onPress={() => this.onSend()}>
								Gönder
							</Button>
							</Card>
						</Modal>

						<View style={CSS.button_container}>
							<Button accessoryLeft={this.starIcon} onPress={this.addFavorite} size="small" />
							<Button onPress={() => this.setState({visible: true}) }size="small" status="success">Mesaj Gönder</Button>
							<Button onPress={this.navigateProfile} size="small" status="success">Kullanıcı Profili</Button>
						</View>

						<List
							data={Object.entries(this.state.advert)}
							ItemSeparatorComponent={Divider}
							renderItem={({item, index}) => {
								if(Object.keys(Types).includes(item[0]))
									return <ListItem key={index} description={item[1]} title={Types[item[0]]} />
							}}
						/>

					<BottomBar index={0} navigation={this.props.navigation} />
				</View>
			</Loading>
		);
	}
}

const CSS = StyleSheet.create({
	advert_details: {
		height: "100%"
	},
	carousel: {
		height: "25%"
	},
	images: {
		height: "100%"
	},
	button_container: {
		padding: "2%",
		backgroundColor: "#FFF",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	height: {
		marginTop: 8
	}
})

export default AdvertDetails;