import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
    TextInput // CORREÇÃO: TextInput não estava importado, mas é usado.
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../services/api'; // 1. Importar a instância configurada do Axios

// Função para formatar a data para o formato YYYY-MM-DD
const formatarDataParaAPI = (data) => {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
};

export default function AdicionarExames({ route }) {
    const { pacienteId } = route.params;
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [exame, setExame] = useState('');
    const [resultado, setResultado] = useState('');
    const [laboratorio, setLaboratorio] = useState('');

    // CORREÇÃO: Inicializar os estados de data com um objeto Date.
    const [dataExame, setDataExame] = useState(new Date());
    const [dataEntrada, setDataEntrada] = useState(new Date());

    // CORREÇÃO: Estados para controlar a visibilidade dos seletores de data.
    const [showDataExamePicker, setShowDataExamePicker] = useState(false);
    const [showDataEntradaPicker, setShowDataEntradaPicker] = useState(false);

    const handleSave = async () => {
        if (!exame.trim() || !laboratorio.trim() || !resultado.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        // Formata as datas antes de enviar para a API
        const dataEntradaFormatada = formatarDataParaAPI(dataEntrada);
        const dataExameFormatada = formatarDataParaAPI(dataExame);

        try {
            setLoading(true);
            const body = {
                dataEntrada: dataEntradaFormatada,
                dataExame: dataExameFormatada,
                resultado: resultado,
                laboratorio: laboratorio,
                exame: exame,
                idPaciente: pacienteId,
                idLabImun: null
            };

            console.log('Corpo enviado para API:', body);

            // 2. Usar a instância 'api' que já anexa o token de autenticação
            const response = await api.post('/exames/insertexame', body);

            const { data } = response;

            if (data.error) {
                Alert.alert('Erro na API', data.message || 'Erro desconhecido');
            } else {
                Alert.alert('Sucesso', 'Exame adicionado com sucesso!');
                navigation.goBack();
            }
        } catch (error) {
            // O Axios trata os erros de forma diferente do fetch
            if (error.response) {
                // Erro vindo da API (ex: 401, 400, 500)
                Alert.alert('Erro ao Salvar', error.response.data.message || 'Ocorreu um erro no servidor.');
            } else {
                // Erro de rede ou outro problema
                Alert.alert('Erro de Conexão', 'Não foi possível conectar à API.');
            }
            console.error('ERRO CRÍTICO ao salvar:', error);
        } finally {
            setLoading(false);
        }
    };

    // CORREÇÃO: Funções de callback para o DateTimePicker
    const onChangeDataExame = (event, selectedDate) => {
        setShowDataExamePicker(false); // Esconde o seletor
        if (selectedDate) {
            setDataExame(selectedDate); // Atualiza o estado com a nova data
        }
    };

    const onChangeDataEntrada = (event, selectedDate) => {
        setShowDataEntradaPicker(false); // Esconde o seletor
        if (selectedDate) {
            setDataEntrada(selectedDate); // Atualiza o estado com a nova data
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
                    <TextInput style={styles.input} value={exame} onChangeText={setExame} placeholder="Digite o nome do exame" placeholderTextColor="#999" />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Laboratório:</Text>
                    <TextInput style={styles.input} value={laboratorio} onChangeText={setLaboratorio} placeholder="Digite o nome do laboratório" placeholderTextColor="#999" />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Resultado:</Text>
                    <TextInput style={styles.input} value={resultado} onChangeText={setResultado} placeholder="Digite o resultado" placeholderTextColor="#999" multiline={true} numberOfLines={3} />
                </View>

                {/* CORREÇÃO: Botão para abrir o seletor de data de entrada */}
                <View style={styles.field}>
                    <Text style={styles.label}>Data de Entrada:</Text>
                    <TouchableOpacity style={styles.dateButton} onPress={() => setShowDataEntradaPicker(true)}>
                        <Text style={styles.dateButtonText}>{dataEntrada.toLocaleDateString('pt-BR')}</Text>
                    </TouchableOpacity>
                </View>

                {/* CORREÇÃO: Botão para abrir o seletor de data do exame */}
                <View style={styles.field}>
                    <Text style={styles.label}>Data do Exame:</Text>
                    <TouchableOpacity style={styles.dateButton} onPress={() => setShowDataExamePicker(true)}>
                        <Text style={styles.dateButtonText}>{dataExame.toLocaleDateString('pt-BR')}</Text>
                    </TouchableOpacity>
                </View>

                {/* CORREÇÃO: Renderização condicional dos seletores de data */}
                {showDataEntradaPicker && (
                    <DateTimePicker
                        value={dataEntrada}
                        mode="date"
                        display="default"
                        onChange={onChangeDataEntrada}
                    />
                )}

                {showDataExamePicker && (
                    <DateTimePicker
                        value={dataExame}
                        mode="date"
                        display="default"
                        onChange={onChangeDataExame}
                    />
                )}

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Salvar Exame</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

// Estilos (sem alterações)
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    form: { backgroundColor: '#fff', borderRadius: 8, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    field: { marginBottom: 16 },
    label: { fontSize: 16, marginBottom: 8, color: '#333', fontWeight: '500' },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 4, padding: 12, fontSize: 16, color: '#333' },
    dateButton: { borderWidth: 1, borderColor: '#ddd', borderRadius: 4, padding: 12 },
    dateButtonText: { fontSize: 16, color: '#333' },
    saveButton: { backgroundColor: '#007BFF', borderRadius: 4, padding: 16, alignItems: 'center', marginTop: 20 },
    saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
