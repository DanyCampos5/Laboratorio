import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../../services/api";

export default function TipagemSanguinea() {
  const [pesquisa, setPesquisa] = useState("");
  const [lista, setLista] = useState([]);

  // Form State
  const [antigeno, setAntigeno] = useState("");
  const [variante, setVariante] = useState("");
  const [antiA, setAntiA] = useState("");
  const [antiB, setAntiB] = useState("");
  const [antiD, setAntiD] = useState("");
  const [teste, setTeste] = useState("");

  // Edit State
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  async function carregarRegistros() {
    try {
      const response = await api.get("/labimuno/tipagem");
      setLista(response.data);
    } catch (error) {
      console.log("Erro ao carregar registros:", error);
      if (Platform.OS === 'web') {
        alert("Não foi possível carregar os registros.");
      } else {
        Alert.alert("Erro", "Não foi possível carregar os registros.");
      }
    }
  }

  useEffect(() => {
    carregarRegistros();
  }, []);

  async function salvarDados() {
    if (!antigeno || !variante || !antiA || !antiB || !antiD || !teste) {
      if (Platform.OS === 'web') {
        alert("Preencha todos os campos.");
      } else {
        Alert.alert("Erro", "Preencha todos os campos.");
      }
      return;
    }

    const dados = {
      antigeno,
      variante,
      antiA,
      antiB,
      antiD,
      teste,
    };

    try {
      if (editMode && editId) {
        await api.put(`/labimuno/tipagem/${editId}`, dados);
        if (Platform.OS === 'web') {
          alert("Registro atualizado!");
        } else {
          Alert.alert("Sucesso", "Registro atualizado!");
        }
      } else {
        await api.post("/labimuno/tipagem", dados);
        if (Platform.OS === 'web') {
          alert("Registro salvo!");
        } else {
          Alert.alert("Sucesso", "Registro salvo!");
        }
      }

      limparFormulario();
      carregarRegistros();
    } catch (error) {
      console.log("Erro ao salvar:", error);
      if (Platform.OS === 'web') {
        alert("Ocorreu um erro ao salvar.");
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao salvar.");
      }
    }
  }

  function limparFormulario() {
    setAntigeno("");
    setVariante("");
    setAntiA("");
    setAntiB("");
    setAntiD("");
    setTeste("");
    setEditMode(false);
    setEditId(null);
  }

  function handleEdit(item) {
    setAntigeno(item.antigeno);
    setVariante(item.variante);
    setAntiA(item.antiA);
    setAntiB(item.antiB);
    setAntiD(item.antiD);
    setTeste(item.teste);
    setEditMode(true);
    setEditId(item.id);
  }

  function handleDelete(id) {
    console.log("handleDelete chamado com id:", id);

    if (Platform.OS === 'web') {
      const confirm = window.confirm("Tem certeza que deseja excluir este registro?");
      if (confirm) {
        deleteItem(id);
      }
    } else {
      Alert.alert(
        "Excluir",
        "Tem certeza que deseja excluir este registro?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Excluir",
            style: "destructive",
            onPress: () => deleteItem(id),
          },
        ]
      );
    }
  }

  async function deleteItem(id) {
    try {
      console.log(`Tentando excluir: /labimuno/tipagem/${id}`);
      const response = await api.delete(`/labimuno/tipagem/${id}`);
      console.log("Resposta do delete:", response.status, response.data);

      if (Platform.OS === 'web') {
        alert("Registro excluído!");
      } else {
        Alert.alert("Sucesso", "Registro excluído!");
      }
      carregarRegistros();
    } catch (error) {
      console.log("Erro ao excluir:", error);
      if (error.response) {
        console.log("Dados do erro:", error.response.data);
        console.log("Status do erro:", error.response.status);
      }

      if (Platform.OS === 'web') {
        alert("Falha ao excluir registro.");
      } else {
        Alert.alert("Erro", "Falha ao excluir registro.");
      }
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

        <Text style={styles.title}>
          {editMode ? "Editar Tipagem" : "Nova Tipagem Sanguínea"}
        </Text>

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

        <View style={styles.buttonRow}>
          {editMode && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={limparFormulario}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.button, styles.saveButton, editMode && styles.updateButton]}
            onPress={salvarDados}
          >
            <Text style={styles.buttonText}>
              {editMode ? "Atualizar" : "Salvar Dados"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Registros de Tipagem</Text>

        {resultadosFiltrados.length > 0 ? (
          resultadosFiltrados.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <View style={styles.listItemContent}>
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

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  onPress={() => handleEdit(item)}
                  style={styles.iconButton}
                >
                  <MaterialIcons name="edit" size={24} color="#007BFF" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={styles.iconButton}
                >
                  <MaterialIcons name="delete" size={24} color="#FF3B30" />
                </TouchableOpacity>
              </View>
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#1976D2",
  },
  updateButton: {
    backgroundColor: "#2e7d32", // Green for update
  },
  cancelButton: {
    backgroundColor: "#757575",
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemContent: {
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    padding: 8,
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