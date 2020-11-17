import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/Axios.js";
import BottomBar from "../bottom-bar";
import Toast from "react-native-simple-toast";
import TopNavigation from "../top-navigation";
import { Button, List, ListItem } from "@ui-kitten/components";
import { Image, StyleSheet } from "react-native";

class Listing extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			advert_list: []
		}
	}

	componentDidMount(){
		this.requestAdverts();
	}

	renderItemLeft = (advert_pictures) => () => (
		<Image
			source={{ uri: advert_pictures[0] }}
			style={CSS.property_image}
		/>
	);
	
	renderItemRight = (id) => () => (
		<Button onPress={() => this.props.navigation.navigate("AdvertDetails", { id })} size="small">Gözat</Button>
	);

	requestAdverts = async() => {
		axios.get("/adverts-ws/api/advert/all", {
			headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}`}
		})
		.then((response) => {
			this.setState({ advert_list: response.data });
		})
		.catch(() => {
			Toast.show("Sunucuya bağlanırken hata ile karşılaşıldı!");
		})
	}
	render() {
		return (
			<>
				<TopNavigation title="Vitrin" />
					<List
						data={this.state.advert_list}
						renderItem={(data) => {
							return <ListItem
								accessoryLeft={this.renderItemLeft(data.item.advertPictures)}
								accessoryRight={this.renderItemRight(data.item.advertId)}
								description={data.item.description}
								title={data.item.title}
							/>
						}}
					/>
				<BottomBar index={0} navigation={this.props.navigation} />
			</>
		);
	}
}

const CSS = StyleSheet.create({
	property_image: {
		height: 75,
		width: 75
	}
});

export default Listing;