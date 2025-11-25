import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, ActivityIndicator, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../../services/api"; // Importando o serviço de API centralizado

// Componente extraído para evitar perda de foco
const ListHeaderContent = ({
    usuario,
    setUsuario,
    salvarUsuario,
    editandoId,
    busca,
    setBusca
}) => {
    return (
        <View onStartShouldSetResponder={() => true}>
            {/* Formulário de cadastro */}
            <View style={estilo.prancheta}>
                <View style={estilo.header}>
                    <Text style={estilo.titulo}>
                        {editandoId ? "Editar Usuário" : "Cadastro de Usuário"}
                    </Text>
                </View>

                {[
                    { placeholder: "Nome completo", key: "nome" },
                    { placeholder: "Telefone", key: "telefone" },
                    { placeholder: "Email", key: "email" },
                    { placeholder: "CPF", key: "cpf" },
                    { placeholder: "Registro Profissional", key: "registroP" },
                    { placeholder: "Cargo (Ex.: Biomédico)", key: "cargoF" },
                    { placeholder: "Senha", key: "senha", secure: true },
                ].map((campo) => (
                    <TextInput
                        key={campo.key}
                        style={estilo.input}
                        placeholder={campo.placeholder}
                        secureTextEntry={campo.secure}
                        value={usuario[campo.key]}
                        onChangeText={(v) => setUsuario({ ...usuario, [campo.key]: v })}
                        blurOnSubmit={false}
                        autoCapitalize="none"
                    />
                ))}

                <TouchableOpacity style={estilo.botao} onPress={salvarUsuario}>
                    <Text style={estilo.textoBotao}>
                        {editandoId ? "Atualizar" : "Salvar"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Barra de pesquisa */}
            <View style={estilo.searchBox}>
                <MaterialIcons name="search" size={24} color="#003366" />
                <TextInput
                    style={estilo.searchInput}
                    placeholder="Pesquisar usuário"
                    value={busca}
                    onChangeText={setBusca}
                />
            </View>

            <Text style={estilo.headerTitle}>Usuários Cadastrados</Text>
        </View>
    );
};

export default function CadastroUsuario() {

    const [usuario, setUsuario] = useState({
        nome: "",
        telefone: "",
        email: "",
        cpf: "",
        registroP: "",
        cargoF: "",
        senha: "",
    });

    const [usuarios, setUsuarios] = useState([]);
    const [busca, setBusca] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        buscarUsuarios();
    }, []);

    const buscarUsuarios = async () => {
        try {
            setCarregando(true);
            // O token é injetado automaticamente pelo interceptor do api.js
            const { data } = await api.get(`/usuarios/getUsuarios`);
            setUsuarios(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            setUsuarios([]);
        } finally {
            setCarregando(false);
        }
    };

    const salvarUsuario = async () => {
        console.log("Tentando salvar usuário:", usuario);
        try {
            if (!usuario.nome.trim() || !usuario.email.trim() || !usuario.senha.trim()) {
                console.log("Campos obrigatórios faltando. Nome:", !!usuario.nome.trim(), "Email:", !!usuario.email.trim(), "Senha:", !!usuario.senha.trim());
                Alert.alert("Erro", "Preencha os campos obrigatórios.");
                return;
            }

            if (editandoId) {
                console.log("Atualizando usuário ID:", editandoId);
                await api.put(`/usuarios/updateUsuario/${editandoId}`, usuario);
                Alert.alert("Sucesso", "Usuário atualizado!");
            } else {
                console.log("Inserindo novo usuário");
                await api.post(`/usuarios/insertUsuario`, usuario);
                Alert.alert("Sucesso", "Usuário cadastrado!");
            }

            limparCampos();
            buscarUsuarios();
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
            Alert.alert("Erro", "Não foi possível salvar o usuário.");
        }
    };

    const editarUsuario = (item) => {
        console.log("Editando usuário:", item);
        setUsuario({
            nome: item.nome || "",
            telefone: item.telefone || "",
            email: item.email || "",
            cpf: item.cpf || "",
            registroP: item.registroP || "",
            cargoF: item.cargoF || "",
            senha: "", // Senha geralmente não vem na listagem por segurança, ou vem hash
        });
        setEditandoId(item.id);
    };

    const excluirUsuario = async (id) => {
        console.log("Excluindo usuário ID:", id);
        try {
            await api.delete(`/usuarios/deleteUsuario/${id}`);
            buscarUsuarios();
            Alert.alert("Sucesso", "Usuário excluído.");
        } catch (error) {
            console.error("Erro ao excluir:", error);
            Alert.alert("Erro", "Não foi possível excluir o usuário.");
        }
    };

    const limparCampos = () => {
        setUsuario({
            nome: "",
            telefone: "",
            email: "",
            cpf: "",
            registroP: "",
            cargoF: "",
            senha: "",
        });
        setEditandoId(null);
    };

    const filtrados = usuarios.filter((u) =>
        u.nome?.toLowerCase().includes(busca.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <View style={estilo.card}>
            <View style={{ flex: 1 }}>
                <Text style={estilo.nome}>{item.nome}</Text>
                <Text>{item.email}</Text>
                <Text>{item.telefone}</Text>
                <Text>{item.cpf}</Text>
                <Text>{item.cargoF}</Text>
            </View>

            <View style={estilo.icons}>
                <TouchableOpacity onPress={() => editarUsuario(item)}>
                    <MaterialIcons name="edit" size={28} color="#007bff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => excluirUsuario(item.id)}>
                    <MaterialIcons name="delete" size={28} color="#ff4d4d" />
                </TouchableOpacity>
            </View>
        </View>
    );

    const ListFooter = () => (
        carregando ? (
            <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 20 }} />
        ) : null
    );

    // Renderização final com o FlatList
    return (
        <View style={estilo.container}>
            {/* Lista de usuários */}
            <FlatList
                data={filtrados}
                keyExtractor={(item) => item.id?.toString()}
                ListHeaderComponent={
                    <ListHeaderContent
                        usuario={usuario}
                        setUsuario={setUsuario}
                        salvarUsuario={salvarUsuario}
                        editandoId={editandoId}
                        busca={busca}
                        setBusca={setBusca}
                    />
                }
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", color: "#777", marginTop: 20 }}>
                        Nenhum usuário encontrado
                    </Text>
                }
                ListFooterComponent={ListFooter}
                // Ajusta o padding para a lista
                keyboardShouldPersistTaps='handled'
                removeClippedSubviews={false}
            />
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20, // Mantém o padding horizontal
        backgroundColor: "#fff",

    },
    prancheta: {
        backgroundColor: "#f9f9ff",
        borderWidth: 2,
        borderColor: "#007bff33",
        borderRadius: 14,
        padding: 20,
        marginBottom: 10,
        marginTop: 10,
        width: "100%",
        alignSelf: "center",
    },
    header: {
        alignItems: "center",
        marginBottom: 15,
    },
    titulo: {
        fontSize: 20,
        fontWeight: "700",
        color: "#003366",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#003366",
        marginBottom: 10,
        marginTop: 10,
    },
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
        backgroundColor: "#007bff",
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 5,
    },
    textoBotao: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "700",
    },
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
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: "#003366"
    },
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
    nome: {
        fontWeight: "700",
        fontSize: 16,
        marginBottom: 4,
    },
    icons: {
        flexDirection: "row",
        gap: 18,
        alignItems: "center",
    },
});