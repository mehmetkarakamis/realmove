import React from "react";
import BottomBar from "../bottom-bar";
import TopNavigation from "../top-navigation";
import { Button, Icon, List, ListItem, Text, Avatar } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

const renderItemAccessory = () => (
	<Button size="small">Gözat</Button>
);

const renderItemIcon = (props) => (
	<Icon name="home" {...props} />
);

const renderItem = ({ item }) => (
	<ListItem
		title={item.title}
		description={item.description}
		accessoryLeft={renderItemIcon}
		accessoryRight={renderItemAccessory}
	/>
);

class Profile extends React.PureComponent {
	constructor() {
		super();
		this.state = {
		
			loading: false
		}
	}


	// requestUserLogin = () => {
	// 	this.setState({ loading: true }, () => {
	// 		axios.get("/users-ws/api/user/login ", {
	// 			email: this.state.email,
	// 			password: this.state.password
	// 		})
	// 		.then(async(response) => {
	// 			Toast.show("Giriş başarılı!");
	// 			await AsyncStorage.setItem("@token", response.data.token);
	// 			this.props.navigation.navigate("List");
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 			Toast.show("Kullanıcı adı veya şifre hatalı!");
	// 		})
	// 		.finally(() => { this.setState({ loading: false }); });
	// 	})
	// }


	render() {
		return (
			<>
				<TopNavigation title="Profil" />
					<Text style={CSS.input__text}>Omercan Celikler</Text>
				<BottomBar index={2} navigation={this.props.navigation} />
			</>
		);
	}
}


const CSS = StyleSheet.create({
	icon: {
		width: 64,
		height: 64,
		marginBottom: 12
	},
	input_container: {
		marginTop: "5%",
		display: "flex",
		alignItems: "center"
	},
	input: {
		marginBottom: "1%",
		marginTop: "1%",
		width: "90%"
	},
	input__text: {
		marginBottom: "0.50%",
		fontSize: 14,
		fontWeight: "700"
	},
	spinner: {
		marginTop: "10%"
	}
});

export default Profile;