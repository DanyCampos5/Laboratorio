import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function DataScience() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);

    const imageUrl = 'http://192.168.0.240:3000/datascience/grafico_pizza.png';
    const statsUrl = 'http://192.168.0.240:3000/datascience/estatisticas.json';
    const uri = `${imageUrl}?t=${new Date().getTime()}`;

    useEffect(() => {
        fetch(statsUrl)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error("Erro ao buscar estatísticas:", err));
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Análise de Dados</Text>
                <Text style={styles.subtitle}>Proporção de Animais Esterilizados</Text>
            </View>

            <View style={styles.card}>
                {loading && (
                    <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
                )}
                <Image
                    source={{ uri: uri }}
                    style={styles.image}
                    resizeMode="contain"
                    onLoadEnd={() => setLoading(false)}
                    onError={(e) => console.log("Erro ao carregar imagem", e.nativeEvent.error)}
                />
            </View>

            {stats && (
                <View style={styles.statsContainer}>
                    <Text style={styles.statsTitle}>Estatísticas do Modelo</Text>
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Total Registros:</Text>
                        <Text style={styles.statValue}>{stats.total_registros}</Text>
                    </View>
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Acurácia:</Text>
                        <Text style={styles.statValue}>{(stats.acuracia_modelo * 100).toFixed(1)}%</Text>
                    </View>
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Esterilizados:</Text>
                        <Text style={styles.statValue}>{stats.total_esterilizados}</Text>
                    </View>
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Não Esterilizados:</Text>
                        <Text style={styles.statValue}>{stats.total_nao_esterilizados}</Text>
                    </View>
                </View>
            )}

            <View style={styles.infoContainer}>
                <MaterialIcons name="info-outline" size={24} color="#555" />
                <Text style={styles.infoText}>
                    Este gráfico é gerado automaticamente pelo modelo de Machine Learning com base nos dados coletados.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        alignItems: 'center',
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    card: {
        width: '100%',
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    loader: {
        position: 'absolute',
    },
    statsContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    statsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 10,
        textAlign: 'center',
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 4,
    },
    statLabel: {
        fontSize: 16,
        color: '#555',
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    infoContainer: {
        flexDirection: 'row',
        backgroundColor: '#e3f2fd',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    infoText: {
        marginLeft: 10,
        color: '#003366',
        fontSize: 14,
        flex: 1,
    },
});
