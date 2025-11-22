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
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import api from '../../services/api'; // 1. Importar a instância do Axios

export default function EditarExames({ route }) {
    const { pacienteId } = route.params;

    const [exames, setExames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [activeExame, setActiveExame] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            fetchExames();
        }, [pacienteId])
    );

    const fetchExames = async () => {
        try {
            // 2. Usar 'api.get' para buscar os exames com autenticação
            const response = await api.get(`/exames/getExames/${pacienteId}`);
            if (response.status === 200 && Array.isArray(response.data)) {
                setExames(response.data);
            } else {
                setExames([]);
            }
        } catch (error) {
            // Tratamento de erro para Axios
            console.error('Erro ao buscar exames:', error);
            Alert.alert('Erro', 'Não foi possível carregar os exames');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (idExame) => {
        // Para garantir compatibilidade com a web, usamos window.confirm
        // que retorna true (se OK) ou false (se Cancelar).
        const confirmDelete = window.confirm("Tem certeza que deseja deletar este exame?");

        if (!confirmDelete) {
            // Se o usuário clicou em "Cancelar", a função para aqui.
            return;
        }

        // Se o usuário confirmou, a requisição para a API é feita.
        try {
            const response = await api.delete(`/exames/deletarexame/${idExame}`);
            if (response.status === 200) {
                Alert.alert('Sucesso', 'Exame deletado com sucesso!');
                fetchExames(); // Recarrega a lista de exames
            } else {
                Alert.alert('Erro', response.data.message || 'Não foi possível deletar o exame.');
            }
        } catch (error) {
            console.error('Erro ao deletar:', error);
            Alert.alert('Erro de Conexão', 'Não foi possível conectar à API.');
        }
    };

    const handleSave = async (exame) => {
        try {
            // 4. Usar 'api.put' para salvar com autenticação
            const response = await api.put(`/exames/editarExame/${exame.idExamesSolicitados}`, {
                dataExame: exame.dataExame,
                resultado: exame.resultado
            });
            
            if (response.status === 200) {
                Alert.alert('Sucesso', 'Exame atualizado com sucesso!');
                fetchExames();
            } else {
                Alert.alert('Erro', response.data.message || 'Não foi possível salvar as alterações');
            }
        } catch (error) { console.error('Erro ao salvar:', error); Alert.alert('Erro', 'Não foi possível salvar as alterações'); }
    };
    const updateExameField = (id, field, value) => {
        setExames(exames.map(exame => exame.idExamesSolicitados === id ? { ...exame, [field]: value } : exame));
    };

    if (loading) { return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#007BFF" /></View>; }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Exames do Paciente</Text>
            {exames.length === 0 && !loading && <View style={styles.emptyContainer}><Text style={styles.emptyText}>Nenhum exame encontrado.</Text></View>}
            {exames.map((exame) => (
                <View key={exame.idExamesSolicitados} style={styles.exameCard}>
                    <Text style={styles.exameTitle}>{exame.exame}</Text>
                    <View style={styles.field}><Text style={styles.label}>Data do Exame:</Text><TouchableOpacity onPress={() => { setActiveExame(exame.idExamesSolicitados); setShowDatePicker(true); }} style={styles.dateButton}><Text style={styles.dateButtonText}>{new Date(exame.dataExame).toLocaleDateString()}</Text></TouchableOpacity></View>
                    <View style={styles.field}><Text style={styles.label}>Resultado:</Text><TextInput style={styles.input} value={exame.resultado} onChangeText={(text) => updateExameField(exame.idExamesSolicitados, 'resultado', text)} multiline /></View>
                    <View style={styles.infoRow}><Text style={styles.infoText}>Laboratório: {exame.laboratorio}</Text><Text style={styles.infoText}>Data Entrada: {new Date(exame.dataEntrada).toLocaleDateString()}</Text></View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={() => handleSave(exame)}><Text style={styles.buttonText}>Salvar</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.deleteButton]} onPress={() => handleDelete(exame.idExamesSolicitados)}><Text style={styles.buttonText}>Excluir</Text></TouchableOpacity>
                    </View>
                </View>
            ))}
            {showDatePicker && <DateTimePicker value={new Date()} mode="date" display="default" onChange={(event, selectedDate) => { setShowDatePicker(false); if (selectedDate && activeExame) { const formattedDate = selectedDate.toISOString().split('T')[0]; updateExameField(activeExame, 'dataExame', formattedDate); } }} />}
        </ScrollView>
    );
}

// Estilos (sem alterações)
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 }, loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }, title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' }, exameCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }, exameTitle: { fontSize: 18, fontWeight: 'bold', color: '#007BFF', marginBottom: 12 }, field: { marginBottom: 12 }, label: { fontSize: 14, color: '#666', marginBottom: 4 }, input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8, fontSize: 16, minHeight: 40 }, dateButton: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8, backgroundColor: '#f8f9fa' }, dateButtonText: { fontSize: 16, color: '#333' }, infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginBottom: 16 }, infoText: { fontSize: 12, color: '#666' }, buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }, saveButton: { backgroundColor: '#007BFF', padding: 12, borderRadius: 8, alignItems: 'center', flex: 1, marginRight: 8 }, deleteButton: { backgroundColor: '#dc3545', padding: 12, borderRadius: 8, alignItems: 'center', flex: 1, marginLeft: 8 }, buttonText: { color: '#fff', fontSize: 16, fontWeight: '500' }, emptyContainer: { alignItems: 'center', marginTop: 50 }, emptyText: { fontSize: 16, color: '#666' } });
