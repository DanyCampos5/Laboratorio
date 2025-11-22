import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './src/pages/Login';
import Home from './src/pages/home';
import Paciente from './src/pages/cadastroPaciente';
import ExamesStack from './src/pages/exames/ExamesStack';
import LaudoStack from './src/pages/Laudo/LaudoStack';
import TipagemSanguinea from './src/pages/LabImuno';

const RootStack = createStackNavigator();
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
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setInitialRoute('MainApp');
        } else {
          setInitialRoute('Login');
        }
      } catch (e) {
        console.error("Failed to fetch the token from storage", e);
        setInitialRoute('Login'); // Em caso de erro, vai para o Login
      }
    };

    checkToken();
  }, []);

  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={initialRoute}>
        {/* A tela de Login agora é a primeira a ser considerada */}
        <RootStack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        {/* A tela principal com o menu */}
        <RootStack.Screen 
          name="MainApp" 
          component={MenuApp} 
          options={{ headerShown: false }} 
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
