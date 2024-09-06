

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import About from './pages/About';
import Favorites from './pages/Favorites';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {FavoritesProvider} from './FavoritesContext';
import { FavoritesContext } from './FavoritesContext'; 
import Details from './pages/Details';





const Stack = createNativeStackNavigator(); 
export default function App() {
  const [favorites, setFavorites] = useState([]); 
  return (
    <FavoritesProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="About" component={About} />
       <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  </FavoritesProvider>
    // <FavoritesContext.Provider value={{ favorites, setFavorites }}>
    //   <NavigationContainer>
    //     <Stack.Navigator initialRouteName="Home">
    //       <Stack.Screen name="Home" component={Home} />
    //       <Stack.Screen name="Favorites" component={Favorites} />
    //       <Stack.Screen name="About" component={About} />
    //       <Stack.Screen name="Details" component={Details} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </FavoritesContext.Provider>
  );
}






