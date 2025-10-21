import { Text, View, StyleSheet, TouchableOpacity, } from "react-native";

export default function Home() {
    return(
    <View style={Estilo.container}>
        <View style={Estilo.topBar}>
            <Text style={Estilo.textobarra}>HOME</Text>
        </View>
        
      <View style={Estilo.mainArea}>
        <View style={Estilo.content}>
            <TouchableOpacity style={Estilo.botao}>
                <Text style={Estilo.textobotao}>ADM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Estilo.botao}>
                <Text style={Estilo.textobotao}>EXAMES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Estilo.botao}>
                <Text style={Estilo.textobotao}>LAUDOS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Estilo.botao}>
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
    backgroundColor: '#ffffff',
    flexDirection: "column"
  },
  topBar: {
    height: 60,
    backgroundColor: "#007BFF", // Azul
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10, 
  },
  textobarra: {
    fontSize: 20,
    color: "#ffffffff"
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  botao: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
  },
  textobotao: {
    color: "#ffffffff"
  },
  mainArea: {
    flex: 1,
    flexDirection: "row", // aqui sim: barra lateral + conteúdo
  },
});