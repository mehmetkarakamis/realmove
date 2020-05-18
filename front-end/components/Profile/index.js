import React from "react";
import { View, Image } from "react-native";
import { Button, Provider, InputItem } from "@ant-design/react-native";
import axios from "axios";
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

		data.append("profilePicture", this.state.photo, this.state.photo.name);
		data.append("email", "deneme@gmai1l.com");
		data.append("fullName", this.fullname);
		data.append("phoneNumber", this.phone_number);

		axios.put("/user/userDetails", data, {
			headers: {
				"Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZW5lbWVAZ21haTFsLmNvbSIsImV4cCI6MTU4OTk5MDQ3MCwiaWF0IjoxNTg5ODEwNDcwfQ.6hMbxj1yQVkdjXvvRiYkTAA4kY7bp8tuNKS7Rg4oOznIeQIAmkqcNMgKWxE0bmwK9rQmhg1ftQdjcXPQ2Ik2QA"
			}
		})
		.then(response => {
			console.log("ok");
		})
		.catch(error => {
			console.log(error);
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