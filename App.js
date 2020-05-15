
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AdvertList from './components/AdvertList';
import Advert from './components/Advert';
import Home from './components/Home';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AdvertList" component={AdvertList} />
        <Stack.Screen name="Advert" component={Advert} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
