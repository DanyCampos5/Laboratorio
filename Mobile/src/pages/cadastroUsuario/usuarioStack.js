import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListaUsuarios from './listaUsuario';
import CadastroUsuario from './cadastroUsuario';

const Stack = createStackNavigator();

export default function UsuariosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="ListaUsuarios" component={ListaUsuarios} options={{ title: "Usuários" }} />
      <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ title: "Cadastrar Usuário" }} />
    </Stack.Navigator>
  );
}
