import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

export default function Paciente() {
  const API_URL = "http://192.168.0.105:3000"; // 🔵 seu IP aqui!

  const [paciente, setPaciente] = useState({
    nome: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    sexo: "",
  });

  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState("");

  // 🔹 Buscar pacientes ao iniciar
  useEffect(() => {
    carregarPacientes();
  }, []);

  async function carregarPacientes() {
    try {
      const { data } = await axios.get(`${API_URL}/getpacientes`);
      setPacientes(data);
    } catch (error) {
      console.log("Erro ao carregar pacientes:", error);
    }
  }

  async function salvar() {
    if (!paciente.nome.trim()) {
      Alert.alert("Atenção", "Preencha o nome do paciente");
      return;
    }

    try {
      await axios.post(`${API_URL}/insertpaciente`, paciente);
      Alert.alert("Sucesso", "Paciente cadastrado!");
      setPaciente({ nome: "", telefone: "", email: "", dataNascimento: "", sexo: "" });
      carregarPacientes();
    } catch (error) {
      console.log("Erro ao salvar paciente:", error);
      Alert.alert("Erro", "Falha ao salvar paciente");
    }
  }

  async function excluir(id) {
    try {
      await axios.delete(`${API_URL}/deletepaciente/${id}`);
      carregarPacientes();
    } catch (error) {
      console.log("Erro ao excluir:", error);
    }
  }

  async function editar(p) {
    setPaciente(p);
    await axios.delete(`${API_URL}/deletepaciente/${p.idPaciente}`); // opcional
  }

  const filtrados = pacientes.filter((p) =>
    p.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={estilo.container}>
      <View style={estilo.prancheta}>
        <Text style={estilo.titulo}>Cadastrar Paciente</Text>

        <TextInput
          style={estilo.input}
          placeholder="Nome completo"
          value={paciente.nome}
          onChangeText={(v) => setPaciente({ ...paciente, nome: v })}
        />
        <TextInput
          style={estilo.input}
          placeholder="Telefone"
          value={paciente.telefone}
          onChangeText={(v) => setPaciente({ ...paciente, telefone: v })}
        />
        <TextInput
          style={estilo.input}
          placeholder="Email"
          value={paciente.email}
          onChangeText={(v) => setPaciente({ ...paciente, email: v })}
        />
        <TextInput
          style={estilo.input}
          placeholder="Data de nascimento"
          value={paciente.dataNascimento}
          onChangeText={(v) => setPaciente({ ...paciente, dataNascimento: v })}
        />
        <TextInput
          style={estilo.input}
          placeholder="Sexo"
          value={paciente.sexo}
          onChangeText={(v) => setPaciente({ ...paciente, sexo: v })}
        />

        <TouchableOpacity style={estilo.botao} onPress={salvar}>
          <Text style={estilo.textoBotao}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <View style={estilo.searchBox}>
        <MaterialIcons name="search" size={24} color="#003366" />
        <TextInput
          style={estilo.searchInput}
          placeholder="Pesquisar paciente"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.idPaciente.toString()}
        renderItem={({ item }) => (
          <View style={estilo.card}>
            <View>
              <Text style={estilo.nome}>{item.nome}</Text>
              <Text>{item.telefone}</Text>
              <Text>{item.email}</Text>
              <Text>{item.dataNascimento}</Text>
              <Text>{item.sexo}</Text>
            </View>

            <View style={estilo.icons}>
              <TouchableOpacity onPress={() => editar(item)}>
                <MaterialIcons name="edit" size={28} color="#007bff" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => excluir(item.idPaciente)}>
                <MaterialIcons name="delete" size={28} color="#ff4d4d" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// 🔵 mesmo estilo que o anterior (mantém suas cores e prancheta)
const estilo = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  prancheta: {
    backgroundColor: "rgba(255,255,255,0.55)",
    borderWidth: 3,
    borderColor: "#007bff33",
    borderRadius: 14,
    padding: 20,
    marginBottom: 25,
  },
  titulo: { textAlign: "center", fontSize: 20, fontWeight: "700", marginBottom: 18 },
  input: {
    backgroundColor: "rgba(255,255,255,0.45)",
    borderWidth: 2,
    borderColor: "#007bff33",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    color: "#003366",
  },
  botao: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 5,
  },
  textoBotao: { textAlign: "center", color: "#fff", fontWeight: "700" },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.45)",
    borderWidth: 2,
    borderColor: "#007bff33",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: "#003366" },
  card: {
    backgroundColor: "rgba(255,255,255,0.45)",
    borderWidth: 2,
    borderColor: "#007bff33",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nome: { fontWeight: "700", fontSize: 16 },
  icons: { flexDirection: "row", gap: 18, alignItems: "center" },
});
