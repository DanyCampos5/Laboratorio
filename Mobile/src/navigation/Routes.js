import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// IMPORTANTE: Importe a tela de Cadastro aqui
import Login from '../pages/Login';
import CadastroUsuario from '../pages/cadastroUsuario/index'; // <--- Verifique se o caminho está certo
import Home from '../pages/home';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      
      {/* 1. A tela de Login já deve estar aqui */}
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
      />

      {/* 2. ADICIONE ISTO: A tela de CadastroUsuario OBRIGATÓRIAMENTE precisa estar aqui */}
      <Stack.Screen 
        name="CadastroUsuario"  // <--- Este NOME deve ser IDÊNTICO ao que você usa no navigation.navigate
        component={CadastroUsuario} 
        options={{ title: 'Criar Conta' }} // Opcional
      />

      {/* Outras rotas protegidas (como Home) podem estar aqui ou em outro navegador */}
      <Stack.Screen name="Home" component={Home} />

    </Stack.Navigator>
  );
}