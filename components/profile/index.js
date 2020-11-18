import React from "react";
import axios from "../../utils/Axios.js";
import BottomBar from "../bottom-bar";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { Button, Input, Text, Icon, TopNavigation, List, ListItem, Spinner } from "@ui-kitten/components";
import { StyleSheet, View, Image } from "react-native";


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
			loading: true
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
			this.setState({loading: false})
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
			<View style={CSS.generalSection}>
				{this.state.loading &&
					<View style={CSS.spinner}>
						<Spinner />
					</View>
					}
				<View style={CSS.logout}>
					<Text category='h1'>Profile Details</Text>
					<Button size="tiny" onPress={() => this.props.navigation.navigate("Login")} >Çıkış</Button>
				</View>
										<View>
											<View style={CSS.logoContainer}>
												<Image style={CSS.tinyLogo} source={{
          											uri: `${this.state.user.profilePicture}`
        											}}/>
											</View>
											<Text>Username: {this.state.user.fullName}</Text>
											<Text>Phone Number: {this.state.user.phoneNumber}</Text>
												{/* <Icon fill="#8F9BB3" name="home" style={CSS.icon} /> */}
												<Text category='h5' style= {CSS.sectionDivide}>Favorite Houses</Text>
											<List
											data={this.state.user.favorites}
											renderItem={renderItem}
											/>
										</View>
								
			</View>			
			<BottomBar index={3} navigation={this.props.navigation} />							
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
		marginBottom: "10%"
	},
	logoContainer: {
		display: "flex",
		alignItems: "center"
	},
	tinyLogo: {
		margin: 30,
		width: 150,
		height: 150,
		borderRadius: 100
	},
	sectionDivide: {
		marginTop: 20,
		marginBottom: 10
	},
	generalSection: {
		margin: 10
	},
	logout: {
		display: "flex",
		flexDirection: 'row',
		justifyContent: 'space-between',
	}
});

export default Profile;