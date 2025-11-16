import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { useState } from "react";
import axios from "axios";
import { Feather } from "@expo/vector-icons";

export default function Login({ navigation }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const api = axios.create({
    baseURL: "http://10.136.33.5:3000/"
  });

  async function handleLogin() {
    try {
      if (!login || !senha) {
        console.error("Login e/ou senha não informados");
        return;
      }

      const res = await api.post("/login", {
        username: login,
        password: senha,
      });

      if (res.status === 200 && res.data.token) {
        navigation.navigate("Home", { token: res.data.token });
      } else {
        console.error("Credenciais inválidas");
      }
    } catch (err) {
      console.error("Erro no login:", err);
    }
  }

  return (
    <ImageBackground 
      source={require("../../assets/img/bg-login.jpg")}
      style={styles.bg}
      imageStyle={{ opacity: 0.25 }}
    >
      <View style={styles.container}>
        
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>

        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#fff" />
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            placeholderTextColor="#CDE7F5"
            value={login}
            onChangeText={setLogin}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#fff" />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#CDE7F5"
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  container: {
    width: "85%",
    padding: 25,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },

  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5
  },

  subtitle: {
    fontSize: 14,
    color: "#DFF3FF",
    textAlign: "center",
    marginBottom: 25
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 15
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
  },

  btn: {
    backgroundColor: "#00AEEF",
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 10,
    shadowColor: "#00AEEF",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
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
    color: "#CDE7F5",
    fontSize: 14
  }
});
