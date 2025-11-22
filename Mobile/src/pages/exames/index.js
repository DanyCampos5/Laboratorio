import { 
    StyleSheet, 
    View, 
    TextInput, 
    TouchableOpacity, 
    ActivityIndicator,
    FlatList, 
    Text, 
    StatusBar 
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Necessário para o token
import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Importar a instância do Axios configurada
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Exames() {
    const navigation = useNavigation();

    const [pessoas, setPessoas] = useState([]);
    const [atualizando, setAtualizando] = useState(true);
    const [nome, setNome] = useState('');

    useEffect(() => {
        getPessoas();
    }, []);

    const getPessoas = async () => {
        try {
            setAtualizando(true);
            const response = await api.get("/exames/getpacientes");
            setPessoas(response.data);
        } catch (error) {
            console.error("Erro ao requisitar a API  ", error);
        } finally {
            setAtualizando(false);
        }
    };

    return (
        <View style={Estilo.container}>
            {/* Barra de pesquisa */}
            <View style={Estilo.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#007BFF" style={{ marginRight: 8 }} />
                <TextInput
                    placeholder="Pesquisar paciente..."
                    style={Estilo.search}
                    value={nome}
                    onChangeText={setNome}
                    placeholderTextColor="#999"
                />
                {nome.length > 0 && (
                    <TouchableOpacity onPress={() => setNome('')}>
                        <Ionicons name="close-circle" size={20} color="#999" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Lista de pacientes */}
            {atualizando ? (
                <ActivityIndicator size="large" color="#007BFF" style={Estilo.loader} />
            ) : (
                <FlatList
                    data={pessoas.filter(pessoa =>
                        pessoa.nome?.toLowerCase().includes(nome.toLowerCase())
                    )}
                    renderItem={({ item }) => (
                        <View style={Estilo.listItem}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={Estilo.nameText}>{item.nome}</Text>
                                <View style={Estilo.iconButtons}>
                                    <TouchableOpacity
                                        style={[Estilo.iconButton, { backgroundColor: '#007BFF' }]}
                                        onPress={() => navigation.navigate('EditarExames', { pacienteId: item.idPaciente })}
                                    >
                                        <Ionicons name="create-outline" size={18} color="#fff" />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[Estilo.iconButton, { backgroundColor: '#28a745' }]}
                                        onPress={() => navigation.navigate('AdicionarExames', { pacienteId: item.idPaciente })}
                                    >
                                        <Ionicons name="add-outline" size={18} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={Estilo.infoText}>
                                Nascimento: {new Date(item.dataNascimento).toLocaleDateString()}
                            </Text>
                            <Text style={Estilo.infoText}>Telefone: {item.telefone}</Text>
                            <Text style={Estilo.infoText}>{item.email}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.idPaciente?.toString()}
                    contentContainerStyle={Estilo.listContainer}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={Estilo.emptyText}>
                            {nome ? "Nenhum paciente encontrado" : "Nenhum paciente cadastrado"}
                        </Text>
                    )}
                />
            )}
        </View>
    );
}

const Estilo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingTop: StatusBar.currentHeight || 0,
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
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    listItem: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#007BFF22',
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
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#777',
        marginTop: 40,
    },
    loader: {
        marginTop: 40,
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
