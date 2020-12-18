import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/Axios.js";
import BottomBar from "../bottom-bar";
import Loading from "../loading/index.js";
import Toast from "../toast";
import TopNavigation from "../top-navigation";
import Types from "../../utils/Types.js";
import { Button, Divider, Icon, List, ListItem } from "@ui-kitten/components";
import { Image, StyleSheet, View } from "react-native";
import { Pages } from "react-native-pages";

class AdvertDetails extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			advert: [],
			loading: false
		}
	}

	componentDidMount() {
		this.getAdvert(this.props.route.params.id);
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

						<View style={CSS.button_container}>
							<Button accessoryLeft={this.starIcon} onPress={this.addFavorite} size="small" />
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
	}
})

export default AdvertDetails;