import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ExamesList from './index';  // sua página atual de exames
import EditarExames from '../editarExames';
import AdicionarExames from '../adicionarExames';

const Stack = createStackNavigator();

export default function ExamesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ExamesList" 
                component={ExamesList} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="EditarExames" 
                component={EditarExames}
                options={{ 
                    title: 'Editar Exames',
                    headerStyle: {
                        backgroundColor: '#007BFF',
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen 
                name="AdicionarExames" 
                component={AdicionarExames}
                options={{ 
                    title: 'Adicionar Exame',
                    headerStyle: {
                        backgroundColor: '#007BFF',
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    );
}