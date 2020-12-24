import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/Axios.js";
import BottomBar from "../bottom-bar";
import Loading from "../loading/index.js";
import Toast from "../toast";
import TopNavigation from "../top-navigation";
import { Button, List, ListItem, Text } from "@ui-kitten/components";
import { Image, StyleSheet, View } from "react-native";

class MyAdverts extends React.Component {
	constructor() {
		super();
		this.state = {
			advert_list: [],
			loading: false
		}
	}

	componentDidMount() {
		this.getUserId();
	}

	delete = (id) => {
		this.setState({ loading: true }, async() => {
			const data = new FormData();
			data.append("advertId", id);
			axios.delete("/adverts-ws/api/advert", data, {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}`}
			})
			.then(() => {
				Toast.success("İlan başarıyla silindi!");
				this.getUserId();
			})
			.catch(() => {
				Toast.error("İlan silinirken hata ile karşılaşıldı!");
			})
			.finally(() => { this.setState({ loading: false }); });
		});
	}

	getUserId = () => {
		this.setState({ loading: true }, async() => {
			axios.get("/users-ws/api/user", {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}`}
			})
			.then((response) => {
				this.requestAdverts(response.data.userId);
			})
			.catch(() => {
				Toast.error("Sunucuya bağlanırken hata ile karşılaşıldı!");
			})
			.finally(() => { this.setState({ loading: false }); });
		});
	}

	renderRight = (id) => () => (
		<Button onPress={() => this.delete(id)} size="small" status="danger">Sil</Button>
	);

	requestAdverts = (user_id) => {
		this.setState({ loading: true }, async() => {
			axios.get("/adverts-ws/api/advert/all", {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}`}
			})
			.then((response) => {
				this.setState({ advert_list: response.data.filter(({ userId }) => userId === user_id) });
			})
			.catch(() => {
				Toast.error("Sunucuya bağlanırken hata ile karşılaşıldı!");
			})
			.finally(() => { this.setState({ loading: false }); });
		});
	}

	render() {
		return (
			<Loading loading={this.state.loading}>
				<TopNavigation title="İlanlarım" />

				<List
						data={this.state.advert_list}
						renderItem={({ item }) => {
							return <ListItem
								accessoryRight={this.renderRight(item.advertId)}
								description=
								{<View>
									<Text appearance="hint" category="p2">{item.description}</Text>
									<Text appearance="hint" category="p2">{item.city} - {item.district}</Text>
									<Text appearance="hint" category="p2">{item.advertType} - {item.price}₺</Text>
								</View>}
								title={item.title}
							/>
						}}
					/>

				<BottomBar index={3} navigation={this.props.navigation} />
			</Loading>
		);
	}
}

const CSS = StyleSheet.create({
	list: {
		height: "100%"
	},
	property_image: {
		height: 75,
		width: 75
	}
});

export default MyAdverts;