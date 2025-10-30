import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

export default function Paciente() {
  const API_URL = "http://localhost:3000/pacientes";

  const [paciente, setPaciente] = useState({
    nome: "",
    dataNascimento: "",
    telefone: "",
    email: "",
    sexo: "",
    nomeMae: "",
    periodo: "",
  });

  const [listaPacientes, setListaPacientes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  //  Buscar todos os pacientes
  const carregarPacientes = async () => {
    try {
      const response = await axios.get(`${API_URL}/getpacientes`);
      setListaPacientes(response.data);
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
      Alert.alert("Erro", "Não foi possível carregar os pacientes.");
    }
  };

  useEffect(() => {
    carregarPacientes();
  }, []);

  // Inserir paciente
  const salvarPaciente = async () => {
    try {
      if (editandoId) {
        await axios.put(`${API_URL}/updatepaciente/${editandoId}`, paciente);
        Alert.alert("✅", "Paciente atualizado com sucesso!");
      } else {
        await axios.post(`${API_URL}/insertpaciente`, paciente);
        Alert.alert("✅", "Paciente cadastrado com sucesso!");
      }

      setPaciente({
        nome: "",
        dataNascimento: "",
        telefone: "",
        email: "",
        sexo: "",
        nomeMae: "",
        periodo: "",
      });
      setEditandoId(null);
      carregarPacientes();
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
      Alert.alert("Erro", "Falha ao salvar paciente.");
    }
  };

  //  Excluir paciente
  const excluirPaciente = async (id) => {
    Alert.alert("Confirmação", "Deseja realmente excluir este paciente?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/deletepaciente/${id}`);
            carregarPacientes();
          } catch (error) {
            console.error("Erro ao excluir:", error);
            Alert.alert("Erro", "Falha ao excluir paciente.");
          }
        },
      },
    ]);
  };

  // Editar paciente
  const editarPaciente = (item) => {
    setPaciente({
      nome: item.nome,
      dataNascimento: item.dataNascimento,
      telefone: item.telefone,
      email: item.email,
      sexo: item.sexo,
      nomeMae: item.nomeMae,
      periodo: item.periodo,
    });
    setEditandoId(item.idPaciente);
  };

  return (
    <View style={Estilo.fundo}>
      <View style={Estilo.ficha}>
        <View style={Estilo.header}>
          <MaterialIcons name="account-circle" size={60} color="#fff" />
          <Text style={Estilo.txtLogin}>{editandoId ? "Editar Paciente" : "Cadastro de Paciente"}</Text>
        </View>

        <View style={Estilo.body}>
          {Object.keys(paciente).map((campo) => (
            <View key={campo}>
              <Text style={Estilo.label}>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</Text>
              <TextInput
                style={Estilo.input}
                value={paciente[campo]}
                placeholder={`Digite ${campo}`}
                onChangeText={(texto) => setPaciente({ ...paciente, [campo]: texto })}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity style={Estilo.botao} onPress={salvarPaciente}>
          <Text style={Estilo.textoBotao}>{editandoId ? "Atualizar" : "Salvar"}</Text>
        </TouchableOpacity>

        <FlatList
          style={{ marginTop: 20 }}
          data={listaPacientes}
          keyExtractor={(item) => item.idPaciente.toString()}
          renderItem={({ item }) => (
            <View style={Estilo.itemLista}>
              <View style={{ flex: 1 }}>
                <Text style={Estilo.nomePaciente}>{item.nome}</Text>
                <Text style={Estilo.infoPaciente}>{item.telefone}</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
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
    </View>
  );
}

const Estilo = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: "#001f33", alignItems: "center", padding: 20 },
  ficha: { width: "100%", borderColor: "#d3d3d3", borderWidth: 2, borderRadius: 12, padding: 20 },
  header: { alignItems: "center", marginBottom: 20 },
  txtLogin: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  body: { width: "100%", marginBottom: 20 },
  label: { color: "#fff", fontSize: 14, marginBottom: 5 },
  input: { backgroundColor: "#E9F8FF", borderRadius: 6, padding: 8, marginBottom: 12 },
  botao: { backgroundColor: "#00c817", padding: 12, borderRadius: 8, alignItems: "center" },
  textoBotao: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  itemLista: { flexDirection: "row", alignItems: "center", backgroundColor: "#e9f8ff", padding: 10, borderRadius: 8, marginBottom: 8 },
  nomePaciente: { fontWeight: "bold", color: "#001f33" },
  infoPaciente: { color: "#333" },
});
