import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const TOKEN = "eGv&>V£s}zV_q]#TSx[B520WGP|!~Y8ex)GTok,~867E";
const BASE_URL = "http://192.168.100.54:3000"; 

export default function ListaUsuarios({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca 
  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/getpessoas`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      Alert.alert("Erro", "Não foi possível carregar os usuários");
    } finally {
      setLoading(false);
    }
  };

  // Recarrega a lista q
  useFocusEffect(
    useCallback(() => {
      fetchUsuarios();
    }, [])
  );

  // Abre tela de cadastro/edição
  const abrirCadastro = (usuario = null) => {
    navigation.navigate("Cadastro", { usuario, onSalvar: fetchUsuarios });
  };

  // Excluir usuário
  const excluirUsuario = (usuario) => {
    Alert.alert(
      "Excluir",
      `Deseja realmente excluir ${usuario.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}/deletepessoa/${usuario.idPessoa}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${TOKEN}` },
              });
              const data = await response.json();
              if (data.error) {
                Alert.alert("Erro", data.message || "Erro ao excluir usuário");
              } else {
                setUsuarios((prev) => prev.filter((u) => u.idPessoa !== usuario.idPessoa));
                Alert.alert("Sucesso", data.message || "Usuário excluído com sucesso");
              }
            } catch (error) {
              console.error("Erro ao excluir usuário:", error);
              Alert.alert("Erro", "Não foi possível excluir o usuário");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários Cadastrados</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1976D2" />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.idPessoa.toString()}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Text style={styles.userName}>{item.nome}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Telefone: {item.telefone}</Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: "blue" }]}
                  onPress={() => abrirCadastro(item)}
                >
                  <MaterialIcons name="edit" size={20} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: "#E53935" }]}
                  onPress={() => excluirUsuario(item)}
                >
                  <MaterialIcons name="delete" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => abrirCadastro()}>
        <Text style={styles.buttonText}>Cadastrar Novo Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  userCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  userName: { fontWeight: "bold", fontSize: 16 },
  actions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 8 },
  actionBtn: { padding: 8, borderRadius: 6, marginLeft: 8 },
  button: {
    marginTop: 20,
    backgroundColor: "#1976D2",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
