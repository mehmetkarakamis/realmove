import React from "react";
import Toast from "react-native-toast-message";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View,  } from "react-native";
import * as eva from "@eva-design/eva";

const Stack = createStackNavigator();

// Views
import Add from "./components/add";
import Login from "./components/account";
import Map from "./components/map";
import List from "./components/list";
import Search from "./components/search";
import Profile from "./components/profile";
import AdvertDetails from "./components/advert-details";

export default () => (
	<>
	
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={eva.light}>
			<View style={CSS.root}>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
							<Stack.Screen component={Login} name="Login" />
							<Stack.Screen component={List} name="List" />
							<Stack.Screen component={AdvertDetails} name="AdvertDetails" />
							<Stack.Screen component={Add} name="Add" />
							<Stack.Screen component={Map} name="Map" />
							<Stack.Screen component={Search} name="Search" />
							<Stack.Screen component={Profile} name="Profile" />
					</Stack.Navigator>
				</NavigationContainer>
			</View>
		</ApplicationProvider>
		<Toast ref={(ref) => Toast.setRef(ref)} />
		
	</>
);

const CSS = StyleSheet.create({
	root: {
		display: "flex",
		flexDirection: "column",
		height: "100%"
	}
});