import React from "react";
<<<<<<< HEAD
import axios from "../../utils/Axios.js";
import Toast from "react-native-toast-message";
import BottomBar from "../bottom-bar";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { Button, Input, Text, Icon, TopNavigation, List } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";


=======
import BottomBar from "../bottom-bar";
import TopNavigation from "../top-navigation";
import { Button, Icon, List, ListItem, Text, Avatar } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

>>>>>>> 33d8e13a063e7c7b57ec295b000e18987837b41e
const renderItemAccessory = () => (
	<Button size="small">Gözat</Button>
);

const renderItemIcon = (props) => (
	<Icon name="home" {...props} />
);

const renderItem = ({ item }) => (
	<ListItem
<<<<<<< HEAD
		title={item.phoneNumber}
		description={item.fullName}
		accessoryLeft={renderItemIcon}
		accessoryRight={renderItemAccessory}
	
=======
		title={item.title}
		description={item.description}
		accessoryLeft={renderItemIcon}
		accessoryRight={renderItemAccessory}
>>>>>>> 33d8e13a063e7c7b57ec295b000e18987837b41e
	/>
);

class Profile extends React.PureComponent {
<<<<<<< HEAD
    constructor() {
		super();
		this.state = {
			user: [],
		}
	}

	componentDidMount(){
		this.requestUser();
	}

	requestUser = () => {
		axios.get("/users-ws/api/user/userDetails", {
			headers: {
				'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjODAyMTBiOC1mNmU2LTRhMzMtOWIxMS0yODhjMTE4Y2FmMTEiLCJleHAiOjE2MDY0NjIyMjZ9.pQLuMWQ64eCnu235265i1-h-RNmhNQjhvFGi9dRY5dk8jCHApkd6ULN1p7It28y6mn231x69rMjKBNYJ36vV8g'
			}
		})
		.then(async(response) => {
			console.log("başarıyla kullanıcı alındı");
			console.log(response.data);
			const user = response.data;
			this.setState({ user });
		})
		.catch((err) => {
			console.log(err);
			console.log("catch");
		})
    }
=======
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
>>>>>>> 33d8e13a063e7c7b57ec295b000e18987837b41e


	render() {
		return (
			<>
				<TopNavigation title="Profil" />
<<<<<<< HEAD
                    <View style={CSS.input_container}>
                        {/* <Icon fill="#8F9BB3" name="home" style={CSS.icon} /> */}
                        <List
						data={this.state.user}
						renderItem={renderItem}
					/>

                    </View>
                <BottomBar />
=======
					<Text style={CSS.input__text}>Omercan Celikler</Text>
				<BottomBar index={2} navigation={this.props.navigation} />
>>>>>>> 33d8e13a063e7c7b57ec295b000e18987837b41e
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
<<<<<<< HEAD
=======
	},
	spinner: {
		marginTop: "10%"
>>>>>>> 33d8e13a063e7c7b57ec295b000e18987837b41e
	}
});

export default Profile;