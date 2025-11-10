import { Text, View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Home() {
    const navigation = useNavigation();
    return(
    <View style={Estilo.container}>
        <View style={Estilo.topBar}>
            <Text style={Estilo.textobarra}>HOME</Text>
        </View>
        
      <View style={Estilo.mainArea}>
        <View style={Estilo.content}>
            <TouchableOpacity 
                style={Estilo.botao}
                onPress={() => navigation.navigate('Usuario')}
                activeOpacity={0.7}
            >
                <MaterialIcons name="person" size={24} color="#fff" />
                <Text style={Estilo.textobotao}>USUÁRIO</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={Estilo.botao}
                onPress={() => navigation.navigate('Exames')}
                activeOpacity={0.7}
            >
                <MaterialIcons name="science" size={24} color="#fff" />
                <Text style={Estilo.textobotao}>EXAMES</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={Estilo.botao}
                onPress={() => navigation.navigate('Laudo')}
                activeOpacity={0.7}
            >
                <MaterialIcons name="description" size={24} color="#fff" />
                <Text style={Estilo.textobotao}>LAUDOS</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={Estilo.botao}
                onPress={() => navigation.navigate('Pacientes')}
                activeOpacity={0.7}
            >
                <MaterialIcons name="people" size={24} color="#fff" />
                <Text style={Estilo.textobotao}>PACIENTES</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
    );
}

const Estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    flexDirection: "column"
  },
  topBar: {
    height: Platform.OS === 'ios' ? 90 : 60,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textobarra: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600"
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  botao: {
    backgroundColor: "#007BFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
    maxWidth: 280,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textobotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12
  },
  mainArea: {
    flex: 1,
  },
});