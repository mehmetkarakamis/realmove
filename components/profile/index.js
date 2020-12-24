import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/Axios.js";
import BottomBar from "../bottom-bar";
import Loading from "../loading";
import Toast from "../toast";
import TopNavigation from "../top-navigation";
import { Button, List, ListItem, Icon, Input, Text } from "@ui-kitten/components";
import { Image, StyleSheet, Platform,  View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

class Profile extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			profile: {},
			loading: false
		},
		this.pp = null;
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
				this.setState({ profile: response.data }, () => {
					this.requestAdverts(response.data.favorites);
				});
			})
			.catch(() => {
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
		launchImageLibrary({ noData: true }, response => {
			if(response.uri) {
				this.setState({ profile: {...this.state.profile, profilePicture: response.uri } });
				this.pp = response;
			}
		});
	};

	deleteFavorites = (id) => (
		<Button size="small" onPress={() => this.deleteFav(id)}>Sil</Button>
	)

	deleteFav = (id) => {
		this.setState({ loading: true }, async() => {
			const data = new FormData();
			data.append("advertId", id);
			axios.patch("/users-ws/api/user/favorites", data, {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}` }
			})
			.then(() => {
				this.getProfile();
			})
			.catch(() => {
				Toast.error("Favori silinemedi!");
			});
		});
	}

	renderFavorites = ({ item, index }) => {
		try {
			return <ListItem accessoryRight={() => this.deleteFavorites(item.advertId)} onPress={() => this.props.navigation.navigate("AdvertDetails", { id: item.advertId })} title={item.title} key={index} />
		}
		catch { return <></> }
	}

	replaceMyAdverts = () => {
		this.props.navigation.replace("MyAdverts");
	}

	requestAdverts = (favorites) => {
		this.setState({ loading: true }, async() => {
			axios.get("/adverts-ws/api/advert/all", {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}`}
			})
			.then((response) => {
				const favorites_new = response.data.reduce((accumulator, value) => {
					if(favorites.includes(value.advertId)) {
						accumulator.push({
							advertId: value.advertId,
							title: value.title
						});
					}
					return accumulator;
				}, []);
				const profile = { ...this.state.profile, favorites: favorites_new };
				this.setState({ profile });
			})
			.catch(() => {
				Toast.error("Sunucuya bağlanırken hata ile karşılaşıldı!");
			})
			.finally(() => { this.setState({ loading: false }); });
		});
	}

	saveProfile = () => {
		this.setState({ loading: true }, async() => {
			const data = new FormData();
			data.append("fullName", this.state.profile.fullName);
			data.append("phoneNumber", this.state.profile.phoneNumber);
			data.append("profilePicture", {
				name: this.pp.fileName,
				type: this.pp.type,
				uri: Platform.OS === "android" ? this.pp?.uri : this.pp?.uri.replace("file://", "")
			});
			axios.patch("/users-ws/api/user/userDetails", data, {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}` }
			})
			.then(() => {
				Toast.success("Bilgiler güncellendi!");
				this.props.navigation.replace("Profile");
			})
			.catch(() => {
				Toast.error("Bilgiler güncellenemedi!");
			})
			.finally(() => { this.setState({ loading: false }); });
		});
	}

	setFullname = (event) => { this.setState({ profile: { ...this.state.profile, fullName: event } }); }

	setPhoneNumber = (event) => { this.setState({ profile: { ...this.state.profile, phoneNumber: event } }); }

	signOut = async() => {
		AsyncStorage.removeItem("@token");
		this.props.navigation.replace("Login");
	}

	render() {
		return (
			<Loading loading={this.state.loading}>
				<TopNavigation title="Profil" />

				<View style={CSS.container}>
					<Button onPress={this.props.navigation.navigate("Messages")}>Mesajlar</Button>
					<View style={CSS.pp_container}>
						{this.state.profile.profilePicture ?
						<Image source={{uri: this.state.profile.profilePicture}} style={CSS.pp} />
						:
						<Button
							accessoryLeft={() =>
								<Icon
									fill="#8F9BB3"
									name="plus"
									style={CSS.pp_icon}
							/>
							}
							appearance="ghost"
							onPress={this.handleChoosePhoto}
						/>
						}
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
						<Button appearance="ghost" onPress={this.replaceMyAdverts}>İlanlarım</Button>

						<Text category="p1" style={CSS.head}>Favoriler</Text>
						<List
							data={this.state.profile.favorites}
							renderItem={this.renderFavorites}
						/>
					
					<Button onPress={this.saveProfile} size="small">Kaydet</Button>

					<Button style={CSS.sign_out} onPress={this.signOut} size="small" status="danger">Çıkış Yap</Button>
					</>
					}
				</View>

				<BottomBar index={3} navigation={this.props.navigation} />
			</Loading>
		);
	}
}

const CSS = StyleSheet.create({
	advert_details: {
		display: "flex",
		height: "100%"
	},
	container: {
		padding: "2%",
		flex: 1
	},
	pp_container: {
		marginBottom: "3%",
		alignItems: "center",
		justifyContent: "center"
	},
	pp_icon: {
		height: 64,
		width: 64
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
	sign_out: {
		marginTop: "2%"
	}
})

export default Profile;