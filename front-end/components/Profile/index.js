import React from "react";
import { View, Image } from "react-native";
import { Button, Provider, Toast, InputItem } from "@ant-design/react-native";
import styles from "./styles";
import ImagePicker from 'react-native-image-picker';

class Profile extends React.PureComponent {
	constructor(props) {
		super(props);
		this.fullname = null;
		this.phone_number = null;
		this.state = {
			photo: null,
			photo_status: "Yeni Fotoğraf Ekle"
		}
	}

	handleChoosePhoto = () => {
		const options = {
			noData: true
		};
		ImagePicker.launchImageLibrary(options, response => {
			if(response.uri) {
				this.setState({ photo: response });
			}
		});
	};

	complete = () => {
		if(this.state.fullname === "" || this.state.fullname === null || this.phone_number === "" || this.phone_number === null) {
			Toast.info("Tam isim ve telefon numarası doğru girilmelidir!");
			return;
		}
		this.props.navigation.navigate("AdvertList");
	}

	setFullname = (event) => { this.fullname = event; }

	setPhoneNumber = (event) => { this.phone_number = event; }

	render() {
		return (
			<Provider>
				<View style={styles.homeDiv}>
					
					{this.state.photo && (
						<Image
							source={{ uri: this.state.photo.uri }}
							style={{ marginBottom: 10, alignSelf: "center", borderRadius: 300/2, width: 300, height: 300 }}
						/>
					)}
					<Button onPress={() => this.handleChoosePhoto()}>{this.state.photo_status}</Button>


					<InputItem
						clear
						onChange={(event) => this.setFullname(event)}
						placeholder="Murat Kaya"
					>Tam İsim
					</InputItem>

					<InputItem
						onChange={(event) => this.setPhoneNumber(event)}
						placeholder="05347263432"
					>Telefon
					</InputItem>


					<Button onPress={() => this.complete()}>Kaydet</Button>
				</View>
			</Provider>
		);
	}
}

export default Profile;