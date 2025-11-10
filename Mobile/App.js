
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/pages/home';
import ExamesStack from './src/pages/exames/ExamesStack';
import Paciente from './src/pages/cadastroPaciente';
import TipagemSanguinea from './src/pages/LabImuno';
import ResultadoLaudo from './src/pages/Laudo';
import CadastroUsuario from './src/pages/cadastroUsuario';
import ListaUsuarios from './src/pages/cadastroUsuario/listaUsuario';
import UsuariosStack from './src/pages/cadastroUsuario/usuarioStack';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Usuario" component={UsuariosStack} />
        <Tab.Screen name="Exames" component={ExamesStack} />
        <Tab.Screen name="Paciente" component={Paciente} />
        <Tab.Screen name="Tipagem" component={TipagemSanguinea} />
        <Tab.Screen name="Laudo" component={ResultadoLaudo} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
