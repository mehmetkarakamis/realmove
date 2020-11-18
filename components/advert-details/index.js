import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/Axios.js";
import BottomBar from "../bottom-bar";
import Toast from "react-native-simple-toast";
import TopNavigation from "../top-navigation";
import { Pages } from 'react-native-pages';
import { Image, StyleSheet, Text, View } from "react-native";
import { Divider, List, ListItem } from '@ui-kitten/components';

const lang = {
	userId: "Kullanıcı ,ID",
	advertId: "Emlak ID",
	title: "Başlık",
	city: "Şehir",
	district: "İlçe",
	region: "Bölge",
	price: "Ücret",
	description: "Açıklama",
	advertType: "Emlak Türü",
	squareMeter: "Metre Kare"
}

class AdvertDetails extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			advert: {
				advertPictures: []
			}
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
			console.log(Object(this.state.advert));
		})
		.catch(() => {
			Toast.show("İlan getirilemedi!");
		});
	}

	render() {
		return (
			<>
				<TopNavigation title="İlan Detayları" />
				<View style={CSS.carousel}>
					<Pages style={CSS.carousel}>
						{this.state.advert.advertPictures.map((image) => {
							return <Image style={CSS.images} source={{uri: image}} />;
						})}
					</Pages>
				</View>

				<List
					data={Object.keys(this.state.advert)}
					ItemSeparatorComponent={Divider}
					renderItem={({item, index}) => {
						return <ListItem description={this.state.advert[item]} title={lang[item]} />
					}}
				/>

				<BottomBar index={0} navigation={this.props.navigation} />
			</>
		);
	}
}

const CSS = StyleSheet.create({
	carousel: {
		height: "30%"
	},
	images: {
		height: "100%"
	}
})

export default AdvertDetails;