import React from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Platform, 
  ScrollView 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={Estilo.container}>
      {/* Barra superior com gradiente */}
      <LinearGradient
        colors={["#007BFF", "#005fcc"]}
        style={Estilo.topBar}
      >
        <Text style={Estilo.textoBarra}>🏥 Painel Principal</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={Estilo.scrollContent}>
        <Text style={Estilo.subtitulo}>Acesso rápido</Text>

        <View style={Estilo.grid}>
          <TouchableOpacity 
            style={[Estilo.card, { backgroundColor: "#007BFF" }]}
            onPress={() => navigation.navigate("Usuario")}
            activeOpacity={0.8}
          >
            <MaterialIcons name="person-outline" size={38} color="#fff" />
            <Text style={Estilo.cardText}>Usuário</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[Estilo.card, { backgroundColor: "#28a745" }]}
            onPress={() => navigation.navigate("Exames")}
            activeOpacity={0.8}
          >
            <MaterialIcons name="science" size={38} color="#fff" />
            <Text style={Estilo.cardText}>Exames</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[Estilo.card, { backgroundColor: "#17a2b8" }]}
            onPress={() => navigation.navigate("Laudo")}
            activeOpacity={0.8}
          >
            <MaterialIcons name="description" size={38} color="#fff" />
            <Text style={Estilo.cardText}>Laudos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[Estilo.card, { backgroundColor: "#6f42c1" }]}
            onPress={() => navigation.navigate("Pacientes")}
            activeOpacity={0.8}
          >
            <MaterialIcons name="people-outline" size={38} color="#fff" />
            <Text style={Estilo.cardText}>Pacientes</Text>
          </TouchableOpacity>
        </View>

        <Text style={Estilo.footerText}>
          Sistema Médico Universitário © 2025
        </Text>
      </ScrollView>
    </View>
  );
}

const Estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  topBar: {
    height: Platform.OS === "ios" ? 100 : 80,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 14,
    paddingTop: Platform.OS === "ios" ? 40 : 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  textoBarra: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  subtitulo: {
    alignSelf: "flex-start",
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
    marginBottom: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    aspectRatio: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  footerText: {
    marginTop: 40,
    fontSize: 13,
    color: "#999",
  },
});
