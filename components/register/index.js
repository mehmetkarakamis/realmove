import React from "react";
import axios from "../../utils/Axios.js";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { Button, Input, Text, Icon } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import React from "react";
import axios from "../../utils/Axios.js";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { Button, Input, Text, Icon } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

class Register extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			index: 0,
			email: "",
            password: "",
            confirmPassword: ""
		}
	}

	requestRegister = () => {
		axios.post("/users-ws/api/user/register ", {
			email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.password
		})
		.then(() => {
			console.log("then");
		})
		.catch(() => {
			console.log("catch");
		})
	}


	setEmail = event => { this.setState({ email: event }); }

    setPassword = event => { this.setState({ password: event }); }
    
    setComfirmPassword = event => { this.setState({ confirmPassword: event }); }

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
							caption="Should contain at least 8 symbols"
							onChangeText={this.setEmail}
							placeholder="Bir e-mail adresi giriniz"
							style={CSS.input}
							value={this.state.email}
						/>
					</View>

					<View style={CSS.input}>
						<Text style={CSS.input__text}>Parola:</Text>
						<Input
							onChangeText={this.setPassword}
							placeholder="Bir parola giriniz" 
							style={CSS.input}
							value={this.state.password}
						/>
					</View>

                    <View style={CSS.input}>
						<Text style={CSS.input__text}>Parola Tekrar:</Text>
						<Input
							onChangeText={this.setPassword}
							placeholder="Bir parola giriniz" 
							style={CSS.input}
							value={this.state.password}
						/>
					</View>

					<View style={CSS.input}>
						<Button onPress={this.requestLogin} style={CSS.button}>Kayıt Ol</Button>
					</View>
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
	}
});

export default Register;