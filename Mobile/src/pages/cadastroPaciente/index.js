import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  ScrollView, // Adicionar ScrollView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

export default function Paciente() {
  const API_URL = "http://localhost:3000/pacientes";

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
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    buscarPacientes();
  }, []);

  // 🧩 Função para formatar datas
  function formatarData(valor) {
    if (!valor) return "Não informada";

    if (typeof valor === "number") {
      const str = valor.toString();
      if (str.length === 8) {
        const ano = str.substring(0, 4);
        const mes = str.substring(4, 6);
        const dia = str.substring(6, 8);
        return `${dia}/${mes}/${ano}`;
      }
      if (str.length >= 10) {
        const data = new Date(parseInt(str));
        return data.toLocaleDateString("pt-BR");
      }
    }

    if (typeof valor === "string") {
      if (valor.includes("T")) return valor.split("T")[0];
      if (/^\d{8}$/.test(valor)) {
        const ano = valor.substring(0, 4);
        const mes = valor.substring(4, 6);
        const dia = valor.substring(6, 8);
        return `${dia}/${mes}/${ano}`;
      }
      return valor;
    }

    return "Inválida";
  }

  // 🔹 Buscar pacientes do backend
  const buscarPacientes = async () => {
    try {
      setCarregando(true);
      const { data } = await axios.get(`${API_URL}/getpacientes`);
      console.log("📦 Dados recebidos da API:", data);

      // 🔹 Garantir que o estado só é setado com array
      if (Array.isArray(data)) {
        setPacientes(data);
      } else if (data && Array.isArray(data.result)) {
        setPacientes(data.result);
      } else {
        console.warn("⚠️ Resposta inesperada, limpando lista:", data);
        setPacientes([]);
      }
    } catch (error) {
      console.error("❌ Erro ao buscar pacientes:", error.message);
      Alert.alert("Erro", "Não foi possível carregar os pacientes.");
    } finally {
      setCarregando(false);
    }
  };

  // 🔹 Salvar ou atualizar paciente
  const salvarPaciente = async () => {
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
      console.error("❌ Erro ao salvar paciente:", error.message);
      Alert.alert("Erro", "Não foi possível salvar o paciente.");
    }
  };

  // 🔹 Editar paciente
  const editarPaciente = (item) => {
    setPaciente({
      nome: item.nome || "",
      telefone: item.telefone || "",
      email: item.email || "",
      dataNascimento: item.dataNascimento ? formatarData(item.dataNascimento) : "",
      sexo: item.sexo || "",
      nomeMae: item.nomeMae || "",
      periodo: item.periodo || "",
    });
    setEditandoId(item.idPaciente);
  };

  // 🔹 Excluir paciente
  const excluirPaciente = async (id) => {
    Alert.alert("Excluir paciente", "Tem certeza que deseja excluir este paciente?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/deletepaciente/${id}`);
            Alert.alert("Sucesso", "Paciente excluído!");
            buscarPacientes();
          } catch (error) {
            console.error("❌ Erro ao excluir paciente:", error.message);
            Alert.alert("Erro", "Não foi possível excluir o paciente.");
          }
        },
      },
    ]);
  };

  // 🔹 Limpar formulário
  const limparCampos = () => {
    setPaciente({
      nome: "",
      telefone: "",
      email: "",
      dataNascimento: "",
      sexo: "",
      nomeMae: "",
      periodo: "",
    });
    setEditandoId(null);
  };

  // 🔹 Filtro de busca
  const filtrados = pacientes.filter((p) =>
    p.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <ScrollView style={estilo.container}>
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
          { placeholder: "Data de nascimento (YYYYMMDD)", key: "dataNascimento" },
          { placeholder: "Sexo", key: "sexo" },
          { placeholder: "Nome da mãe", key: "nomeMae" },
          { placeholder: "Período (Ex: Matutino)", key: "periodo" },
        ].map((campo, i) => (
          <TextInput
            key={i}
            style={estilo.input}
            placeholder={campo.placeholder}
            placeholderTextColor="#666"
            value={paciente[campo.key]}
            onChangeText={(v) => setPaciente({ ...paciente, [campo.key]: v })}
          />
        ))}

        <TouchableOpacity style={estilo.botao} onPress={salvarPaciente}>
          <Text style={estilo.textoBotao}>
            {editandoId ? "Atualizar" : "Salvar"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔍 Busca */}
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

      {/* 📄 Lista */}
      {carregando ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filtrados}
          keyExtractor={(item, index) => String(item.idPaciente ?? index)}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: "#777", marginTop: 20 }}>
              Nenhum paciente encontrado
            </Text>
          }
          renderItem={({ item }) => {
            console.log("🧾 Renderizando item:", item);
            return (
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
                  <TouchableOpacity onPress={() => editarPaciente(item)}>
                    <MaterialIcons name="edit" size={28} color="#007bff" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => excluirPaciente(item.idPaciente)}>
                    <MaterialIcons name="delete" size={28} color="#ff4d4d" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
    </ScrollView>
  );
}

const estilo = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  prancheta: {
    backgroundColor: "#f9f9ff",
    borderWidth: 2,
    borderColor: "#007bff33",
    borderRadius: 14,
    padding: 20,
    marginBottom: 25,
  },
  header: { alignItems: "center", marginBottom: 15 },
  titulo: { fontSize: 20, fontWeight: "700", color: "#003366" },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#007bff33",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
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
    borderWidth: 1.5,
    borderColor: "#007bff33",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: "#003366" },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#007bff22",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nome: { fontWeight: "700", fontSize: 16, marginBottom: 4 },
  icons: { flexDirection: "row", gap: 18, alignItems: "center" },
});