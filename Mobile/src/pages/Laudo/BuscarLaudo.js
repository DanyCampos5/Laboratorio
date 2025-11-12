// screens/BuscarLaudo.js
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const API_URL = 'http://192.168.1.49:3000';

export default function BuscarLaudo({ navigation }) {
  const [laudoId, setLaudoId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!laudoId) {
      Alert.alert('Atenção', 'Por favor, digite o número do laudo.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/laudo/getlaudo/${laudoId}`);
      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.message || 'Laudo não encontrado');
      }
      navigation.navigate('Resultado', { laudoData: data.laudo });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Número do Laudo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o ID (ex: 1)"
        value={laudoId}
        onChangeText={setLaudoId}
        keyboardType="numeric"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0a3d62" />
      ) : (
        <Button title="Buscar Laudo" onPress={handleSearch} color="#0a3d62" />
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f0f4f7',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    color: '#0a3d62',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#cce4f7',
  },
  error: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});