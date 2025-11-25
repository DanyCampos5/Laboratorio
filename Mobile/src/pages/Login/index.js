import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Para navegação

// URL da API para ambiente de desenvolvimento web
const API_URL = 'http://localhost:3000/log/login';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Função Principal de Login
  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      // 1. Fazer a Requisição para a API
      const response = await axios.post(API_URL, {
        email: email,
        senha: senha,
      });

      // 2. Processar a Resposta de Sucesso (Status 200)
      const { token, message } = response.data;
      
      // 3. Armazenar o Token JWT
      await AsyncStorage.setItem('userToken', token);
      
      // 4. Navegar para a Tela Principal
      // Navega para o container do Drawer Navigator
      navigation.replace('MainApp'); 
      
      Alert.alert('Sucesso!', message);

    } catch (error) {
      let errorMessage = 'Ocorreu um erro desconhecido.';
      
      // Tratar erros HTTP (ex: 401 Credenciais inválidas)
      if (error.response) {
        // Se a API retornou um JSON com a mensagem de erro
        errorMessage = error.response.data.message || 'Erro de servidor.';
      } else if (error.request) {
        // Se a requisição foi feita, mas não houve resposta (ex: API offline)
        errorMessage = 'Não foi possível conectar ao servidor.';
      }
      
      Alert.alert('Falha no Login', errorMessage);
      console.error('Erro de Login:', error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acesso ao Sistema</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Button
        title={loading ? "Carregando..." : "Entrar"}
        onPress={handleLogin}
        disabled={loading}
      />

      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  spacer: {
    height: 10, // Espaçamento entre os botões
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
});