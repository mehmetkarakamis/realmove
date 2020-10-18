import React from "react";
import { AsyncStorage, Text, View } from "react-native";
import { Button, InputItem, Provider, Toast } from '@ant-design/react-native';
import axios from "../../plugins/Axios.js";
import styles from "./styles";

class Home extends React.PureComponent {
	constructor(props) {
		super(props);
		this.email = null;
		this.password = null;
	}

	login = () => {
		if (this.email === "" || this.email === null || this.password === "" || this.password === null) {
			Toast.info("Tüm alanların doldurulması zorunludur!", 3);
			return;
		}
		const form_data = new FormData();
		axios.post("/users-ws/api/user/login", {
			email: this.email,
			password: this.password
		})
			.then(async(response) => {
				this.props.navigation.navigate("AdvertList");
				await AsyncStorage.setItem(
					"token", response.data.token
				);
			})
			.catch(error => {
				console.log(error);
				Toast.info("Kullanıcı adı veya şifre hatalı!");
			});
	}

	setEmail = (event) => { this.email = event; }

	setPassword = (event) => { this.password = event; }

	render() {
		return (
			<Provider>
				<View style={styles.homeDiv}>
					<Text style={styles.header}>realMove</Text>

					<InputItem
						clear
						onChange={(event) => this.setEmail(event)}
						placeholder="email@email.com"
					>E-mail
					</InputItem>

					<InputItem
						onChange={(event) => this.setPassword(event)}
						placeholder="**********"
						type="password"
					>Parola
						</InputItem>

					<Button onPress={() => this.login()}>Giriş Yap</Button>

					<Text
						onPress={() => this.props.navigation.navigate("Register")}
						style={styles.register}
					>Kayıt Ol</Text>
				</View>
			</Provider>
		);
	}
}

export default Home;