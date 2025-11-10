import React from "react";
import { View, Image, StyleSheet } from "react-native";

const ResultadoLaudo = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.grafico}
        source={{ uri: "http://10.176.103.100:8000/static/grafico_pizza.png" }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grafico: {
    width: 300,
    height: 300,
  },
});

export default ResultadoLaudo;
