import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListagemUsuario from "./ListagemUsuario";
import CadastroUsuario from "./CadastroUsuario";

const Stack = createNativeStackNavigator();

export default function UsuarioStack() {

    return (
        <Stack.Navigator initialRouteName="Listagem">
            <Stack.Screen
                name="Listagem"
                component={ListagemUsuario}
                options={{ title: "Lista de Usuários" }}
            />
            <Stack.Screen
                name="Cadastro"
                component={CadastroUsuario}
                options={{ title: "Cadastro de Usuário" }}
            />
        </Stack.Navigator>
    );
}
