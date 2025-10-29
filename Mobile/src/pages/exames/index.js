import { StyleSheet, View, TextInput, TouchableOpacity, Button } from "react-native";
import { FlatList, Text, StatusBar } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';

export default function Exames() {

    const [pessoas, setpessoas] = useState([]);
    const [atualizando, setatulizando] = useState(true);

    useEffect(()=>{
        getCars();
    })

    const getCars = async () => {
    try {
      setAtualizando(true);
      console.log("Iniciando a conexão com a API...");
      const response = await fetch("http://localhost:3000/exames/getpessoas");
      console.log("Conteudo de response: ", response);
      const json = await response.json();
      console.log("Conteudo: ", json);
      setCars(json);
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
                        value={query}
                        onChangeText={setQuery}
                        placeholderTextColor="#999"
                    />
                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery('')} style={Estilo.clearButton}>
                            <Text style={Estilo.clearButtonText}>×</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <FlatList
                    data={pessoas}
                    renderItem={(item)=> <Text> {item.nome} </Text>}
                    keyExtractor={item => item.idPessoa}
                />
            </View>
        </View>
    )
}

const Estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight || 0,
        paddingHorizontal: 20,
    },
    header: {
        marginBottom: 6
    },
    listItem: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
    },
    listItemText: {
        fontSize: 16
    },
    nameText: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 4
    },
    examsText: {
        color: '#444',
        marginBottom: 6
    },
    dateText: {
        color: '#666',
        fontSize: 12
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#007BFF',
        paddingHorizontal: 10,
        paddingVertical: 6,
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
    }
})


