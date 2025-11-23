import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ResultadoLaudo({ route }) {

  const { laudoData } = route.params || {};

  if (!laudoData) {
    return (
      <View style={styles.containerCenter}>
        <Text style={styles.h2}>Erro</Text>
        <Text style={styles.p}>Nenhum dado recebido.</Text>
      </View>
    );
  }

  const { paciente, exames, responsavelTecnico } = laudoData;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.titulo}>Laudo Laboratorial</Text>

          {/* Seção Paciente */}
          <View style={styles.section}>
            <Text style={styles.h2}>Identificação</Text>
            <Text style={styles.p}><Text style={styles.bold}>Nome: </Text>{paciente.nome}</Text>
            <Text style={styles.p}><Text style={styles.bold}>Idade: </Text>{paciente.idade}</Text>
            <Text style={styles.p}><Text style={styles.bold}>Sexo: </Text>{paciente.sexo}</Text>
            <Text style={styles.p}><Text style={styles.bold}>Prontuário: </Text>{paciente.prontuario}</Text>
            <Text style={styles.p}><Text style={styles.bold}>Data: </Text>{paciente.dataEmissao}</Text>
          </View>

          <View style={styles.divider} />

          {/* Seção Exames */}
          <View style={styles.section}>
            <Text style={styles.h2}>Resultados</Text>
            
            <Text style={styles.p}><Text style={styles.bold}>Exame Solicitado: </Text>{exames.tipoExame}</Text>
            <Text style={styles.p}><Text style={styles.bold}>Metodologia: </Text>{exames.metodoExame}</Text>
            
            <View style={styles.resultadoBox}>
               <Text style={styles.labelResultado}>RESULTADO:</Text>
               <Text style={styles.textoResultado}>
                 {/* Exibe resultado formatado ou o texto puro do banco */}
                 {exames.grupoSanguineo} {exames.fatorRH}
               </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Seção Responsável */}
          <View style={styles.section}>
            <Text style={styles.h2}>Responsável Técnico</Text>
            <Text style={styles.p}><Text style={styles.bold}>Nome: </Text>{responsavelTecnico.nome}</Text>
            <Text style={styles.p}><Text style={styles.bold}>Registro: </Text>{responsavelTecnico.crf}</Text>
          </View>

          <Text style={styles.rodape}>
            Este documento é uma visualização digital do sistema acadêmico.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eef2f5',
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0a3d62',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e5f9c',
    marginBottom: 10,
    marginTop: 5,
  },
  section: {
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  p: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
    color: '#555',
  },
  resultadoBox: {
    marginTop: 15,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#1e5f9c',
  },
  labelResultado: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  textoResultado: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  rodape: {
    marginTop: 20,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});