import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthProvider } from "../context/AuthContext";

import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import cadastroPaciente from "../pages/cadastroPaciente/index.js";
import Laudo from "../pages/Laudo/Laudo";
import exames from "../pages/exames/Exames";
import Lablmuno from "../pages/Lablmuno/Lablmuno";
import AdicionarExames from "../pages/adicionarExames/AdicionarExames";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
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
