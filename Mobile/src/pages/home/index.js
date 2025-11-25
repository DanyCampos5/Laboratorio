import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#E3F2FD", "#FFFFFF"]}
      style={styles.container}
    >
      {/* Topo */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Acesso Rapido</Text>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.mainArea}>

        <View style={styles.content}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Paciente")}
            activeOpacity={0.8}
          >
            <MaterialIcons name="person" size={26} color="#007BFF" />
            <Text style={styles.buttonText}>PACIENTE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Exames")}
            activeOpacity={0.8}
          >
            <MaterialIcons name="science" size={26} color="#007BFF" />
            <Text style={styles.buttonText}>EXAMES</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Laudo")}
            activeOpacity={0.8}
          >
            <MaterialIcons name="description" size={26} color="#007BFF" />
            <Text style={styles.buttonText}>LAUDOS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Paciente")}
            activeOpacity={0.8}
          >
            <MaterialIcons name="people" size={26} color="#007BFF" />
            <Text style={styles.buttonText}>PACIENTES</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CadastroUsuario")}
            activeOpacity={0.8}
          >
            <MaterialIcons name="person-add" size={26} color="#007BFF" />
            <Text style={styles.buttonText}>CADASTRO USUÁRIO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#007BFF",
  },
  mainArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    marginLeft: 4,
  },
  content: {
    flex: 1,
    alignItems: "center",
    gap: 16,
  },
  button: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    width: "100%",
    maxWidth: 300,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007BFF",
    marginLeft: 12,
  },
});
