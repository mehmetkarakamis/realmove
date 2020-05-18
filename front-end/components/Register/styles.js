import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
		homeDiv: {
				display: "flex",
				alignContent: "center",
				backgroundColor: "#FFFFFF",
				flex: 1,
				justifyContent: "center"
		},
		header: {
			marginBottom: 30,
			fontSize: 30,
			color: "orange",
			textAlign: 'center',
			...Platform.select({
				ios: {
					fontFamily: 'Heiti SC'
				},
				android: {
					fontFamily: 'monospace'
				}
			})
		},
		register: {
			marginTop: 30,
			fontSize: 15,
			textAlign: "center"
		}
});

export default styles;