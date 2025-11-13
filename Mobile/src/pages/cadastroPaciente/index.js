import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

// Funções auxiliares de formatação de data
const formatarData = (data) => {
  if (!data) return "";
  try {
    return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  } catch (e) {
    return data;
  }
};
const formatarDataParaInput = (data) => {
    if (!data) return "";
    try {
        const d = new Date(data);
        const mes = (d.getUTCMonth() + 1).toString().padStart(2, '0');
        const dia = d.getUTCDate().toString().padStart(2, '0');
        const ano = d.getUTCFullYear();
        return `${ano}-${mes}-${dia}`;
    } catch (e) {
        return "";
    }
};

export default function Paciente() {
  // ATENÇÃO: Se estiver usando emulador/dispositivo, troque 'localhost' pelo IP da sua máquina.
  const API_URL = "http://localhost:3000/pacientes"; 

  const [paciente, setPaciente] = useState({
    nome: "", telefone: "", email: "", dataNascimento: "",
    sexo: "", nomeMae: "", periodo: "",
  }  );

  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [carregando, setCarregando] = useState(false);
  
  const navigation = useNavigation();

  useEffect(() => {
    buscarPacientes();
  }, []);

  const buscarPacientes = async () => {
    try {
      setCarregando(true);
      // GET /pacientes/getpacientes
      const { data } = await axios.get(`${API_URL}/getpacientes`); 
      setPacientes(data);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
      Alert.alert("Erro", "Não foi possível carregar os pacientes.");
    } finally {
      setCarregando(false);
    }
  };

  const salvarPaciente = async () => {
    try {
      if (!paciente.nome.trim() || !paciente.telefone.trim() || !paciente.email.trim()) {
        Alert.alert("Atenção", "Preencha os campos obrigatórios: Nome, Telefone e Email.");
        return;
      }
      if (editandoId) {
        // CORRIGIDO: PUT /pacientes/:id
        await axios.put(`${API_URL}/${editandoId}`, paciente);
        Alert.alert("Sucesso", "Paciente atualizado!");
      } else {
        // CORRIGIDO: POST /pacientes
        await axios.post(`${API_URL}`, paciente);
        Alert.alert("Sucesso", "Paciente cadastrado!");
      }
      limparCampos();
      buscarPacientes();
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
      Alert.alert("Erro", "Não foi possível salvar o paciente.");
    }
  };

  const editarPaciente = (item) => {
    setPaciente({
      nome: item.nome || "",
      telefone: item.telefone || "",
      email: item.email || "",
      dataNascimento: formatarDataParaInput(item.dataNascimento),
      sexo: item.sexo || "",
      nomeMae: item.nomeMae || "",
      periodo: item.periodo || "",
    });
    setEditandoId(item.idPaciente);
  };

  const excluirPaciente = async (id) => {
    Alert.alert(
      "Excluir paciente", "Tem certeza que deseja excluir este paciente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir", style: "destructive",
          onPress: async () => {
            try {
              // CORRIGIDO: DELETE /pacientes/:id
              await axios.delete(`${API_URL}/${id}`);
              Alert.alert("Sucesso", "Paciente excluído!");
              buscarPacientes();
            } catch (error) {
              console.error("Erro ao excluir paciente:", error);
              Alert.alert("Erro", "Não foi possível excluir o paciente.");
            }
          },
        },
      ]
    );
  };

  const limparCampos = () => {
    setPaciente({
      nome: "", telefone: "", email: "", dataNascimento: "",
      sexo: "", nomeMae: "", periodo: "",
    });
    setEditandoId(null);
  };

  const filtrados = pacientes.filter((p) =>
    p.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  // 🔹 Navegar para adicionar exame
  const irParaAdicionarExame = (pacienteId) => {
    if (pacienteId) {
      navigation.navigate('AdicionarExames', { pacienteId: pacienteId });
    }
  };

  return (
    <View style={estilo.container}>
      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.idPaciente.toString()}
        ListHeaderComponent={
          <>
            <View style={estilo.prancheta}>
              <View style={estilo.header}>
                <MaterialIcons name="assignment" size={60} color="#FFD700" />
                <Text style={estilo.titulo}>
                  {editandoId ? "Editar Paciente" : "Cadastro de Paciente"}
                </Text>
              </View>
              {[
                { placeholder: "Nome completo", key: "nome" },
                { placeholder: "Telefone", key: "telefone" },
                { placeholder: "Email", key: "email" },
                { placeholder: "Data de nascimento (YYYY-MM-DD)", key: "dataNascimento" },
                { placeholder: "Sexo", key: "sexo" },
                { placeholder: "Nome da mãe", key: "nomeMae" },
                { placeholder: "Período (Ex: Matutino)", key: "periodo" },
              ].map((campo, i) => (
                <TextInput
                  key={i} style={estilo.input} placeholder={campo.placeholder}
                  placeholderTextColor="#666" value={paciente[campo.key]}
                  onChangeText={(v) => setPaciente({ ...paciente, [campo.key]: v })}
                />
              ))}
              <TouchableOpacity style={estilo.botao} onPress={salvarPaciente}>
                <Text style={estilo.textoBotao}>{editandoId ? "Atualizar" : "Salvar"}</Text>
              </TouchableOpacity>
            </View>
            <View style={estilo.searchBox}>
              <MaterialIcons name="search" size={24} color="#003366" />
              <TextInput
                style={estilo.searchInput} placeholder="Pesquisar paciente"
                placeholderTextColor="#6d6d6d" value={busca} onChangeText={setBusca}
              />
            </View>
            <Text style={estilo.headerTitle}>Visualizar Pacientes</Text>
          </>
        }
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#777", marginTop: 20 }}>
            Nenhum paciente encontrado
          </Text>
        }
        renderItem={({ item }) => (
          <View style={estilo.card}>
            <View style={{ flex: 1 }}>
              <Text style={estilo.nome}>{item.nome}</Text>
              <Text>{item.telefone}</Text>
              <Text>{item.email}</Text>
              <Text>{formatarData(item.dataNascimento)}</Text>
              <Text>{item.sexo}</Text>
              <Text>{item.nomeMae}</Text>
              <Text>{item.periodo}</Text>
            </View>
            <View style={estilo.icons}>
              <TouchableOpacity onPress={() => irParaAdicionarExame(item.idPaciente)}>
                <MaterialIcons name="note-add" size={28} color="#28a745" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => editarPaciente(item)}>
                <MaterialIcons name="edit" size={28} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirPaciente(item.idPaciente)}>
                <MaterialIcons name="delete" size={28} color="#ff4d4d" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={carregando ? <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 20 }} /> : null}
      />
    </View>
  );
}

const estilo = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  prancheta: { backgroundColor: "#f9f9ff", borderWidth: 2, borderColor: "#007bff33", borderRadius: 14, padding: 20, marginBottom: 25 },
  header: { alignItems: "center", marginBottom: 15 },
  titulo: { fontSize: 20, fontWeight: "700", color: "#003366" },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#003366', marginBottom: 10, marginTop: 10 },
  input: { backgroundColor: "#fff", borderWidth: 1.5, borderColor: "#007bff33", borderRadius: 8, padding: 12, marginBottom: 10, color: "#003366" },
  botao: { backgroundColor: "#28a745", paddingVertical: 14, borderRadius: 8, marginTop: 5 },
  textoBotao: { textAlign: "center", color: "#fff", fontWeight: "700" },
  searchBox: { flexDirection: "row", alignItems: "center", borderWidth: 1.5, borderColor: "#007bff33", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, marginBottom: 10 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: "#003366" },
  card: { backgroundColor: "#fff", borderWidth: 1.5, borderColor: "#007bff22", borderRadius: 10, padding: 14, marginBottom: 12, flexDirection: "row", justifyContent: "space-between" },
  nome: { fontWeight: "700", fontSize: 16, marginBottom: 4 },
  icons: { flexDirection: "row", gap: 18, alignItems: "center" },
});
