import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const MOCK_TIPAGEM_SANGUINEA = [
  {
    id: "1",
    name: "Ana Silva",
    antigeno: "A",
    variante: "positivo",
    antiA: "positivo",
    antiB: "negativo",
    antiD: "positivo",
    teste: "negativo",
    date: "2025-09-10",
  },
  {
    id: "2",
    name: "Bruno Costa",
    antigeno: "O",
    variante: "negativo",
    antiA: "negativo",
    antiB: "negativo",
    antiD: "negativo",
    teste: "negativo",
    date: "2025-09-12",
  },
  {
    id: "3",
    name: "Carla Dias",
    antigeno: "AB",
    variante: "positivo",
    antiA: "positivo",
    antiB: "positivo",
    antiD: "positivo",
    teste: "positivo",
    date: "2025-08-30",
  },
  {
    id: "4",
    name: "Daniel Alves",
    antigeno: "B",
    variante: "positivo",
    antiA: "negativo",
    antiB: "positivo",
    antiD: "positivo",
    teste: "negativo",
    date: "2025-09-01",
  },
  {
    id: "5",
    name: "Elisa Martins",
    antigeno: "O",
    variante: "negativo",
    antiA: "negativo",
    antiB: "negativo",
    antiD: "negativo",
    teste: "negativo",
    date: "2025-09-15",
  },
];

export default function TipagemSanguinea() {
  const [pesquisa, setPesquisa] = useState("");
  const [antigeno, setAntigeno] = useState("");
  const [variante, setVariante] = useState("");
  const [antiA, setAntiA] = useState("");
  const [antiB, setAntiB] = useState("");
  const [antiD, setAntiD] = useState("");
  const [teste, setTeste] = useState("");

  const resultadosFiltrados = MOCK_TIPAGEM_SANGUINEA.filter((item) =>
    item.name.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.searchContainer}>
          <MaterialIcons
            name="search"
            size={22}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Pesquisar por nome..."
            style={styles.searchInput}
            value={pesquisa}
            onChangeText={setPesquisa}
          />
        </View>

        <Text style={styles.title}>Tipagem Sanguínea</Text>

        <TextInput
          placeholder="Antígeno (A, B, AB, O)"
          style={styles.input}
          value={antigeno}
          onChangeText={setAntigeno}
        />
        <TextInput
          placeholder="Variante (positivo/negativo)"
          style={styles.input}
          value={variante}
          onChangeText={setVariante}
        />

        <Text style={styles.subtitle}>Soro de mesa diluindo</Text>

        <TextInput
          placeholder="Anti-A (positivo/negativo)"
          style={styles.input}
          value={antiA}
          onChangeText={setAntiA}
        />
        <TextInput
          placeholder="Anti-B (positivo/negativo)"
          style={styles.input}
          value={antiB}
          onChangeText={setAntiB}
        />
        <TextInput
          placeholder="Anti-D (positivo/negativo)"
          style={styles.input}
          value={antiD}
          onChangeText={setAntiD}
        />

        <Text style={styles.subtitle}>Teste direto da antiglobulina</Text>
        <TextInput
          placeholder="Resultado teste (positivo/negativo)"
          style={styles.input}
          value={teste}
          onChangeText={setTeste}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar Dados</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Registros de Tipagem</Text>
        {resultadosFiltrados.length > 0 ? (
          resultadosFiltrados.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <Text style={styles.listName}>{item.name}</Text>
              <Text style={styles.listInfo}>
                {`Antígeno: ${item.antigeno} | Variante: ${item.variante}`}
              </Text>
              <Text style={styles.listInfo}>
                {`Anti-A: ${item.antiA}, Anti-B: ${item.antiB}, Anti-D: ${item.antiD}`}
              </Text>
              <Text style={styles.listDate}>Data: {item.date}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noResults}>Nenhum registro encontrado.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fafafa",
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fafafa",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    width: "100%",
    maxWidth: 420,
    marginTop: 24,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#333",
  },
  listItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  listName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  listInfo: {
    fontSize: 14,
    color: "#555",
  },
  listDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  noResults: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});