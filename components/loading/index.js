import React from "react";
import { Spinner } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

class Loading extends React.Component {
	render() {
		return (
			this.props.loading ?
			<View style={CSS.spinner}>
				<Spinner size="large" />
			</View> : this.props.children
		);
	}
}

const CSS = StyleSheet.create({
	spinner: {
		display: "flex",
		alignItems: "center",
		height: "100%",
		justifyContent: "center",
		width: "100%"
	}
});

export default Loading;