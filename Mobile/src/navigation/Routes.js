import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthProvider } from "../context/AuthContext";

import Login from "../pages/Login/index.js";
import Home from "../pages/home/index.js";
import CadastroUsuario from "../pages/cadastroUsuario/index.js";
import cadastroPaciente from "../pages/cadastroPaciente/index.js";
import Laudo from "../pages/Laudo/BuscarLaudo.js";
import exames from "../pages/exames/index.js";
import Lablmuno from "../pages/LabImuno/index.js";
import AdicionarExames from "../pages/adicionarExames/index.js";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Usuario" component={CadastroUsuario} />
          <Stack.Screen name="Laudo" component={Laudo} />
          <Stack.Screen name="LabImuno" component={Lablmuno} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="exames" component={exames} />
          <Stack.Screen name="cadastroPaciente" component={cadastroPaciente} />
          <Stack.Screen name="AdicionarExames" component={AdicionarExames} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
