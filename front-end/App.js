import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AdvertList from "./components/AdvertList";
import Advert from "./components/Advert";
import Home from "./components/Home";
import Map from "./components/Map";
import Register from "./components/Register";
import Profile from "./components/Profile";

const Stack = createStackNavigator();

console.disableYellowBox = true;

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Map" component={Map} />
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="Profile" component={Profile} />
				<Stack.Screen name="AdvertList" component={AdvertList} />
				<Stack.Screen name="Advert" component={Advert} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;