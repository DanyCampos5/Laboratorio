import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";

export default function Login({ navigation }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const { setToken } = useContext(AuthContext);

  const api = axios.create({
    baseURL: "http://localhost:3000"
  });

  async function handleLogin() {
    try {
      if (!login || !senha) return;

      const res = await api.post("/login", {
        username: login,
        password: senha,
      });

      if (res.status === 200 && res.data.token) {
        setToken(res.data.token);
        navigation.replace("MenuApp");
      }

    } catch (err) {
      console.error("Erro no login:", err);
    }
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>

      <View style={styles.inputContainer}>
        <Feather name="user" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#777"
          value={login}
          onChangeText={setLogin}
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#777"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgot}>Esqueci minha senha</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    backgroundColor: "#F2F9FF"
  },

  title: {
    fontSize: 30,
    color: "#007EB3",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5
  },

  subtitle: {
    fontSize: 14,
    color: "#4A7385",
    textAlign: "center",
    marginBottom: 25
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#A9D7EC",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 15,
    width: "100%"
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#333",
    fontSize: 16,
  },

  btn: {
    backgroundColor: "#009FD6",
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 10,
    width: "100%"
  },

  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },

  forgot: {
    textAlign: "center",
    marginTop: 12,
    color: "#007EB3",
    fontSize: 14
  }
});
