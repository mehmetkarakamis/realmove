import React from "react";
import { View, Text } from "react-native";
import { Button, Provider, Toast, InputItem } from "@ant-design/react-native";
import axios from "../../plugins/Axios.js";
import styles from "./styles";

class Register extends React.PureComponent {
	constructor(props) {
		super(props);
		this.email = null;
		this.password = null;
		this.password_again = null;
	}

	signUp = () => {
		if (this.email === "" || this.email === null || this.password === "" || this.password === null || this.password_again === "" || this.password_again === null) {
			Toast.info("Tüm alanların doldurulması zorunludur!");
			return;
		}
		if (this.password !== this.password_again) {
			Toast.info("Parolalar eşleşmiyor!");
			return;
		}
		const form_data = new FormData();
		form_data.append("email", this.email);
		form_data.append("password", this.password);
		form_data.append("passwordRepeated", this.passwordRepeat);
		axios.post("/users-ws/api/user", form_data)
			.then(() => {
				this.props.navigation.navigate("Profile");
			})
			.catch(() => {
				Toast.info("Bu hesap daha önceden oluşturulmuş!");
			})
	}

	setEmail = (event) => { this.email = event; }

	setPassword = (event) => { this.password = event; }

	setPasswordAgain = (event) => { this.password_again = event; }

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

					<InputItem
						onChange={(event) => this.setPasswordAgain(event)}
						placeholder="**********"
						type="password"
					>Tekrar
					</InputItem>

					<Button onPress={() => this.signUp()}>Kayıt Ol</Button>
				</View>
			</Provider>
		);
	}
}

export default Register;