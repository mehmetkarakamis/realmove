import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import BottomBar from "../bottom-bar";
import axios from "../../utils/Axios"
import TopNavigation from "../top-navigation";
import { Button, Icon, Input, Modal, Card, IndexPath, Select, SelectItem, Text, List, ListItem } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const cities = ["Ankara"];
const district = [
	"Akyurt",
	"Altındağ",
	"Ayaş",
	"Bağla",
	"Beypazarı",
	"Çamlıdere",
	"Çankaya",
	"Çubuk",
	"Elmadağ",
	"Etimesgut",
	"Evren",
	"Gölbaşı",
	"Güdül",
	"Haymana",
	"Kahramankazan",
	"Kalecik",
	"Keçiören",
	"Kızılcahamam",
	"Mamak",
	"Nallıhan",
	"Polatlı",
	"Pursaklar",
	"Şereflikoçhisar",
	"Sincan",
	"Yenimahalle"
];

class Search extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			adverts: [],
			value: "",
			visible: false,
			city: new IndexPath(0),
			district: new IndexPath(0),
			price: "",
			floorNumber: "",
			buildingAge: "",
			squareMeter: "",
			filter_data : [],
		}
	}

	componentDidMount(){
		this.requestAdverts();
	}

	renderItemIcon = (props) => (
		<Icon name="home" {...props} />
	);

	renderItem = ({ item }) => (
		<ListItem
			title={<>{item.title} - {item.price} TL</>}
			accessoryLeft={this.renderItemIcon}
			accessoryRight={this.renderItemRight(item.advertId)}
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
			this.setState({ adverts: response.data, filter_data: response.data });
		})
		.catch(() => {
			Toast.error("Sunucuya bağlanırken hata ile karşılaşıldı!");
		})
		.finally(() => { this.setState({ loading: false }); });
	}

	setValue = event => { this.setState({ value: event }); }

	setVisible = () => { this.setState({ visible: true }); }

	onSend = () => {
		this.setState({ visible: false });
		// District
		let filter_data = this.state.adverts.filter((item) => {
			return item.district === district[this.state.district.row];
		});
		// Price
		filter_data = filter_data.filter((item) => {
			return Number(item.price) <= Number(this.state.price);
		});
		// // Floor number
		// filter_data = filter_data.filter((item) => {
		// 	return item.floorNumber <= this.state.price;
		// });
		// // Building age
		// filter_data = filter_data.filter((item) => {
		// 	return item.floorNumber <= this.state.price;
		// });
		// // Square meter
		// filter_data = filter_data.filter((item) => {
		// 	return item.floorNumber <= this.state.price;
		// });

		this.setState({ filter_data });
	}

	setCity = (event) => { this.setState({ city: event }); }

	setFloorNumber = (event) => { this.setState({ floorNumber: event }); }

	setBuildingAge = (event) => { this.setState({ buildingAge: event }); }

	setPrice = (event) => { this.setState({ price: event }); }

	setDistrict = (event) => { this.setState({ district: event }); }

	setSquareMeter = (event) => { this.setState({ squareMeter: event }); }

	render() {
		return (
			<>
				<TopNavigation title="Arama" />
				
				<View style={CSS.view}>
					<Input onChangeText={this.setValue} value={this.state.value} placeholder="Aranacak kelime giriniz" />
					<Button appearance="ghost" onPress={this.setVisible}>Filtrele</Button>
				</View>

					<List
						data={this.state.filter_data.filter((item) => { return item.title.toLowerCase().includes(this.state.value.toLowerCase()) })}
						renderItem={this.renderItem}
					/>

						<Modal style={CSS.modal} visible={this.state.visible}>
							<Card disabled={true}>
								<ScrollView>
							<Select
							label="Şehir"
							onSelect={this.setCity}
							placeholder="Bir şehir giriniz"
							selectedIndex={this.state.city}
							value={cities[this.state.city.row]}
						>
							<SelectItem title="Ankara" />
						</Select>

							<Select
								label="İlçe"
								onSelect={this.setDistrict}
								placeholder="Bir ilçe giriniz"
								selectedIndex={this.state.district}
								value={district[this.state.district.row]}
							>
								<SelectItem title="Akyurt" />
								<SelectItem title="Altındağ" />
								<SelectItem title="Ayaş" />
								<SelectItem title="Bağla" />
								<SelectItem title="Beypazarı" />
								<SelectItem title="Çamlıdere" />
								<SelectItem title="Çankaya" />
								<SelectItem title="Çubuk" />
								<SelectItem title="Elmadağ" />
								<SelectItem title="Etimesgut" />
								<SelectItem title="Evren" />
								<SelectItem title="Gölbaşı" />
								<SelectItem title="Güdül" />
								<SelectItem title="Haymana" />
								<SelectItem title="Kahramankazan" />
								<SelectItem title="Kalecik" />
								<SelectItem title="Keçiören" />
								<SelectItem title="Kızılcahamam" />
								<SelectItem title="Mamak" />
								<SelectItem title="Nallıhan" />
								<SelectItem title="Polatlı" />
								<SelectItem title="Pursaklar" />
								<SelectItem title="Şereflikoçhisar" />
								<SelectItem title="Sincan" />
								<SelectItem title="Yenimahalle" />
							</Select>

							<Input
								placeholder="Bir ücret giriniz"
								label="Ücret"
								onChangeText={this.setPrice}
								value={this.state.price}
							/>

						<Input
							label="Bulunduğu Kat"
							onChangeText={this.setFloorNumber}
							placeholder="Bulunduğu katı giriniz"
							value={this.state.floorNumber}
						/>

						<Input
							label="Bina Yaşı"
							onChangeText={this.setBuildingAge}
							placeholder="Bina yaşını giriniz"
							value={this.state.buildingAge}
						/>

						<Input
							label="Metre Kare"
							onChangeText={this.setSquareMeter}
							placeholder="Bir metrekare değeri giriniz"
							value={this.state.squareMeter}
						/>
													<Button size="small" onPress={() => this.onSend()}>Tamam</Button>
</ScrollView>

							</Card>
						</Modal>

				<BottomBar index={2} navigation={this.props.navigation} />
			</>
		);
	}
}

const CSS = StyleSheet.create({
	view: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	modal: {
		height: "40%",
		width: "70%"
	}
});

export default Search;