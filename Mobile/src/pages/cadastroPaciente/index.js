import React, { useEffect, useState } from "react";
import {View, Text, TouchableOpacity, StyleSheet,TextInput, FlatList, ActivityIndicator} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import api from "../../services/api"; 
import { useNavigation } from "@react-navigation/native";

const formatarData = (data) => {
  if (!data) return "";
  try {
    return new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" });
  } catch (e) {
    return data;
  }
};

const formatarDataParaInput = (data) => {
  if (!data) return "";
  try {
    const d = new Date(data);
    const mes = (d.getUTCMonth() + 1).toString().padStart(2, "0");
    const dia = d.getUTCDate().toString().padStart(2, "0");
    const ano = d.getUTCFullYear();
    return `${ano}-${mes}-${dia}`;
  } catch (e) {
    return "";
  }
};

export default function Paciente() {
  const API_URL = "/pacientes"; 
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
  const navigation = useNavigation();

  useEffect(() => {
    buscarPacientes();
  }, []);


  const buscarPacientes = async () => {
    try {
      setCarregando(true);
      const { data } = await api.get(`${API_URL}/getpacientes`);
      setPacientes(Array.isArray(data) ? data : []);
    } catch (error) {
      setPacientes([]);
    } finally {
      setCarregando(false);
    }
  };

  const salvarPaciente = async () => {
    try {
      if (!paciente.nome.trim() || !paciente.telefone.trim() || !paciente.email.trim()) {
        return;
      }
      if (editandoId) {
        await api.put(`${API_URL}/${editandoId}`, paciente);
      } else {
        await api.post(API_URL, paciente);
      }
      limparCampos();
      buscarPacientes();
    } catch (error) {}
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
    try {
      await api.delete(`${API_URL}/${id}`);
      buscarPacientes();
    } catch (error) {}
  };

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

  const filtrados = pacientes.filter((p) =>
    p.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  const irParaAdicionarExame = (pacienteId) => {
    if (pacienteId) {
      navigation.navigate("AdicionarExames", { pacienteId });
    }
  };

  return (
    <View style={estilo.container}>
      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.idPaciente.toString()}
        ListHeaderComponent={
          <>
            <View style={estilo.searchContainer}>
              <Ionicons name="search-outline" size={20} color="#007BFF" style={{ marginRight: 8 }} />
              <TextInput
                placeholder="Pesquisar paciente..."
                style={estilo.search}
                value={busca}
                onChangeText={setBusca}
                placeholderTextColor="#999"
              />
              {busca.length > 0 && (
                <TouchableOpacity onPress={() => setBusca("")}>
                  <Ionicons name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
            <View style={estilo.cadastroContainer}>
              <Text style={estilo.titulo}>
                {editandoId ? "Editar Paciente" : "Cadastrar Novo Paciente"}
              </Text>
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
                  key={i}
                  style={estilo.input}
                  placeholder={campo.placeholder}
                  value={paciente[campo.key]}
                  onChangeText={(v) => setPaciente({ ...paciente, [campo.key]: v })}
                />
              ))}
              <TouchableOpacity style={estilo.botao} onPress={salvarPaciente}>
                <Text style={estilo.textoBotao}>
                  {editandoId ? "Atualizar" : "Salvar"}
                </Text>
              </TouchableOpacity>
              {editandoId && (
                <TouchableOpacity style={[estilo.botao, { backgroundColor: '#dc3545', marginTop: 10 }]} onPress={limparCampos}>
                  <Text style={estilo.textoBotao}>Cancelar Edição</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        }
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#777", marginTop: 20 }}>
            Nenhum paciente encontrado
          </Text>
        }
        renderItem={({ item }) => (
          <View style={estilo.listItem}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={estilo.nameText}>{item.nome}</Text>
              <View style={estilo.iconButtons}>
                <TouchableOpacity
                  style={[estilo.iconButton, { backgroundColor: '#007BFF' }]}
                  onPress={() => editarPaciente(item)}
                >
                  <Ionicons name="create-outline" size={18} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[estilo.iconButton, { backgroundColor: '#dc3545' }]}
                  onPress={() => excluirPaciente(item.idPaciente)}
                >
                  <Ionicons name="trash-outline" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={estilo.infoText}>
              Nascimento: {formatarData(item.dataNascimento)}
            </Text>
            <Text style={estilo.infoText}>Telefone: {item.telefone}</Text>
            <Text style={estilo.infoText}>Email: {item.email}</Text>
            <Text style={estilo.infoText}>Mãe: {item.nomeMae}</Text>
            <Text style={estilo.infoText}>Período: {item.periodo}</Text>
          </View>
        )}
        ListFooterComponent={
          carregando ? (
            <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 20 }} />
          ) : null
        }
      />
    </View>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 0, 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007BFF33',
    paddingHorizontal: 12,
    margin: 16,
    height: 48,
  },
  search: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  cadastroContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007bff33",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#007BFF",
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    color: "#333",
  },
  botao: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 5,
  },
  textoBotao: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#007BFF22',
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  iconButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
