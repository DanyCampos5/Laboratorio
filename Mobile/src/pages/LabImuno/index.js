import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { API_BASE_URL } from "../../services/api";

export default function TipagemSanguinea() {
  const [pesquisa, setPesquisa] = useState("");
  const [lista, setLista] = useState([]);

  const [antigeno, setAntigeno] = useState("");
  const [variante, setVariante] = useState("");
  const [antiA, setAntiA] = useState("");
  const [antiB, setAntiB] = useState("");
  const [antiD, setAntiD] = useState("");
  const [teste, setTeste] = useState("");

  async function carregarRegistros() {
    try {
      const response = await fetch(`${API_BASE_URL}/labimuno/tipagem`);
      const data = await response.json();
      setLista(data);
    } catch (error) {
      console.log("Erro ao carregar registros:", error);
    }
  }

  useEffect(() => {
    carregarRegistros();
  }, []);

  async function salvarDados() {
    if (!antigeno || !variante || !antiA || !antiB || !antiD || !teste) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoRegistro = {
      antigeno,
      variante,
      antiA,
      antiB,
      antiD,
      teste,
    };

    try {
      await fetch(`${API_BASE_URL}/labimuno/tipagem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoRegistro),
      });

      setAntigeno("");
      setVariante("");
      setAntiA("");
      setAntiB("");
      setAntiD("");
      setTeste("");

      // recarregar lista
      carregarRegistros();
    } catch (error) {
      console.log("Erro ao salvar:", error);
    }
  }

  const resultadosFiltrados = lista.filter((item) =>
    item?.antigeno?.toLowerCase()?.includes(pesquisa.toLowerCase())
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
            placeholder="Pesquisar por antígeno..."
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

        <TouchableOpacity style={styles.button} onPress={salvarDados}>
          <Text style={styles.buttonText}>Salvar Dados</Text>
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Registros de Tipagem</Text>

        {resultadosFiltrados.length > 0 ? (
          resultadosFiltrados.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <Text style={styles.listName}>Registro #{item.id}</Text>

              <Text style={styles.listInfo}>
                {`Antígeno: ${item.antigeno} | Variante: ${item.variante}`}
              </Text>

              <Text style={styles.listInfo}>
                {`Anti-A: ${item.antiA}, Anti-B: ${item.antiB}, Anti-D: ${item.antiD}`}
              </Text>

              <Text style={styles.listDate}>
                Data: {item.date?.substring(0, 10)}
              </Text>
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