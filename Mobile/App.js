import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

import Login from './src/pages/Login';
import Home from './src/pages/home';
import Paciente from './src/pages/cadastroPaciente';
import ExamesStack from './src/pages/exames/ExamesStack';
import LaudoStack from './src/pages/Laudo/LaudoStack';
import TipagemSanguinea from './src/pages/LabImuno';
import DataScience from './src/pages/DataScience';
import CadastroUsuario from './src/pages/CadastroUsuarios';

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function loadUser() {
      try {
        const name = await AsyncStorage.getItem('userName');
        if (name) {
          setUserName(name);
        }
      } catch (e) {
        console.log('Erro ao carregar nome do usuário', e);
      }
    }
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    props.navigation.replace('Login');
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="account-circle" size={60} color="#fff" />
        </View>
        <Text style={styles.userName}>{userName || 'Usuário'}</Text>
      </View>

      <DrawerItemList {...props} />

      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Sair"
          icon={({ color, size }) => <MaterialIcons name="logout" size={size} color={color} />}
          onPress={handleLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
}

function MenuApp() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerType: 'front',
        drawerActiveTintColor: '#007BFF',
        drawerLabelStyle: { fontSize: 16, fontWeight: '500' },
      }}
    >
      <Drawer.Screen name="Home" component={Home} options={{ drawerLabel: 'Início', drawerIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} /> }} />
      <Drawer.Screen name="Exames" component={ExamesStack} options={{ drawerLabel: 'Exames', drawerIcon: ({ color, size }) => <MaterialIcons name="description" size={size} color={color} /> }} />
      <Drawer.Screen name="Paciente" component={Paciente} options={{ drawerLabel: 'Paciente', drawerIcon: ({ color, size }) => <MaterialIcons name="person-add" size={size} color={color} /> }} />
      <Drawer.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ drawerLabel: 'Cadastro Usuário', drawerIcon: ({ color, size }) => <MaterialIcons name="admin-panel-settings" size={size} color={color} /> }} />
      <Drawer.Screen name="Laboratorio" component={TipagemSanguinea} options={{ drawerLabel: 'Laboratório', drawerIcon: ({ color, size }) => <MaterialIcons name="bloodtype" size={size} color={color} /> }} />
      <Drawer.Screen name="Laudo" component={LaudoStack} options={{ drawerLabel: 'Laudos', drawerIcon: ({ color, size }) => <MaterialIcons name="assignment" size={size} color={color} /> }} />
      <Drawer.Screen name="DataScience" component={DataScience} options={{ drawerLabel: 'Análise de Dados', drawerIcon: ({ color, size }) => <MaterialIcons name="analytics" size={size} color={color} /> }} />
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
        setInitialRoute('Login');
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

        <RootStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name="CadastroUsuario"
          component={CadastroUsuario}
          options={{ title: 'Criar Conta' }}
        />

        <RootStack.Screen
          name="MainApp"
          component={MenuApp}
          options={{ headerShown: false }}
        />

      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#007BFF',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -5, // Remove default top padding
  },
  avatarContainer: {
    marginBottom: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});