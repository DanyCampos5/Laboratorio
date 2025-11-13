import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { Octicons } from '@expo/vector-icons';

export default function ListaPacientes({ navigation }) {
  const API_URL = "http://192.168.0.105:3000/pacientes"; // ⚠️ troque pelo IP da sua máquina

  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Buscar pacientes do backend
  const carregarPacientes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/getpacientes`);
      setPacientes(data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de pacientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPacientes();
  }, []);

  // 🔹 Ir para cadastro de novo paciente
  const handleAddPatient = () => {
    navigation.navigate('CadastroPacientes');
  };

  // 🔹 Ir para edição de paciente
  const handleEditPatient = (paciente) => {
    navigation.navigate('EditarPaciente', { paciente });
  };

  // 🔹 Excluir paciente
  const handleDeletePatient = async (paciente) => {
    Alert.alert(
      'Excluir paciente',
      `Deseja realmente excluir o paciente ${paciente.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/deletepaciente/${paciente.idPaciente}`);
              Alert.alert('Sucesso', 'Paciente excluído com sucesso!');
              carregarPacientes();
            } catch (error) {
              console.error('Erro ao excluir paciente:', error);
              Alert.alert('Erro', 'Não foi possível excluir o paciente.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={Estilo.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={Estilo.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={Estilo.backButton}>
          <Text style={Estilo.backButtonText}>{'<-'} Voltar</Text>
        </TouchableOpacity>
        <Text style={Estilo.headerTitle}>Visualizar Pacientes</Text>
      </View>

      {/* Card para adicionar paciente */}
      <TouchableOpacity style={Estilo.addCard} onPress={handleAddPatient} disabled={loading}>
        <View style={Estilo.addIconContainer}>
          <Text style={Estilo.addIcon}>+</Text>
        </View>
        <View style={Estilo.cardText}>
          <Text style={Estilo.cardTitle}>Adicionar Paciente</Text>
          <Text style={Estilo.cardSubtitle}>Cadastrar novo paciente no sistema</Text>
        </View>
      </TouchableOpacity>

      <ScrollView style={Estilo.content}>
        {loading && <ActivityIndicator size="large" color="#4285f4" style={{ marginTop: 20 }} />}

        {!loading && pacientes.length === 0 && (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum paciente cadastrado.</Text>
        )}

        {pacientes.map((paciente) => (
          <View key={paciente.idPaciente} style={Estilo.patientCard}>
            <View style={Estilo.patientInfo}>
              <Text style={Estilo.patientName}>{paciente.nome}</Text>
              <Text style={Estilo.patientDetails}>
                Data de nascimento: {paciente.dataNascimento?.split('T')[0] || '-'}
              </Text>
              <Text style={Estilo.patientDetails}>Telefone: {paciente.telefone}</Text>
              <Text style={Estilo.patientDetails}>Email: {paciente.email}</Text>
              <Text style={Estilo.patientDetails}>Sexo: {paciente.sexo}</Text>
              <Text style={Estilo.patientDetails}>Nome da mãe: {paciente.nomeMae}</Text>
              <Text style={Estilo.patientDetails}>Período: {paciente.periodo}</Text>
            </View>

            <View style={Estilo.actionsContainer}>
              <TouchableOpacity
                style={Estilo.actionButton}
                onPress={() => handleEditPatient(paciente)}
              >
                <Octicons name="pencil" size={20} color="#2480f9" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[Estilo.actionButton, { marginLeft: 10 }]}
                onPress={() => handleDeletePatient(paciente)}
              >
                <Octicons name="trash" size={20} color="#dc3545" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const Estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4285f4',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#212529',
  },
  addCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  addIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addIcon: {
    fontSize: 24,
    color: '#28a745',
    fontWeight: 'bold',
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  patientCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: '#4285f4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  patientDetails: {
    fontSize: 14,
    color: '#6c757d',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginLeft: 16,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#e9f1ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
