import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

// Importar as telas que farão parte do Drawer
import Home from "../pages/home/index.js";
import cadastroPaciente from "../pages/cadastroPaciente/index.js";
import Laudo from "../pages/Laudo/BuscarLaudo.js";
import exames from "../pages/exames/index.js";
import Lablmuno from "../pages/LabImuno/index.js";
import AdicionarExames from "../pages/adicionarExames/index.js";
import EditarExames from "../pages/editarExames/index.js"; // Adicionado
import CadastroUsuario from "../pages/cadastroUsuario/index.js";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack Navigator para a tela Home e suas rotas relacionadas
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Usuario" component={CadastroUsuario} />
      <Stack.Screen name="Laudo" component={Laudo} />
      <Stack.Screen name="Exames" component={exames} />
      <Stack.Screen name="Paciente" component={cadastroPaciente} />
      <Stack.Screen name="AdicionarExames" component={AdicionarExames} />
      <Stack.Screen name="EditarExames" component={EditarExames} />
      <Stack.Screen name="LabImuno" component={Lablmuno} />
    </Stack.Navigator>
  );
}

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="HomeStack">
      <Drawer.Screen name="HomeStack" component={HomeStack} options={{ title: "Início" }} />
      <Drawer.Screen name="HomeStack" component={CadastroUsuario} options={{ title: "Usuário" }} />
      <Drawer.Screen name="cadastroPaciente" component={cadastroPaciente} options={{ title: "Cadastrar Paciente" }} />
      <Drawer.Screen name="Laudo" component={Laudo} options={{ title: "Buscar Laudo" }} />
      <Drawer.Screen name="exames" component={exames} options={{ title: "Exames" }} />
      <Drawer.Screen name="LabImuno" component={Lablmuno} options={{ title: "Lab Imuno" }} />
      <Drawer.Screen name="AdicionarExames" component={AdicionarExames} options={{ title: "Adicionar Exames" }} />
    </Drawer.Navigator>
  );
}
