import React, { useState, useEffect } from "react";
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList, ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const TOKEN = "eGv&>V£s}zV_q]#TSx[B520WGP|!~VOpe@~867E";
const BASE_URL = "http://localhost:3000"; // Ajuste para a URL do seu backend

export default function CadastroUsuario() {
    // Estados do formulário
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [registroP, setRegistroP] = useState("");
    const [cargoF, setCargoF] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    // Lista de usuários
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    // Buscar usuários
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
        } finally {
            setLoading(false);
        }
    };

    // Cadastrar usuário
    const cadastrarUsuario = async () => {
        if (!nome || !telefone || !email || !senha || !confirmarSenha) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/insertpessoa`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify({
                    nome, telefone, email, cpf, registroP, cargoF, senha
                }),
            });
            const data = await response.json();

            if (!data.error) {
                alert("Usuário cadastrado com sucesso!");
                setId(""); setNome(""); setTelefone(""); setEmail("");
                setCpf(""); setRegistroP(""); setCargoF(""); setSenha(""); setConfirmarSenha("");
                fetchUsuarios(); // Atualiza a lista
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar usuário!");
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.container}>
                {/* Lista de usuários */}
                <Text style={styles.sectionTitle}>Lista de Usuários</Text>
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
                                <Text>CPF: {item.cpf}</Text>
                                <Text>Registro: {item.registroP}</Text>
                                <Text>Cargo: {item.cargoF}</Text>
                            </View>
                        )}
                    />
                )}

                {/* Formulário de cadastro */}
                <Text style={styles.sectionTitle}>Cadastrar Usuário</Text>

                {/* Nome */}
                <View style={styles.inputRow}>
                    <MaterialIcons name="person-outline" size={22} color="#1976D2" style={styles.icon} />
                    <TextInput
                        placeholder="Nome completo"
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                {/* Telefone */}
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

                {/* Email */}
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

                {/* CPF */}
                <View style={styles.inputRow}>
                    <MaterialIcons name="badge" size={22} color="#1976D2" style={styles.icon} />
                    <TextInput
                        placeholder="CPF"
                        style={styles.input}
                        keyboardType="numeric"
                        value={cpf}
                        onChangeText={setCpf}
                    />
                </View>

                {/* Registro */}
                <View style={styles.inputRow}>
                    <MaterialIcons name="assignment" size={22} color="#1976D2" style={styles.icon} />
                    <TextInput
                        placeholder="Registro profissional"
                        style={styles.input}
                        value={registroP}
                        onChangeText={setRegistroP}
                    />
                </View>

                {/* Cargo */}
                <View style={styles.inputRow}>
                    <MaterialIcons name="work-outline" size={22} color="#1976D2" style={styles.icon} />
                    <TextInput
                        placeholder="Cargo/Função"
                        style={styles.input}
                        value={cargoF}
                        onChangeText={setCargoF}
                    />
                </View>

                {/* Senha */}
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

                {/* Confirmar Senha */}
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

                {/* Botão Cadastrar */}
                <TouchableOpacity style={styles.button} onPress={cadastrarUsuario}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 10,
    },
    userCard: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        marginBottom: 5,
    },
    userName: { fontWeight: "bold" },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 10,
        marginBottom: 10,
    },
    icon: { marginRight: 10 },
    input: { flex: 1, fontSize: 16, color: "#333" },
    button: {
        marginTop: 10,
        backgroundColor: "#1976D2",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
