import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AdicionarExames({ route }) {
    const { pessoaId } = route.params;
    const navigation = useNavigation();
    
    const [loading, setLoading] = useState(false);
    const [exame, setExame] = useState('');
    const [resultado, setResultado] = useState('');
    const [laboratorio, setLaboratorio] = useState('');
    const [dataExame, setDataExame] = useState('');
    const [dataEntrada, setDataEntrada] = useState('');

    const handleSave = async () => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!exame.trim()) {
            Alert.alert('Erro', 'Por favor, preencha o nome do exame');
            return;
        }
        if (!laboratorio.trim()) {
            Alert.alert('Erro', 'Por favor, preencha o nome do laboratório');
            return;
        }
        if (!resultado.trim()) {
            Alert.alert('Erro', 'Por favor, preencha o resultado');
            return;
        }
        if (!dateRegex.test(dataEntrada)) {
            Alert.alert('Erro', 'Data de entrada inválida. Use o formato YYYY-MM-DD');
            return;
        }
        if (!dateRegex.test(dataExame)) {
            Alert.alert('Erro', 'Data do exame inválida. Use o formato YYYY-MM-DD');
            return;
        }

        try {
            setLoading(true);
            const body = {
                dataEntrada: dataEntrada,
                dataExame: dataExame,
                resultado: resultado,
                laboratorio: laboratorio,
                exame: exame,
                idPaciente: pessoaId,
                idLabImun: null
            };
            console.log('Corpo enviado para API:', body);
            const response = await fetch('http://localhost:3000/exames/insertexame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                console.error('Erro ao converter resposta para JSON:', jsonError);
                throw jsonError;
            }
            console.log('Resposta da API:', data);
            if (data.error) {
                Alert.alert('Erro', data.message || 'Erro desconhecido');
            } else {
                Alert.alert('Sucesso', 'Exame adicionado com sucesso!');
                navigation.goBack();
            }
        } catch (error) {
            console.error('Erro ao salvar:', error);
            Alert.alert('Erro', 'Não foi possível adicionar o exame');
        } finally {
            setLoading(false);
        }
    };

    const onChangeDataExame = (event, selectedDate) => {
        setShowDataExamePicker(false);
        if (selectedDate) {
            setDataExame(selectedDate);
        }
    };

    const onChangeDataEntrada = (event, selectedDate) => {
        setShowDataEntradaPicker(false);
        if (selectedDate) {
            setDataEntrada(selectedDate);
        }
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
            <Text style={styles.title}>Adicionar Novo Exame</Text>

            <View style={styles.form}>
                <View style={styles.field}>
                    <Text style={styles.label}>Nome do Exame:</Text>
                    <TextInput
                        style={styles.input}
                        value={exame}
                        onChangeText={setExame}
                        placeholder="Digite o nome do exame"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Laboratório:</Text>
                    <TextInput
                        style={styles.input}
                        value={laboratorio}
                        onChangeText={setLaboratorio}
                        placeholder="Digite o nome do laboratório"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Resultado:</Text>
                    <TextInput
                        style={styles.input}
                        value={resultado}
                        onChangeText={setResultado}
                        placeholder="Digite o resultado do exame"
                        placeholderTextColor="#999"
                        multiline={true}
                        numberOfLines={3}
                    />
                </View>


                <View style={styles.field}>
                    <Text style={styles.label}>Data de Entrada (YYYY-MM-DD):</Text>
                    <TextInput
                        style={styles.input}
                        value={dataEntrada}
                        onChangeText={setDataEntrada}
                        placeholder="Ex: 2025-10-29"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Data do Exame (YYYY-MM-DD):</Text>
                    <TextInput
                        style={styles.input}
                        value={dataExame}
                        onChangeText={setDataExame}
                        placeholder="Ex: 2025-10-29"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                    />
                </View>

                <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Text style={styles.saveButtonText}>Salvar Exame</Text>
                </TouchableOpacity>
            </View>
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
    form: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    field: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 12,
        fontSize: 16,
        color: '#333',
    },
    dateButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 12,
    },
    dateButtonText: {
        fontSize: 16,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#007BFF',
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});