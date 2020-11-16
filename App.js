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

export default () => (
	<>
		<Toast ref={(ref) => Toast.setRef(ref)} />
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={eva.light}>
			<AppNavigator/>
			<View style={CSS.root}>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen component={Login} name="Login" />
						<Stack.Screen component={Search} name="Search" />
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