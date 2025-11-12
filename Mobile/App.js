
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Home from './src/pages/home';
import ExamesStack from './src/pages/exames/ExamesStack';
import Paciente from './src/pages/cadastroPaciente';
import TipagemSanguinea from './src/pages/LabImuno';
import ResultadoLaudo from './src/pages/Laudo';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true, // mostra o cabeçalho com o botão de menu
          drawerType: 'front', // pode trocar pra 'slide' ou 'permanent'
          drawerActiveTintColor: '#007BFF', // cor do item ativo
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
          options={{ drawerLabel: 'Pacientes' }} 
        />
        <Drawer.Screen 
          name="Tipagem" 
          component={TipagemSanguinea} 
          options={{ drawerLabel: 'Tipagem Sanguínea' }} 
        />
        <Drawer.Screen 
          name="Laudo" 
          component={ResultadoLaudo} 
          options={{ drawerLabel: 'Laudos' }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}