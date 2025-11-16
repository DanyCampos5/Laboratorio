import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Paciente from './src/pages/cadastroPaciente';
import ExamesStack from './src/pages/exames/ExamesStack';
import Home from './src/pages/Home';
import TipagemSanguinea from './src/pages/LabImuno';
import LaudoStack from './src/pages/Laudo/LaudoStack';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true, 
          drawerType: 'front', 
          drawerActiveTintColor: '#007BFF', 
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: '500',
          },
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={Home} 
          options={{ drawerLabel: 'Início' }} 
        />
        <Drawer.Screen 
          name="Exames" 
          component={ExamesStack} 
          options={{ drawerLabel: 'Exames' }} 
        />
        <Drawer.Screen 
          name="Paciente" 
          component={Paciente} 
          options={{ drawerLabel: 'Paciente' }} 
        />
        <Drawer.Screen 
          name="Tipagem" 
          component={TipagemSanguinea} 
          options={{ drawerLabel: 'Tipagem Sanguínea' }} 
        />
        <Drawer.Screen 
          name="Laudo" 
          component={LaudoStack} 
          options={{ drawerLabel: 'Laudos' }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}