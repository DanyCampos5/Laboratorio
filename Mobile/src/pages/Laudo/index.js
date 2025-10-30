import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";

export default function ResultadoLaudo() {
  const paciente = {
    nome: "Pedro Liboni",
    idade: 28,
    sexo: "M",
    prontuario: "123456",
    dataEmissao: "20/06/2024",
  };

  const exames = {
    tipoExame: "TIPAGEM SANGUINEA ABO(RH)",
    materialExame: "SANGUE TOTAL",
    metodoExame: "HEMAGLUTINAÇÃO",
    grupoSanguineo: "B",
    fatorRH: "Positivo",
  };

  const responsavelTecnico = {
    nome: "EDUARDA CAROLINA DO NASCIMENTO",
    crf: "3891",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Resultado de Exames</Text>

          <View style={styles.section}>
            <Text style={styles.h2}>Paciente</Text>
            <Text style={styles.p}>
              <Text style={styles.bold}>Nome: </Text>
              {paciente.nome}
            </Text>
            <Text style={styles.p}>
              <Text style={styles.bold}>Idade: </Text>
              {paciente.idade}
            </Text>
            <Text style={styles.p}>
              <Text style={styles.bold}>Sexo: </Text>
              {paciente.sexo}
            </Text>
            <Text style={styles.p}>
              <Text style={styles.bold}>Prontuário: </Text>
              {paciente.prontuario}
            </Text>
            <Text style={styles.p}>
              <Text style={styles.bold}>Data de Emissão: </Text>
              {paciente.dataEmissao}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.h2}>Exames</Text>
            <View>
              <Text style={styles.p}>
                <Text style={styles.bold}>Exame: </Text>
                {exames.tipoExame}
              </Text>
              <Text style={styles.p}>
                <Text style={styles.bold}>Material: </Text>
                {exames.materialExame}
              </Text>
              <Text style={styles.p}>
                <Text style={styles.bold}>Método: </Text>
                {exames.metodoExame}
              </Text>
              <Text style={styles.p}>
                <Text style={styles.bold}>Grupo Sanguíneo: </Text>
                {exames.grupoSanguineo}
              </Text>
              <Text style={styles.p}>
                <Text style={styles.bold}>Fator RH: </Text>
                {exames.fatorRH}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.h2}>Responsável Técnico</Text>
            <Text style={styles.p}>
              <Text style={styles.bold}>Nome: </Text>
              {responsavelTecnico.nome}
            </Text>
            <Text style={styles.p}>
              <Text style={styles.bold}>CRF: </Text>
              {responsavelTecnico.crf}
            </Text>
          </View>

          <Text style={styles.rodape}>
            Este exemplo não representa o resultado final.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  scrollContainer: {
    padding: 20,
  },
  container: {
    fontFamily: "Arial",
    maxWidth: 700,
    width: "100%",
    alignSelf: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "#ffffff",
    borderRadius: 12,
 
    shadowColor: "rgba(0, 50, 100, 0.2)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 12,

    elevation: 8,
  },
  titulo: {
    textAlign: "center",
    color: "#0a3d62",
    marginBottom: 25,
    fontSize: 26,
    fontWeight: "bold",
  },
  h2: {
    color: "#1e5f9c",
    borderBottomWidth: 2,
    borderBottomColor: "#cce4f7",
    paddingBottom: 5,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  p: {
    marginVertical: 5,
    color: "#2c3e50",
    fontSize: 16,
    lineHeight: 22,
  },
  bold: {
    fontWeight: "bold",
  },
  rodape: {
    marginTop: 25,
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
});