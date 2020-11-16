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
	setSelectedIndex = (event) => {
		if(event === 0) this.props.navigation.replace("List");
		if(event === 1) this.props.navigation.replace("Search");
		if(event === 2) this.props.navigation.replace("Profile");
	}

	render() {
		return (
			<BottomNavigation onSelect={this.setSelectedIndex} selectedIndex={this.props.index} style={CSS.bottomBar}>
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