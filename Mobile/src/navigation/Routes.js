import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerRoutes from "./DrawerRoutes";

import { AuthProvider } from "../context/AuthContext";

import Login from "../pages/Login/index.js";
import CadastroUsuario from "../pages/cadastroUsuario/index.js";







const Stack = createStackNavigator();

export default function Routes() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />


          <Stack.Screen name="MainApp" component={DrawerRoutes} />



        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
