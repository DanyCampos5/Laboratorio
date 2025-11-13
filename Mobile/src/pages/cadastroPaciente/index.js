import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

// Função auxiliar para formatar a data de forma segura
const formatarData = (data) => {
  if (!data) return ""; // Retorna vazio se a data for nula ou indefinida
  try {
    // Cria um objeto Date e formata para o padrão local (ex: "dd/mm/yyyy")
    return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  } catch (e) {
    // Se a data for inválida, retorna a própria data (ou vazio)
    return data;
  }
};

// Função para formatar a data para o formato do input (YYYY-MM-DD)
const formatarDataParaInput = (data) => {
    if (!data) return "";
    try {
        const d = new Date(data);
        // Adiciona 1 ao mês porque getMonth() é base 0 (0-11)
        const mes = (d.getUTCMonth() + 1).toString().padStart(2, '0');
        const dia = d.getUTCDate().toString().padStart(2, '0');
        const ano = d.getUTCFullYear();
        return `${ano}-${mes}-${dia}`;
    } catch (e) {
        return "";
    }
};


export default function Paciente() {
  const API_URL = "http://localhost:3000/pacientes"; 

  const [paciente, setPaciente] = useState({
    nome: "", telefone: "", email: "", dataNascimento: "",
    sexo: "", nomeMae: "", periodo: "",
  } );

  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    buscarPacientes();
  }, []);

  const buscarPacientes = async () => {
    try {
      setCarregando(true);
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
    // ... (código sem alterações)
    try {
      if (!paciente.nome.trim() || !paciente.telefone.trim() || !paciente.email.trim()) {
        Alert.alert("Atenção", "Preencha os campos obrigatórios: Nome, Telefone e Email.");
        return;
      }
      if (editandoId) {
        await axios.put(`${API_URL}/updatepaciente/${editandoId}`, paciente);
        Alert.alert("Sucesso", "Paciente atualizado!");
      } else {
        await axios.post(`${API_URL}/insertpaciente`, paciente);
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
      // CORREÇÃO: Usa a função para formatar a data para o input
      dataNascimento: formatarDataParaInput(item.dataNascimento),
      sexo: item.sexo || "",
      nomeMae: item.nomeMae || "",
      periodo: item.periodo || "",
    });
    setEditandoId(item.idPaciente);
  };

  const excluirPaciente = async (id) => {
    // ... (código sem alterações)
    Alert.alert(
      "Excluir paciente", "Tem certeza que deseja excluir este paciente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir", style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/deletepaciente/${id}`);
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
    // ... (código sem alterações)
    setPaciente({
      nome: "", telefone: "", email: "", dataNascimento: "",
      sexo: "", nomeMae: "", periodo: "",
    });
    setEditandoId(null);
  };

  const filtrados = pacientes.filter((p) =>
    p.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    // A tag <ScrollView> foi removida pois a FlatList já implementa rolagem.
    // Envolver uma FlatList em uma ScrollView pode causar problemas de performance.
    <View style={estilo.container}>
      {/* 📄 Lista (movida para cima para melhor estrutura com FlatList) */}
      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.idPaciente.toString()}
        ListHeaderComponent={ // O formulário agora é o cabeçalho da lista
          <>
            {/* 📋 Formulário */}
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

            {/* 🔍 Busca */}
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
              {/* CORREÇÃO: Usa a função para formatar a data com segurança */}
              <Text>{formatarData(item.dataNascimento)}</Text>
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
