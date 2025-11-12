
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Paciente from './src/pages/cadastroPaciente';
import ExamesStack from './src/pages/exames/ExamesStack';
import Home from './src/pages/home';
import TipagemSanguinea from './src/pages/LabImuno';
import LaudoStack from './src/pages/Laudo/LaudoStack';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Exames" component={ExamesStack} />
        <Tab.Screen name="Paciente" component={Paciente} />
        <Tab.Screen name="Tipagem" component={TipagemSanguinea} />
        <Tab.Screen name="Laudo" component={LaudoStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
