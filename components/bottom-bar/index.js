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

const mapIcon = (props) => (
	<Icon name="map" {...props} />
);

const messageIcon = (props) => (
	<Icon name="maximize-outline" {...props} />
);

class BottomBar extends React.PureComponent {
	setSelectedIndex = (event) => {
		if(event === 0) this.props.navigation.replace("List");
		if(event === 1) this.props.navigation.replace("Map");
		if(event === 2) this.props.navigation.replace("Search");
		if(event === 3) this.props.navigation.replace("Profile");
		if(event === 4) this.props.navigation.replace("Messages");
	}

	render() {
		return (
			<BottomNavigation onSelect={this.setSelectedIndex} selectedIndex={this.props.index} style={CSS.bottomBar}>
				<BottomNavigationTab icon={vitrinIcon} title="Vitrin" />
				<BottomNavigationTab icon={mapIcon} title="Harita" />
				<BottomNavigationTab icon={aramaIcon} title="Arama" />
				<BottomNavigationTab icon={profilIcon} title="Profil" />
				<BottomNavigationTab icon={messageIcon} title="Mesajlar" />
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