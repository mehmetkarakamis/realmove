import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/Axios.js";
import BottomBar from "../bottom-bar";
import Carousel from "react-native-snap-carousel";
import Toast from "react-native-simple-toast";
import TopNavigation from "../top-navigation";
import { Image, StyleSheet, View } from "react-native";

class AdvertDetails extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			advert: {}
		}
	}

	componentDidMount() {
		this.getAdvert(this.props.route.params.id);
	}

	getAdvert = async(id) => {
		axios.get(`/adverts-ws/api/advert?advertId=${id}`, {
			headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}` }
		})
		.then((response) => {
			this.setState({ advert: response.data });
			console.log(JSON.stringify(response.data, null, 2));
		})
		.catch(() => {
			Toast.show("İlan getirilemedi!");
		});
	}

	render() {
		return (
			<>
				<TopNavigation title="İlan Detayları" />


					<Carousel
						data={this.state.advert.advertPictures}
						renderItem={({ item } ) => {
							return (
								<Image
									source={{ uri: item }}
									style={CSS.property_image}
								/>
							);
						}}
						sliderWidth={1000}
						itemWidth={1000}
					/>


				<BottomBar index={0} navigation={this.props.navigation} />
			</>
		);
	}
}

const CSS = StyleSheet.create({
	property_image_container: {
		display: "flex",
		justifyContent: "center"
	},
	property_image: {
		height: 350,
		width: 350
	}
})

export default AdvertDetails;