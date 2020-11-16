import React from "react";
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const vitrinIcon = (props) => (
	<Icon name="grid-outline" {...props} />
);

const aramaIcon = (props) => (
	<Icon name="search-outline" {...props} />
);

const profilIcon = (props) => (
	<Icon name="person" {...props} />
);

class BottomBar extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			index: 1
		}
	}
	

	setSelectedIndex = (event) => { this.setState({ index: event }); }

	render() {
		return (
			<BottomNavigation onSelect={this.setSelectedIndex} selectedIndex={this.state.index} style={CSS.bottomBar}>
				<BottomNavigationTab icon={vitrinIcon} title="Vitrin" />
				<BottomNavigationTab icon={aramaIcon} title="Arama" />
				<BottomNavigationTab icon={profilIcon} title="Profil" />
			</BottomNavigation>
		);
	}
}

const CSS = StyleSheet.create({
	bottomBar: {
		marginTop: "auto"
	}
});

export default BottomBar;