import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

export default function Paciente() {
  const API_URL = "http://192.168.0.105:3000/pacientes"; // ⚠️ troque pelo IP da sua máquina

  const [paciente, setPaciente] = useState({
    nome: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    sexo: "",
    nomeMae: "",
    periodo: "",
  });

  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    buscarPacientes();
  }, []);

  const buscarPacientes = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/getpacientes`);
      setPacientes(data);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  };

  const salvarPaciente = async () => {
    try {
      if (!paciente.nome || !paciente.telefone || !paciente.email) {
        Alert.alert("Atenção", "Preencha os campos obrigatórios.");
        return;
      }

      if (editandoId) {
        await axios.put(`${API_URL}/updatepaciente/${editandoId}`, paciente);
        Alert.alert("Sucesso", "Paciente atualizado!");
        setEditandoId(null);
      } else {
        await axios.post(`${API_URL}/insertpaciente`, paciente);
        Alert.alert("Sucesso", "Paciente cadastrado!");
      }

      setPaciente({
        nome: "",
        telefone: "",
        email: "",
        dataNascimento: "",
        sexo: "",
        nomeMae: "",
        periodo: "",
      });

      buscarPacientes();
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
    }
  };

  const editarPaciente = (item) => {
    setPaciente({
      nome: item.nome,
      telefone: item.telefone,
      email: item.email,
      dataNascimento: item.dataNascimento,
      sexo: item.sexo,
      nomeMae: item.nomeMae,
      periodo: item.periodo,
    });
    setEditandoId(item.idPaciente);
  };

  const excluirPaciente = async (id) => {
    try {
      await axios.delete(`${API_URL}/deletepaciente/${id}`);
      Alert.alert("Removido", "Paciente excluído com sucesso!");
      buscarPacientes();
    } catch (error) {
      console.error("Erro ao excluir paciente:", error);
    }
  };

  const filtrados = pacientes.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={estilo.container}>
      <View style={estilo.prancheta}>
        <View style={estilo.header}>
          <MaterialIcons name="assignment" size={60} color="#FFD700" />
          <Text style={estilo.titulo}>
            {editandoId ? "Editar Paciente" : "Cadastro de Paciente"}
          </Text>
        </View>

        <TextInput
          style={estilo.input}
          placeholder="Nome completo"
          placeholderTextColor="#666"
          value={paciente.nome}
          onChangeText={(v) => setPaciente({ ...paciente, nome: v })}
        />
        <TextInput
          style={estilo.input}
          placeholder="Telefone"
          placeholderTextColor="#666"
          value={paciente.telefone}
          onChangeText={(v) => setPaciente({ ...paciente, telefone: v })}
        />
        <TextInput
          style={estilo.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={paciente.email}
          onChangeText={(v) => setPaciente({ ...paciente, email: v })}
        />
        <TextInput
          style={estilo.input}
          placeholder="Data de nascimento"
          placeholderTextColor="#666"
          value={paciente.dataNascimento}
          onChangeText={(v) => setPaciente({ ...paciente, dataNascimento: v })}
        />
        <TextInput
          style={estilo.input}
          placeholder="Sexo"
          placeholderTextColor="#666"
          value={paciente.sexo}
          onChangeText={(v) => setPaciente({ ...paciente, sexo: v })}
        />
        <TextInput
          style={estilo.input}
          placeholder="Nome da mãe"
          placeholderTextColor="#666"
          value={paciente.nomeMae}
          onChangeText={(v) => setPaciente({ ...paciente, nomeMae: v })}
        />
        <TextInput
          style={estilo.input}
          placeholder="Período (Ex: Matutino)"
          placeholderTextColor="#666"
          value={paciente.periodo}
          onChangeText={(v) => setPaciente({ ...paciente, periodo: v })}
        />

        <TouchableOpacity style={estilo.botao} onPress={salvarPaciente}>
          <Text style={estilo.textoBotao}>
            {editandoId ? "Atualizar" : "Salvar"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={estilo.searchBox}>
        <MaterialIcons name="search" size={24} color="#003366" />
        <TextInput
          style={estilo.searchInput}
          placeholder="Pesquisar paciente"
          placeholderTextColor="#6d6d6d"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.idPaciente.toString()}
        renderItem={({ item }) => (
          <View style={estilo.card}>
            <View style={{ flex: 1 }}>
              <Text style={estilo.nome}>{item.nome}</Text>
              <Text>{item.telefone}</Text>
              <Text>{item.email}</Text>
              <Text>{item.dataNascimento}</Text>
              <Text>{item.sexo}</Text>
              <Text>{item.nomeMae}</Text>
              <Text>{item.periodo}</Text>
            </View>
            <View style={estilo.icons}>
              <TouchableOpacity onPress={() => editarPaciente(item)}>
                <MaterialIcons name="edit" size={28} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirPaciente(item.idPaciente)}>
                <MaterialIcons name="delete" size={28} color="#ff4d4d" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

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

  header: {
    alignItems: "center",
    marginBottom: 15,
  },

  titulo: { fontSize: 20, fontWeight: "700", color: "#003366" },

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
