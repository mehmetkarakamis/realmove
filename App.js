import React from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import * as eva from "@eva-design/eva";

const Stack = createStackNavigator();

// Views
import Login from "./components/account";
import List from "./components/list";
import Search from "./components/search";
<<<<<<< HEAD
import ListingPage from "./components/listing"
import Profile from "./components/profile"
import ListDetail from "./components/listDetail"
=======
import Profile from "./components/profile";
>>>>>>> 33d8e13a063e7c7b57ec295b000e18987837b41e

export default () => (
	<>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={eva.light}>
<<<<<<< HEAD

=======
>>>>>>> 33d8e13a063e7c7b57ec295b000e18987837b41e
			<View style={CSS.root}>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen component={Profile} name="Profile" />
<<<<<<< HEAD
						<Stack.Screen component={ListingPage} name="ListingPage" />
						<Stack.Screen component={ListDetail} name="ListDetail" />
=======
						<Stack.Screen component={Login} name="Login" />
						<Stack.Screen component={List} name="List" />
>>>>>>> 33d8e13a063e7c7b57ec295b000e18987837b41e
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