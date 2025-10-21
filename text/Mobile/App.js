
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/pages/home';
import Exames from './src/pages/exames';
import { TipagemSanguinea } from './src/pages/LabImuno';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Exames" component={Exames} />
        <Tab.Screen name="TipagemSanguinea" component={TipagemSanguinea} />
      </Tab.Navigator>
    </NavigationContainer> 
  );
}