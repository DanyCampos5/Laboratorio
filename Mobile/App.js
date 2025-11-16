import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/pages/Login';
import Home from './src/pages/Home';
import Paciente from './src/pages/cadastroPaciente';
import ExamesStack from './src/pages/exames/ExamesStack';
import LaudoStack from './src/pages/Laudo/LaudoStack';
import TipagemSanguinea from './src/pages/LabImuno';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MenuApp() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerType: 'front',
        drawerActiveTintColor: '#007BFF',
        drawerLabelStyle: { fontSize: 16, fontWeight: '500' },
      }}
    >
      <Drawer.Screen name="Home" component={Home} options={{ drawerLabel: 'Início' }} />
      <Drawer.Screen name="Exames" component={ExamesStack} options={{ drawerLabel: 'Exames' }} />
      <Drawer.Screen name="Paciente" component={Paciente} options={{ drawerLabel: 'Paciente' }} />
      <Drawer.Screen name="Tipagem" component={TipagemSanguinea} options={{ drawerLabel: 'Tipagem Sanguínea' }} />
      <Drawer.Screen name="Laudo" component={LaudoStack} options={{ drawerLabel: 'Laudos' }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MenuApp" component={MenuApp} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
