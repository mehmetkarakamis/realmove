import React from "react";
import axios from "../../utils/Axios.js";
import Toast from "react-native-toast-message";
import BottomBar from "../bottom-bar";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { Button, Input, Text, Icon, TopNavigation, List } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";


const renderItemAccessory = () => (
	<Button size="small">Gözat</Button>
);

const renderItemIcon = (props) => (
	<Icon name="home" {...props} />
);

const renderItem = ({ item }) => (
	<ListItem
		title={item.phoneNumber}
		description={item.fullName}
		accessoryLeft={renderItemIcon}
		accessoryRight={renderItemAccessory}
	
	/>
);

class Profile extends React.PureComponent {
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


	render() {
		return (
			<>
				<TopNavigation title="Profil" />
                    <View style={CSS.input_container}>
                        {/* <Icon fill="#8F9BB3" name="home" style={CSS.icon} /> */}
                        <List
						data={this.state.user}
						renderItem={renderItem}
					/>

                    </View>
                <BottomBar />
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
	}
});

export default Profile;