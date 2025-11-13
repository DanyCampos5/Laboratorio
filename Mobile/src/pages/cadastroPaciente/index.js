import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

export default function Paciente() {
  const API_URL = "http://localhost:3000/cadastroPaciente/getpacientes"; // ⚠️ troque pelo IP da sua máquina

  const [paciente, setPaciente] = useState({
    nome: "",
    dataNascimento: "",
    telefone: "",
    email: "",
    sexo: "",
    nomeMae: "",
    periodo: "",
  } );

  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    buscarPacientes();
  }, []);

  // 🔹 Buscar pacientes do backend
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
      console.error("Erro ao salvar paciente:", error);
      Alert.alert("Erro", "Não foi possível salvar o paciente.");
    }
  };

  // 🔹 Editar paciente (carrega os dados nos inputs)
  const editarPaciente = (item) => {
    setPaciente({
      nome: item.nome || "",
      telefone: item.telefone || "",
      email: item.email || "",
      dataNascimento: item.dataNascimento
        ? item.dataNascimento.split("T")[0]
        : "",
      sexo: item.sexo || "",
      nomeMae: item.nomeMae || "",
      periodo: item.periodo || "",
    });
    setEditandoId(item.idPaciente);
  };

  // 🔹 Excluir paciente
  const excluirPaciente = async (id) => {
    Alert.alert(
      "Excluir paciente",
      "Tem certeza que deseja excluir este paciente?",
      [
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
              console.error("Erro ao excluir paciente:", error);
              Alert.alert("Erro", "Não foi possível excluir o paciente.");
            }
          },
        },
      ]
    );
  };

  // 🔹 Limpar formulário
  const limparCampos = () => {
    setPaciente({
      nome: "",
      telefone: "",
      email: "",
      dataNascimento: "",
      sexo: "",
    });
  }

  function excluir(index) {
    const lista = [...pacientes];
    lista.splice(index, 1);
    setPacientes(lista);
  }

  function editar(index) {
    const p = pacientes[index];
    setPaciente(p);
    excluir(index);
  }

  const filtrados = pacientes.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
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
          keyboardType="number-pad"
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
          placeholderTextColor="#6d6d6d"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <FlatList
        data={filtrados}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={estilo.card}>
            <View>
              <Text style={estilo.nome}>{item.nome}</Text>
              <Text>{item.telefone}</Text>
              <Text>{item.email}</Text>
              <Text>{item.dataNascimento}</Text>
              <Text>{item.sexo}</Text>
              <Text style={estilo.dataTxt}>Data: {item.data}</Text>
            </View>

            <View style={estilo.icons}>
              <TouchableOpacity onPress={() => editar(index)}>
                <MaterialIcons name="edit" size={28} color="#007bff" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => excluir(index)}>
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
  dataTxt: { marginTop: 4, fontSize: 12 },
  icons: { flexDirection: "row", gap: 18, alignItems: "center" },
});
