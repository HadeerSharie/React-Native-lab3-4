import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Now from '../pages/nowplay';
import Top from '../pages/toprated';
import Home from '../component/Home';
import Fav from '../pages/fav';

const Tab = createMaterialTopTabNavigator();

export default function Taps() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#333', 
      
 
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#f97316' 
        },
      
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: 'white', 
      }}
    >
      <Tab.Screen name="Movies" component={Home} />
      <Tab.Screen name="Now Playing" component={Now} />
      <Tab.Screen name="Top Rated" component={Top} />
      <Tab.Screen name="Favorites" component={Fav} />
    </Tab.Navigator>
  );
}
