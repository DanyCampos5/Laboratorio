import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditarExames({ route }) {
    const { pacienteId } = route.params; // Corrigido para corresponder ao que é enviado pela tela anterior
    const navigation = useNavigation();
    
    const [exames, setExames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [activeExame, setActiveExame] = useState(null);

    // Buscar exames da pessoa
    useEffect(() => {
        fetchExames();
    }, []);

    const fetchExames = async () => {
        try {
            const response = await fetch(`http://localhost:3000/exames/getExames/${pacienteId}`);
            const data = await response.json();
            // Garante que 'exames' seja sempre um array para evitar o erro .map()
            if (response.ok && Array.isArray(data)) {
                setExames(data);
            } else {
                setExames([]); // Define como array vazio em caso de erro ou se nenhum exame for encontrado
            }
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar exames:', error);
            setLoading(false);
            Alert.alert('Erro', 'Não foi possível carregar os exames');
        }
    };

    const handleSave = async (exame) => {
        try {
            const response = await fetch(`http://localhost:3000/exames/editarExame/${exame.idExamesSolicitados}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dataExame: exame.dataExame,
                    resultado: exame.resultado,
                }),
            });

            const data = await response.json();
            
            if (data.error) {
                Alert.alert('Erro', data.message);
            } else {
                Alert.alert('Sucesso', 'Exame atualizado com sucesso!');
                fetchExames(); // Recarrega a lista
            }
        } catch (error) {
            console.error('Erro ao salvar:', error);
            Alert.alert('Erro', 'Não foi possível salvar as alterações');
        }
    };

    const updateExameField = (id, field, value) => {
        setExames(exames.map(exame => 
            exame.idExamesSolicitados === id 
                ? { ...exame, [field]: value }
                : exame
        ));
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Exames do Paciente</Text>

            {exames.map((exame) => (
                <View key={exame.idExamesSolicitados} style={styles.exameCard}>
                    <Text style={styles.exameTitle}>{exame.exame}</Text>
                    
                    <View style={styles.field}>
                        <Text style={styles.label}>Data do Exame:</Text>
                        <TouchableOpacity 
                            onPress={() => {
                                setActiveExame(exame.idExamesSolicitados);
                                setShowDatePicker(true);
                            }}
                            style={styles.dateButton}
                        >
                            <Text style={styles.dateButtonText}>
                                {new Date(exame.dataExame).toLocaleDateString()}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Resultado:</Text>
                        <TextInput
                            style={styles.input}
                            value={exame.resultado}
                            onChangeText={(text) => updateExameField(exame.idExamesSolicitados, 'resultado', text)}
                            multiline
                        />
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoText}>Laboratório: {exame.laboratorio}</Text>
                        <Text style={styles.infoText}>Data Entrada: {new Date(exame.dataEntrada).toLocaleDateString()}</Text>
                    </View>

                    <TouchableOpacity 
                        style={styles.saveButton}
                        onPress={() => handleSave(exame)}
                    >
                        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                    </TouchableOpacity>
                </View>
            ))}

            {showDatePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate && activeExame) {
                            updateExameField(activeExame, 'dataExame', selectedDate.toISOString());
                        }
                    }}
                />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    exameCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    exameTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 12,
    },
    field: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
        fontSize: 16,
        minHeight: 40,
    },
    dateButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
        backgroundColor: '#f8f9fa',
    },
    dateButtonText: {
        fontSize: 16,
        color: '#333',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        marginBottom: 16,
    },
    infoText: {
        fontSize: 12,
        color: '#666',
    },
    saveButton: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});