import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { FlatList, Text, StatusBar } from 'react-native';
import React, { useMemo, useState } from 'react';

export default function Exames() {

    const MOCK_DATA = [
        { id: '1', name: 'Ana Silva', exams: ['Hemograma', 'Glicemia'], date: '2025-09-10' },
        { id: '2', name: 'Bruno Costa', exams: ['Perfil Lipídico'], date: '2025-09-12' },
        { id: '3', name: 'Carla Dias', exams: ['TSH', 'T4 Livre', 'Hemograma'], date: '2025-08-30' },
        { id: '4', name: 'Daniel Alves', exams: ['Ureia/Creatinina'], date: '2025-09-01' },
    ];

    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return MOCK_DATA;
        return MOCK_DATA.filter(item => item.name.toLowerCase().includes(q));
    }, [query]);

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
                    data={filtered}
                    renderItem={({ item }) => {
                        const examsText = item.exams ? item.exams.join(', ') : '';
                        const date = item.date ? new Date(item.date) : null;
                        const dateText = date ? `${String(date.getDate()).padStart(2,'0')}/${String(date.getMonth()+1).padStart(2,'0')}/${date.getFullYear()}` : '';
                        return (
                            <View style={Estilo.listItem}>
                                <Text style={[Estilo.listItemText, Estilo.nameText]}>{item.name}</Text>
                                <Text style={Estilo.examsText}>{examsText}</Text>
                                <Text style={Estilo.dateText}>{dateText}</Text>
                            </View>
                        )
                    }}
                    keyExtractor={item => item.id}
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


