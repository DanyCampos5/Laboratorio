import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BuscarLaudo from './BuscarLaudo';
import ResultadoLaudo from './ResultadoLaudo';

const Stack = createNativeStackNavigator();

export default function LaudoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Buscar" 
        component={BuscarLaudo}
        options={{ title: 'Buscar Laudo' }} 
      />
      <Stack.Screen 
        name="Resultado" 
        component={ResultadoLaudo} 
        options={{ title: 'Resultado do Exame' }}
      />
    </Stack.Navigator>
  );
}