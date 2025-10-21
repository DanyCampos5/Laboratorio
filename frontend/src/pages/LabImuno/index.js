import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";

export function TipagemSanguinea() {
  const [pesquisa, setPesquisa] = useState("");
  const [antigeno, setAntigeno] = useState("");
  const [variante, setVariante] = useState("");
  const [antiA, setAntiA] = useState("");
  const [antiB, setAntiB] = useState("");
  const [antiD, setAntiD] = useState("");
  const [teste, setTeste] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={22} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Pesquisar..."
            style={styles.searchInput}
            value={pesquisa}
            onChangeText={setPesquisa}
          />
        </View>

        <Text style={styles.title}>Tipagem Sanguínea</Text>

        <View style={styles.row}>
          <View style={styles.field}>
            <Text style={styles.label}>Antígeno</Text>
            <Picker
              selectedValue={antigeno}
              onValueChange={(itemValue) => setAntigeno(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione" value="" />
              <Picker.Item label="A" value="A" />
              <Picker.Item label="B" value="B" />
              <Picker.Item label="AB" value="AB" />
              <Picker.Item label="O" value="O" />
            </Picker>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Variante</Text>
            <Picker
              selectedValue={variante}
              onValueChange={(itemValue) => setVariante(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione" value="" />
              <Picker.Item label="Positivo" value="positivo" />
              <Picker.Item label="Negativo" value="negativo" />
            </Picker>
          </View>
        </View>

        <Text style={styles.subtitle}>Soro de mesa diluindo</Text>
        <View style={styles.row}>
          <View style={styles.field}>
            <Text style={styles.label}>Anti - A</Text>
            <Picker
              selectedValue={antiA}
              onValueChange={(itemValue) => setAntiA(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="-" value="" />
              <Picker.Item label="Positivo" value="positivo" />
              <Picker.Item label="Negativo" value="negativo" />
            </Picker>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Anti - B</Text>
            <Picker
              selectedValue={antiB}
              onValueChange={(itemValue) => setAntiB(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="-" value="" />
              <Picker.Item label="Positivo" value="positivo" />
              <Picker.Item label="Negativo" value="negativo" />
            </Picker>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Anti - D</Text>
            <Picker
              selectedValue={antiD}
              onValueChange={(itemValue) => setAntiD(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="-" value="" />
              <Picker.Item label="Positivo" value="positivo" />
              <Picker.Item label="Negativo" value="negativo" />
            </Picker>
          </View>
        </View>

        <Text style={styles.subtitle}>Teste direto da antiglobulina</Text>
        <View style={styles.fieldFull}>
          <Picker
            selectedValue={teste}
            onValueChange={(itemValue) => setTeste(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione resultado" value="" />
            <Picker.Item label="Positivo" value="positivo" />
            <Picker.Item label="Negativo" value="negativo" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar Dados</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fafafa",
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  field: {
    flex: 1,
    marginRight: 10,
  },
  fieldFull: {
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    color: "#444",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fafafa",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});