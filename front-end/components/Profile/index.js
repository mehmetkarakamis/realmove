import React from "react";
import { View, Image } from "react-native";
import { Button, Provider, InputItem } from "@ant-design/react-native";
import axios from "../../plugins/Axios.js";
import styles from "./styles";
import ImagePicker from 'react-native-image-picker';

class Profile extends React.PureComponent {
	constructor(props) {
		super(props);
		this.fullname = null;
		this.phone_number = null;
		this.state = {
			photo: null
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
		const data = new FormData();

		data.append("profilePicture", {
			name: this.state.fileName,
			type: this.state.type,
			uri: Platform.OS === 'android' ? this.state.uri : this.state.uri.replace('file://', '')
		});

		data.append("email", "deneme@gmai1l.com");
		data.append("fullName", this.fullname);
		data.append("phoneNumber", this.phone_number);

		console.log(data);

		axios.put("/user/userDetails", {
			headers: {
				"Content-Type": "multipart/form-data",
				"Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZW5lbWVAZ21haTFsLmNvbSIsImV4cCI6MTU4OTgxMDEzMSwiaWF0IjoxNTg5ODA4MzMxfQ.K1kUv59S52EjdXk2quD_9ESwwHiwVxhPujEJ7n7XTWQmJblhsG_4HAlYiAntUvMl6vwvxgtVTz1Zxt5ISIwSKw"
			}
		}, data)
		.then(response => {
			console.log("ok");
		})
		.catch(error => {
			//console.log(error.response);
		});
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
							style={{ alignSelf: "center", width: 300, height: 300 }}
						/>
					)}
					<Button onPress={() => this.handleChoosePhoto()}>Fotoğraf Ekle</Button>


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