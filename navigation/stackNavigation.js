import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from '../utilies/routes';
import About from '../pages/About';

import Home from '../pages/Home';
import Favorites from '../pages/Favorites';
import Details from '../pages/Details';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    return (
 
     
        // <Stack.Screen name="Home" component={Home} />
        <Stack.Navigator 
      initialRouteName="Home" 
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: '#fff',
        headerTitleStyle: styles.headerTitleStyle,
        cardStyle: styles.cardStyle,
      }}
    >
        <Stack.Screen name="Favorities" component={Favorites} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    )
}
