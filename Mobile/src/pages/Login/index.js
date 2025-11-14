import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const navigation = useNavigation();

  // Função que executa o logout
  const handleLogout = async () => {
    // 1. Limpa o token do armazenamento
    await AsyncStorage.removeItem('userToken');
    
    // 2. Redireciona para a tela de Login, limpando o histórico de navegação
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  // Adiciona o botão de Logout no cabeçalho da tela
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => {
            Alert.alert(
              "Confirmar Logout",
              "Você tem certeza que deseja sair?",
              [
                { text: "Cancelar", style: "cancel" },
                { text: "Sair", onPress: handleLogout, style: "destructive" }
              ]
            );
          }} 
          style={{ marginRight: 15 }}
        >
          <MaterialIcons name="logout" size={26} color="#fff" />
        </TouchableOpacity>
      ),
      // Impede o usuário de usar o gesto de "voltar" para a tela de login
      headerLeft: () => null, 
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Painel Principal</Text>
        <Text style={styles.subtitle}>Selecione uma opção para começar</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => navigation.navigate('Pacientes')}
        >
          <MaterialIcons name="people" size={30} color="#fff" />
          <Text style={styles.menuButtonText}>Gerenciar Pacientes</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => alert('Tela de Exames ainda não implementada!')}
        >
          <MaterialIcons name="science" size={30} color="#fff" />
          <Text style={styles.menuButtonText}>Lançar Exames</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Estilos (sem alteração)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    backgroundColor: '#003366',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#d0e0ff',
    textAlign: 'center',
    marginTop: 5,
  },
  menuContainer: {
    padding: 20,
    marginTop: 20,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
});
