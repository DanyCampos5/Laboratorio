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
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Exames() {
    const navigation = useNavigation();

    const [pessoas, setPessoas] = useState([]);
    const [atualizando, setAtualizando] = useState(true);
    const [nome, setNome] = useState('');

    useEffect(() => {
        getPessoas();
    }, []) // array vazio para executar apenas uma vez

    const getPessoas = async () => {
        try {
            setAtualizando(true);
            console.log("Iniciando a conexão com a API...");
            const response = await fetch("http://localhost:3000/exames/getPessoas");
            console.log("Conteudo de response: ", response);
            const json = await response.json();
            console.log("Conteudo: ", json);
            setPessoas(json);
            setAtualizando(false);
        } catch (error) {
            console.error("Erro ao requisitar a API  ", error);
        }
    }

    return (
        <View style={Estilo.container}>
            <View style={Estilo.header}>
                <View style={Estilo.searchContainer}>
                    <Text style={{ display: 'none' }}>icon</Text>
                    <TextInput
                        placeholder="Pesquisar paciente..."
                        style={Estilo.search}
                        value={nome}
                        onChangeText={setNome}
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity onPress={() => setNome('')} style={Estilo.clearButton}>
                        <Text style={Estilo.clearButtonText}>×</Text>
                    </TouchableOpacity>

                </View>

                {atualizando ? (
                    <ActivityIndicator size="large" color="#007BFF" style={Estilo.loader} />
                ) : (
                    <FlatList
                        data={pessoas.filter(pessoa => 
                            pessoa.nome?.toLowerCase().includes(nome.toLowerCase())
                        )}
                        renderItem={({ item }) => (
                            <View style={Estilo.listItem}>
                                <Text style={Estilo.nameText}>{item.nome}</Text>
                                <Text style={Estilo.infoText}>
                                    Nascimento: {new Date(item.dataNascimento).toLocaleDateString()}
                                </Text>
                                <Text style={Estilo.infoText}>Tel: {item.telefone}</Text>
                                <Text style={Estilo.infoText}>{item.email}</Text>
                                <View style={Estilo.buttonContainer}>
                                    <TouchableOpacity 
                                        style={Estilo.editButton}
                                        onPress={() => navigation.navigate('EditarExames', { pessoaId: item.idPessoa })}
                                    >
                                        <Text style={Estilo.editButtonText}>Editar Exames</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={Estilo.addButton}
                                        onPress={() => navigation.navigate('AdicionarExames', { pessoaId: item.idPessoa })}
                                    >
                                        <Text style={Estilo.addButtonText}>Adicionar Exame</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.idPessoa?.toString()}
                        contentContainerStyle={Estilo.listContainer}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <Text style={Estilo.emptyText}>
                                {nome ? "Nenhuma pessoa encontrada" : "Nenhuma pessoa cadastrada"}
                            </Text>
                        )}
                    />
                )}
            </View>
        </View>
    )
}

const Estilo = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    editButton: {
        backgroundColor: '#007BFF',
        padding: 8,
        borderRadius: 4,
        flex: 1,
        marginRight: 8,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
    },
    addButton: {
        backgroundColor: '#28a745',
        padding: 8,
        borderRadius: 4,
        flex: 1,
        marginLeft: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: StatusBar.currentHeight || 0,
    },
    header: {
        width: '100%',
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#007BFF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 16,
        elevation: 2,
    },
    search: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    clearButton: {
        padding: 4,
    },
    clearButtonText: {
        fontSize: 20,
        color: '#999',
    },
    listContainer: {
        padding: 16,
    },
    listItem: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#007BFF',
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 24,
    },
    loader: {
        marginTop: 24,
        marginBottom: 10,
        width: '100%'
    },
    search: {
        flex: 1,
        height: 40,
        padding: 0,
        color: '#000'
    },
    clearButton: {
        marginLeft: 8,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    clearButtonText: {
        fontSize: 18,
        color: '#666'
    },
    editButton: {
        backgroundColor: '#007BFF',
        padding: 8,
        borderRadius: 6,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    editButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    }
});


