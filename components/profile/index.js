import React from "react";
import BottomBar from "../bottom-bar";
import TopNavigation from "../top-navigation";
import { Button, Icon, List, ListItem } from "@ui-kitten/components";

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
					<List
						data={
							[
								{
									title: "Konut 1",
									description: "Konut 1 açıklaması"
								},
								{
									title: "Konut 2",
									description: "Konut 2 açıklaması"
								}
							]
						}
						renderItem={renderItem}
					/>
				<BottomBar index={2} navigation={this.props.navigation} />
			</>
		);
	}
}

export default Profile;