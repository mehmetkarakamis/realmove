import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/Axios.js";
import BottomBar from "../bottom-bar";
import ImagePicker from "react-native-image-picker";
import TopNavigation from "../top-navigation";
import Loading from "../loading";
import Toast from "../toast";
import { Button, IndexPath, Input, Select, SelectItem } from '@ui-kitten/components';
import { ScrollView, StyleSheet, View } from "react-native";

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
const advert_types = ["Satılık", "Kiralık"];
const item_status = ["Boş", "Dolu"];
const statuses = ["Yeni", "İkinci El"];
const in_the_sites = ["Evet", "Hayır"];

class Add extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			// Data
			title: "",
			city: new IndexPath(0),
			district: new IndexPath(0),
			region: "",
			price: "0",
			description: "",
			advertType: new IndexPath(0),
			squareMeter: "0",
			residentalType: "",
			numberOfRooms: "",
			floorNumber: "0",
			buildingAge: "0",
			heatingType: "",
			numberOfFloors: "0",
			itemStatus: new IndexPath(0),
			numberOfBathrooms: "0",
			status: new IndexPath(0),
			studentOrSinglePerson: "",
			front: "",
			inTheSite: new IndexPath(0)
		}
	}

	handlePhotoSelect = () => {
		ImagePicker.launchImageLibrary({ noData: true }, response => {
			if(response.uri) {
				this.setState({ photo: response });
			}
		});
	}

	requestAdd = () => {
		const data = new FormData();
		data.append("title", this.state.title);
		data.append("city", cities[this.state.city.row]);
		data.append("district", district[this.state.district.row]);
		data.append("region", this.state.region);
		data.append("price", this.state.price);
		data.append("description", this.state.description);
		data.append("advertType", advert_types[this.state.advertType.row]);
		data.append("squareMeter", this.state.squareMeter);
		data.append("residentalType", this.state.residentalType);
		data.append("numberOfRooms", this.state.numberOfRooms);
		data.append("floorNumber", this.state.floorNumber);
		data.append("buildingAge", this.state.buildingAge);
		data.append("heatingType", this.state.heatingType);
		data.append("numberOfFloors", this.state.numberOfFloors);
		data.append("itemStatus", item_status[this.state.itemStatus.row]);
		data.append("numberOfBathrooms", this.state.numberOfBathrooms);
		data.append("status", statuses[this.state.status.row])
		data.append("studentOrSinglePerson", this.state.studentOrSinglePerson);
		data.append("front", this.state.front);
		this.setState({ loading: true }, async() => {
			axios.post("/adverts-ws/api/advert", data, {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}` }
			})
			.then((response) => {
				Toast.success("İlan inceleme için gönderildi!");
				this.props.navigation.navigate("AdvertDetails", { id: response.data.advertId });
			})
			.catch(() => {
				Toast.error("İlan eklenemedi!");
				this.setState({ loading: false });
			});
		});
	}

	setTitle = (event) => { this.setState({ title: event }); }

	setCity = (event) => { this.setState({ city: event }); }

	setDistrict = (event) => { this.setState({ district: event }); }

	setRegion = (event) => { this.setState({ region: event }); }

	setPrice = (event) => { this.setState({ price: event }); }

	setDescription = (event) => { this.setState({ description: event }); }

	setAdvertType = (event) => { this.setState({ advertType: event }); }

	setSquareMeter = (event) => { this.setState({ squareMeter: event }); }

	setResidentalType = (event) => { this.setState({ residentalType: event }); }

	setNumberOfRooms = (event) => { this.setState({ numberOfRooms: event }); }

	setFloorNumber = (event) => { this.setState({ floorNumber: event }); }

	setBuildingAge = (event) => { this.setState({ buildingAge: event }); }

	setHeatingType = (event) => { this.setState({ heatingType: event }); }

	setNumberOfFloors = (event) => { this.setState({ numberOfFloors: event }); }

	setItemStatus = (event) => { this.setState({ itemStatus: event }); }

	setNumberOfBathrooms = (event) => { this.setState({ numberOfBathrooms: event }); }

	setStatus = (event) => { this.setState({ status: event }); }

	setStudentOrSinglePerson = (event) => { this.setState({ studentOrSinglePerson: event }); }

	setFront = (event) => { this.setState({ front: event }); }

	setInTheSite = (event) => { this.setState({ inTheSite: event }); }

	render() {
		return (
			<Loading loading={this.state.loading}>
				<TopNavigation navigation={this.props.navigation} title="Yeni İlan Ekle" />

				<ScrollView>
					<View style={CSS.container}>
						<Input
							label="Başlık"
							onChangeText={this.setTitle}
							placeholder="İlan için bir başlık giriniz"
							value={this.state.title}
						/>

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
							label="Bölge"
							onChangeText={this.setRegion}
							placeholder="Bir bölge giriniz"
							value={this.state.region}
						/>

						<Input
							placeholder="Bir ücret giriniz"
							label="Ücret"
							onChangeText={this.setPrice}
							value={this.state.price}
						/>

						<Input
							label="Açıklama"
							multiline={true}
							onChangeText={this.setDescription}
							placeholder="Bir açıklama giriniz"
							textStyle={{ minHeight: 128 }}
							value={this.state.description}
						/>

						<Select
							label="Emlak türü"
							onSelect={this.setAdvertType}
							placeholder="Emlak türünü giriniz"
							selectedIndex={this.state.advertType}
							value={advert_types[this.state.advertType.row]}>
							<SelectItem title="Satılık" />
							<SelectItem title="Kiralık" />
						</Select>

						<Input
							label="Metre Kare"
							onChangeText={this.setSquareMeter}
							placeholder="Bir metrekare değeri giriniz"
							value={this.state.squareMeter}
						/>

						<Input
							label="Daire Türü"
							onChangeText={this.setResidentalType}
							placeholder="Daire türünü giriniz"
							value={this.state.residentalType}
						/>

						<Input
							label="Oda Sayısı"
							onChangeText={this.setNumberOfRooms}
							placeholder="Örn. 2+1, 3+1"
							value={this.state.numberOfRooms}
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
							label="Isıtma Tipi"
							onChangeText={this.setHeatingType}
							placeholder="Isıtma tipini giriniz"
							value={this.state.heatingType}
						/>

						<Input
							label="Kat Sayısı"
							onChangeText={this.setNumberOfFloors}
							placeholder="Kat sayısını giriniz"
							value={this.state.numberOfFloors}
						/>

						<Select
							label="Boş / Dolu"
							onSelect={this.setItemStatus}
							placeholder="Dairenin statüsünü giriniz"
							selectedIndex={this.state.itemStatus}
							value={item_status[this.state.itemStatus.row]}
						>
							<SelectItem title="Boş" />
							<SelectItem title="Dolu" />
						</Select>

						<Input
							label="Banyo Sayısı"
							onChangeText={this.setNumberOfBathrooms}
							placeholder="Banyo sayısını giriniz"
							value={this.state.numberOfBathrooms}
						/>

						<Select
							label="Daire statüsü"
							onSelect={this.setStatus}
							placeholder="Daire statüsünü giriniz"
							selectedIndex={this.state.status}
							value={statuses[this.state.status.row]}
						>
							<SelectItem title="Yeni" />
							<SelectItem title="İkinci El" />
						</Select>

						<Input
							label="Kimin İçin"
							onChangeText={this.setStudentOrSinglePerson}
							placeholder="Ev kimin için?"
							value={this.state.studentOrSinglePerson}
						/>

						<Input
							label="Cephe"
							onChangeText={this.setFront}
							placeholder="Evin cehpesini giriniz"
							value={this.state.front}
						/>

						<Select
							label="Site"
							onSelect={this.setInTheSite}
							selectedIndex={this.state.inTheSite}
							value={in_the_sites[this.state.inTheSite.row]}
							placeholder="Site içinde mi?"
						>
							<SelectItem title="Evet" />
							<SelectItem title="Hayır" />
						</Select>

						<View style={CSS.button_container}>
							<Button onPress={this.handlePhotoSelect}>Fotoğraf Yükle</Button>
							<Button onPress={this.requestAdd} size="small" style={CSS.button}>Gönder</Button>
						</View>
					</View>
				</ScrollView>

				<BottomBar index={99} navigation={this.props.navigation} />
			</Loading>
		);
	}
}

const CSS = StyleSheet.create({
	container: {
		padding: "2%"
	},
	button_container: {
		marginTop: "3%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	},
	button: {
		width: "40%"
	}
});

export default Add;