import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/Axios.js";
import Toast from "react-native-simple-toast";
import { BottomNavigation, BottomNavigationTab, Button, CheckBox, Input, Text, Icon, Spinner } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { isEmail, isEmpty } from "../../utils/InputHandler.js";

class Login extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			index: 0,
			email: "",
			password: "",
			password_again: "",
			checkbox: false,
			loading: false
		}
	}

	requestLogin = () => {
		// Validation
		try {
			if(isEmpty(this.state.email)) throw String("E-mail alanı boş bırakılamaz!");
			if(isEmpty(this.state.password)) throw String("Parola alanı boş bırakılamaz!");
		}
		catch(error) {
			Toast.show(error);
			return;
		}
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
			.catch(() => {
				Toast.show("Kullanıcı adı veya şifre hatalı!");
			})
			.finally(() => { this.setState({ loading: false }); });
		})
	}

	requestRegister = () => {
		// Validation
		try {
			if(isEmpty(this.state.email)) throw String("E-mail alanı boş bırakılamaz!");
			if(isEmpty(this.state.password)) throw String("Parola alanı boş bırakılamaz!");
			if(isEmpty(this.state.password_again)) throw String("Parola tekrarı girilmelidir!");
			if(!isEmail(this.state.email)) throw String("Geçerli bir e-mail adresi yazınız!");
			if(this.state.password !== this.state.password_again) throw String("Parolalar eşleşmiyor!");
			if(this.state.checkbox === false) throw String("Kullanım koşulları kabul edilmelidir!");
		}
		catch(error) {
			Toast.show(error);
			return;
		}
		// Request
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

	setCheckbox = event => { this.setState({ checkbox: event }); }

	setEmail = event => { this.setState({ email: event }); }

	setPassword = event => { this.setState({ password: event }); }

	setPasswordAgain = event => { this.setState({ password_again: event }); }

	setSelectedIndex = event => { this.setState({ index: event }); }

	render() {
		return (
			<>
				<BottomNavigation onSelect={this.setSelectedIndex} selectedIndex={this.state.index}>
					<BottomNavigationTab title="Giriş Yap" />
					<BottomNavigationTab title="Kayıt Ol" />
				</BottomNavigation>

				<View style={CSS.container}>
					{this.state.loading &&
					<View style={CSS.spinner}>
						<Spinner />
					</View>
					}

					<Icon fill="#f59842" name="home" style={CSS.icon} />
					<Text category="h3">RealMove</Text>

					<View style={CSS.input}>
						<Text style={CSS.input__text}>E-mail:</Text>
						<Input
							onChangeText={this.setEmail}
							placeholder="Bir e-mail adresi giriniz"
							value={this.state.email}
						/>
					</View>

					<View style={CSS.input}>
						<Text style={CSS.input__text}>Parola:</Text>
						<Input
							onChangeText={this.setPassword}
							placeholder="Bir parola giriniz"
							value={this.state.password}
						/>
					</View>

					{this.state.index === 1 &&
					<>
						<View style={CSS.input}>
							<Text style={CSS.input__text}>Parola Tekrar:</Text>
							<Input
								onChangeText={this.setPasswordAgain}
								placeholder="Parolayı tekrar giriniz"
								value={this.state.password_again}
							/>
						</View>

							<CheckBox checked={this.state.checkbox} onChange={this.setCheckbox} style={CSS.checkbox}>
								<Text>Kullanım koşullarını okudum ve kabul ediyorum.</Text>
							</CheckBox>
					</>
					}

					<View style={CSS.input}>
						{this.state.index === 0 ?
						<Button disabled={this.state.loading} onPress={this.requestLogin} style={CSS.button}>Giriş Yap</Button>
						:
						<Button disabled={this.state.loading} onPress={this.requestRegister} style={CSS.button}>Kayıt Ol</Button>
						}
					</View>
				</View>
			</>
		);
	}
}

const CSS = StyleSheet.create({
	container: {
		marginTop: "5%",
		display: "flex",
		alignItems: "center"
	},
	icon: {
		width: 48,
		height: 48,
		marginBottom: 6
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
	checkbox: {
		marginBottom: "2%",
		marginTop: "2%"
	},
	spinner: {
		marginBottom: "10%"
	}
});

export default Login;