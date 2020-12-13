import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/Axios.js";
import BottomBar from "../bottom-bar";
import Toast from "../toast";
import TopNavigation from "../top-navigation";
import { Button, List, ListItem, Input, Spinner, Text } from "@ui-kitten/components";
import { Image, StyleSheet, View } from "react-native";

class Profile extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			profile: {},
			loading: false
		}
	}

	componentDidMount() {
		if(this.props?.route?.params?.id) this.getOtherProfile(this.props?.route?.params?.id);
		else this.getProfile();
	}

	getProfile = () => {
		this.setState({ loading: true }, async() => {
			axios.get("/users-ws/api/user/userDetails", {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}` }
			})
			.then((response) => {
				if(response.data.fullName === null) Toast.info("Kullanıcı bilgileri eksik! Lütfen tamamlayınız!");
				this.setState({ profile: response.data });
			})
			.catch((e) => {
				Toast.error("Profil getirilemedi!");
			})
			.finally(() => { this.setState({ loading: false }); });
		});
	}

	getOtherProfile = (id) => {
		this.setState({ loading: true }, async() => {
		axios.get("/users-ws/api/user/other/userDetails", {
			params: { userId: id },
			headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}` }
		})
		.then((response) => {
			this.setState({ profile: response.data });
		})
		.catch(() => {
			Toast.error("Profil getirilemedi!");
		})
		.finally(() => { this.setState({ loading: false }); });
		});
	}

	handleChoosePhoto = () => {
		ImagePicker.launchImageLibrary({ noData: true }, response => {
			if(response.uri) {
				this.setState({ photo: response });
			}
		});
	};


	renderFavorites = ({ item, index }) => {
		return <ListItem onPress={() => this.props.navigation.navigate("AdvertDetails", { id: item })} title={item} key={index} />
	}

	saveProfile = async() => {
		const data = new FormData();
		data.append("fullName", this.state.profile.fullName);
		data.append("phoneNumber", this.state.profile.phoneNumber);
		axios.patch("/users-ws/api/user/userDetails", data, {
			headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}` }
		})
		.then(() => {
			Toast.success("Bilgiler başarıyla güncellendi!");
			this.props.navigation.replace("Profile");
		})
		.catch(() => {
			Toast.error("Bilgiler güncellenemedi!");
		})
	}

	setFullname = (event) => { this.setState({ profile: { ...this.state.profile, fullName: event } }); }

	setPhoneNumber = (event) => { this.setState({ profile: { ...this.state.profile, phoneNumber: event } }); }

	render() {
		return (
			<View style={CSS.advert_details}>
				<TopNavigation title="Profil" />

				<View style={CSS.container}>
					{this.state.loading ?
					<View style={CSS.spinner}>
						<Spinner size="large" />
					</View>
					:
					<View style={CSS.field}>
						<View style={CSS.pp_container}>
							<Image source={{uri: this.state.profile.profilePicture}} style={CSS.pp} />
						</View>

						<Input
							caption="Tam isim"
							disabled={this.props?.route?.params?.id}
							onChangeText={this.setFullname}
							placeholder="Tam isim"
							value={this.state.profile.fullName}
						/>

						<Input
							caption="Telefon numarası"
							disabled={this.props?.route?.params?.id}
							onChangeText={this.setPhoneNumber}
							placeholder="Telefon numarası"
							value={this.state.profile.phoneNumber}
						/>

						{!this.props?.route?.params?.id &&
						<>
							<Text category="p1" style={CSS.head}>Favoriler</Text>
							<List
								data={this.state.profile.favorites}
								renderItem={this.renderFavorites}
							/>

						<Button onPress={this.saveProfile} size="small" style={CSS.save_button}>Kaydet</Button>
						</>
						}
					</View>
					}
				</View>

				<BottomBar index={3} navigation={this.props.navigation} />
			</View>
		);
	}
}

const CSS = StyleSheet.create({
	advert_details: {
		display: "flex",
		height: "100%"
	},
	container: {
		flex: 1
	},
	spinner: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	},
	pp_container: {
		marginBottom: "3%",
		alignItems: "center"
	},
	pp: {
		borderRadius: 50,
		height: 100,
		width: 100
	},
	field: {
		padding: "2%"
	},
	head: {
		marginBottom: "2%",
		marginTop: "2%"
	},
	save_button: {
		marginTop: "2%"
	}
})

export default Profile;