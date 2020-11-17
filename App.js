import React from "react";
import Toast from "react-native-toast-message";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import * as eva from "@eva-design/eva";

const Stack = createStackNavigator();

// Views
import Login from "./components/login";
import Search from "./components/search";
import ListingPage from "./components/listing"
import Profile from "./components/profile"
import ListDetail from "./components/listDetail"

export default () => (
	<>
		<Toast ref={(ref) => Toast.setRef(ref)} />
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={eva.light}>

			<View style={CSS.root}>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen component={Profile} name="Profile" />
						<Stack.Screen component={ListingPage} name="ListingPage" />
						<Stack.Screen component={ListDetail} name="ListDetail" />
						<Stack.Screen component={Search} name="Search" />
						<Stack.Screen component={Login} name="Login" />
					</Stack.Navigator>
				</NavigationContainer>
			</View>
		</ApplicationProvider>
	</>
);

const CSS = StyleSheet.create({
	root: {
		display: "flex",
		flexDirection: "column",
		height: "100%"
	}
});