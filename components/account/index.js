import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/Axios.js";
import Toast from "../toast";
import { BottomNavigation, BottomNavigationTab, Button, CheckBox, Input, Text, Icon, Spinner } from "@ui-kitten/components";
import { isEmail, isEmpty } from "../../utils/InputHandler.js";
import { StyleSheet, View } from "react-native";

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
			if(!isEmail(this.state.email)) throw String("Geçerli bir e-mail adresi yazınız!");
		}
		catch(error) {
			Toast.error(error);
			return;
		}

		this.setState({ loading: true }, () => {
			axios.post("/users-ws/api/user/login", {
					email: this.state.email,
					password: this.state.password
				})
			.then(async(response) => {
				Toast.success("Giriş başarılı!");
				await AsyncStorage.setItem("@token", response.data.token);
				this.props.navigation.replace("List");
			})
			.catch(() => {
				Toast.error("Bilgiler hatalı veya hesap aktif edilmedi!");
				this.setState({ loading: false });
			});
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
			Toast.error(error);
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
				Toast.success("Kullanıcı başarıyla oluşturuldu!");
				this.setState({ index: 0 });
			})
			.catch(() => {
				Toast.error("Bu e-mail adresi zaten sisteme kayıtlı!");
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
			<View style={CSS.account}>
				<BottomNavigation class={CSS.top_navigation} onSelect={this.setSelectedIndex} selectedIndex={this.state.index}>
					<BottomNavigationTab title="Giriş Yap" />
					<BottomNavigationTab title="Kayıt Ol" />
				</BottomNavigation>

				<View style={CSS.container}>
					{this.state.loading ?
					<View style={CSS.spinner}>
						<Spinner size="large" />
					</View>
					:
					<>
						<Icon fill="#f59842" name="home" style={CSS.icon} />
						<Text category="h3">RealMove</Text>

						<View style={CSS.input}>
							<Text style={CSS.input__text}>E-mail:</Text>
							<Input
								caption="Bir e-mail adresi giriniz"
								onChangeText={this.setEmail}
								value={this.state.email}
							/>
						</View>

						<View style={CSS.input}>
							<Text style={CSS.input__text}>Parola:</Text>
							<Input
								caption="Bir parola giriniz"
								onChangeText={this.setPassword}
								secureTextEntry={true}
								value={this.state.password}
							/>
						</View>

						{this.state.index === 1 &&
						<>
							<View style={CSS.input}>
								<Text style={CSS.input__text}>Parola Tekrar:</Text>
								<Input
									caption="Parolayı tekrar giriniz"
									onChangeText={this.setPasswordAgain}
									secureTextEntry={true}
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
					</>
					}
				</View>
			</View>
		);
	}
}

const CSS = StyleSheet.create({
	account: {
		display: "flex",
		height: "100%"
	},
	container: {
		marginTop: "5%",
		display: "flex",
		alignItems: "center",
		flex: 1
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
		flex: 1,
		justifyContent: "center"
	}
});

export default Login;