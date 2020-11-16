import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/Axios.js";
import Toast from "react-native-simple-toast";
import { BottomNavigation, BottomNavigationTab, Button, Input, Text, Icon, Spinner } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

class Login extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			index: 0,
			email: "",
			password: "",
			password_again: "",
			loading: false
		}
	}

	requestLogin = () => {
		this.setState({ loading: true }, () => {
			axios.post("/users-ws/api/user/login ", {
				email: this.state.email,
				password: this.state.password
			})
			.then(async(response) => {
				Toast.show("Giriş başarılı!");
				await AsyncStorage.setItem("@token", response.data.token);
				this.props.navigation.replace("List");
			})
			.catch((error) => {
				console.log(error);
				Toast.show("Kullanıcı adı veya şifre hatalı!");
			})
			.finally(() => { this.setState({ loading: false }); });
		})
	}

	requestRegister = () => {
		this.setState({ loading: true }, () => {
			const data = new FormData();
			data.append("email", this.state.email);
			data.append("password", this.state.password);
			data.append("passwordRepeat", this.state.password_again);
			axios.post("/users-ws/api/user ", data)
			.then(() => {
				Toast.show("Kullanıcı başarıyla oluşturuldu!");
				this.setState({ index: 0 });
			})
			.catch(() => {
				Toast.show("Kullanıcı oluşturulamadı!");
			})
			.finally(() => { this.setState({ loading: false }); });
		});
	}

	setEmail = event => { this.setState({ email: event }); }

	setPassword = event => { this.setState({ password: event }); }

	setPasswordAgain = event => { this.setState({ password_again: event }); }

	setSelectedIndex = (event) => { this.setState({ index: event }); }

	render() {
		return (
			<>
				<BottomNavigation onSelect={this.setSelectedIndex} selectedIndex={this.state.index}>
					<BottomNavigationTab title="Giriş Yap" />
					<BottomNavigationTab title="Kayıt Ol" />
				</BottomNavigation>

				<View style={CSS.input_container}>
					<Icon fill="#8F9BB3" name="home" style={CSS.icon} />
					<Text category='h3'>RealMove</Text>

					<View style={CSS.input}>
						<Text style={CSS.input__text}>E-mail:</Text>
						<Input
							caption="Geçerli bir e-mail adresi olmalı!"
							onChangeText={this.setEmail}
							placeholder="Bir e-mail adresi giriniz"
							style={CSS.input}
							value={this.state.email}
						/>
					</View>

					<View style={CSS.input}>
						<Text style={CSS.input__text}>Parola:</Text>
						<Input
							caption="Güçlü bir şifre seçiniz!"
							onChangeText={this.setPassword}
							placeholder="Bir parola giriniz"
							style={CSS.input}
							value={this.state.password}
						/>
					</View>

					{this.state.index === 1 &&
					<View style={CSS.input}>
						<Text style={CSS.input__text}>Parola Tekrar:</Text>
						<Input
							onChangeText={this.setPasswordAgain}
							placeholder="Parolayı tekrar giriniz"
							style={CSS.input}
							value={this.state.password_again}
							type="password"
						/>
					</View>
					}

					<View style={CSS.input}>
						{this.state.index === 0 ?
						<Button disabled={this.state.loading} onPress={this.requestLogin} style={CSS.button}>Giriş Yap</Button>
						:
						<Button disabled={this.state.loading} onPress={this.requestRegister} style={CSS.button}>Kayıt Ol</Button>
						}
					</View>
					
					{this.state.loading &&
					<View style={CSS.spinner}>
						<Spinner />
					</View>
					}
				</View>
			</>
		);
	}
}

const CSS = StyleSheet.create({
	icon: {
		width: 64,
		height: 64,
		marginBottom: 12
	},
	input_container: {
		marginTop: "5%",
		display: "flex",
		alignItems: "center"
	},
	input: {
		marginBottom: "1%",
		marginTop: "1%",
		width: "90%"
	},
	input__text: {
		marginBottom: "0.50%",
		fontSize: 14,
		fontWeight: "700"
	},
	spinner: {
		marginTop: "10%"
	}
});

export default Login;