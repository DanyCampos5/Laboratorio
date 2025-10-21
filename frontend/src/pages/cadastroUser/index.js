import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
         
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn}>
              <MaterialIcons name="arrow-back" size={24} color="#1976D2" />
              <Text style={styles.voltar}>Voltar</Text>
            </TouchableOpacity>
          </View>

        
          <View style={styles.center}>
            <Image
              source={{ uri: "https://github.com/amanuhatake.png" }}
              style={styles.avatar}
            />
          </View>

         
          <View style={styles.card}>
            
            <Text style={styles.sectionTitle}>Dados pessoais</Text>

            
            <View style={styles.inputRow}>
              <MaterialIcons name="person-outline" size={22} color="#1976D2" style={styles.icon} />
              <TextInput
                placeholder="Nome completo"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
              />
            </View>

            
            <View style={styles.inputRow}>
              <MaterialIcons name="phone" size={22} color="#1976D2" style={styles.icon} />
              <TextInput
                placeholder="Telefone"
                style={styles.input}
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
              />
            </View>

           
            <Text style={styles.sectionTitle}>Acesso</Text>

           
            <View style={styles.inputRow}>
              <MaterialIcons name="email" size={22} color="#1976D2" style={styles.icon} />
              <TextInput
                placeholder="E-mail"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

           
            <View style={styles.inputRow}>
              <MaterialIcons name="lock-outline" size={22} color="#A0A0A0" style={styles.icon} />
              <TextInput
                placeholder="Senha"
                secureTextEntry={!mostrarSenha}
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                <MaterialIcons name={mostrarSenha ? "visibility" : "visibility-off"} size={22} color="#666" />
              </TouchableOpacity>
            </View>

            
            <View style={styles.inputRow}>
              <MaterialIcons name="lock-outline" size={22} color="#A0A0A0" style={styles.icon} />
              <TextInput
                placeholder="Confirmar senha"
                secureTextEntry={!mostrarConfirmarSenha}
                style={styles.input}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
              <TouchableOpacity onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}>
                <MaterialIcons name={mostrarConfirmarSenha ? "visibility" : "visibility-off"} size={22} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

      
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    maxWidth: 420, 
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  voltar: {
    marginLeft: 5,
    fontSize: 16,
    color: "#1976D2",
    fontWeight: "500",
  },
  center: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
         
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn}>
              <MaterialIcons name="arrow-back" size={24} color="#1976D2" />
              <Text style={styles.voltar}>Voltar</Text>
            </TouchableOpacity>
          </View>

        
          <View style={styles.center}>
            <Image
              source={{ uri: "https://github.com/amanuhatake.png" }}
              style={styles.avatar}
            />
          </View>

         
          <View style={styles.card}>
            
            <Text style={styles.sectionTitle}>Dados pessoais</Text>

            
            <View style={styles.inputRow}>
              <MaterialIcons name="person-outline" size={22} color="#1976D2" style={styles.icon} />
              <TextInput
                placeholder="Nome completo"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
              />
            </View>

            
            <View style={styles.inputRow}>
              <MaterialIcons name="phone" size={22} color="#1976D2" style={styles.icon} />
              <TextInput
                placeholder="Telefone"
                style={styles.input}
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
              />
            </View>

           
            <Text style={styles.sectionTitle}>Acesso</Text>

           
            <View style={styles.inputRow}>
              <MaterialIcons name="email" size={22} color="#1976D2" style={styles.icon} />
              <TextInput
                placeholder="E-mail"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

           
            <View style={styles.inputRow}>
              <MaterialIcons name="lock-outline" size={22} color="#A0A0A0" style={styles.icon} />
              <TextInput
                placeholder="Senha"
                secureTextEntry={!mostrarSenha}
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                <MaterialIcons name={mostrarSenha ? "visibility" : "visibility-off"} size={22} color="#666" />
              </TouchableOpacity>
            </View>

            
            <View style={styles.inputRow}>
              <MaterialIcons name="lock-outline" size={22} color="#A0A0A0" style={styles.icon} />
              <TextInput
                placeholder="Confirmar senha"
                secureTextEntry={!mostrarConfirmarSenha}
                style={styles.input}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
              <TouchableOpacity onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}>
                <MaterialIcons name={mostrarConfirmarSenha ? "visibility" : "visibility-off"} size={22} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

      
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    maxWidth: 420, 
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  voltar: {
    marginLeft: 5,
    fontSize: 16,
    color: "#1976D2",
    fontWeight: "500",
  },
  center: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});