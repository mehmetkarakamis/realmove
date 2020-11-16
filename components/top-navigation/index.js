import React from "react";
import { Icon, TopNavigation as Navigation, TopNavigationAction } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const plusIcon = (props) => (
	<Icon name="plus-outline" {...props} />
);

class TopNavigation extends React.PureComponent {
	render() {
		return (
			<Navigation
				accessoryRight={() => <TopNavigationAction icon={plusIcon}/>}
				style={CSS.navigation}
				title={this.props.title}
			/>
		);
	}
}

const CSS = StyleSheet.create({
	navigation: {
		borderBottomWidth: 2,
		borderBottomColor: "#3366FF"
	}
});

export default TopNavigation;