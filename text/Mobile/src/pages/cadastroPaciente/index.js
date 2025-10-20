import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export function Paciente() {
  return (
    <View style={Estilo.fundo}>
      <View style={Estilo.ficha}>
        <View style={Estilo.header}>
          <View style={Estilo.iconContainer}>
            <MaterialIcons name="account-circle" size={60} color="#fff" /> 
          </View>
          <Text style={Estilo.txtLogin}>Cadastro</Text>
        </View>

        <View style={Estilo.body}>
          <Text style={Estilo.label}>Nome Completo:</Text>
          <TextInput style={Estilo.input} placeholder="Digite o nome" placeholderTextColor="#adadadff" />

          <Text style={Estilo.label}>Telefone:</Text>
          <TextInput style={Estilo.input} placeholder="(xx) xxxxx-xxxx" keyboardType="phone-pad" placeholderTextColor="#adadadff" />

          <Text style={Estilo.label}>Email:</Text>
          <TextInput style={Estilo.input} placeholder="exemplo@email.com" keyboardType="email-address" placeholderTextColor="#adadadff" />

          <Text style={Estilo.label}>Data de nascimento:</Text>
          <TextInput style={Estilo.input} placeholder="dd/mm/aaaa" placeholderTextColor="#adadadff" />

          <Text style={Estilo.label}>Período:</Text>
          <TextInput style={Estilo.input} placeholder="Ex: Matutino" placeholderTextColor="#adadadff" />

          <Text style={Estilo.label}>Nome da Mãe:</Text>
          <TextInput 
            style={[Estilo.input, { marginBottom: 25 }]} 
            placeholder="Digite o nome da mãe" 
            placeholderTextColor="#adadadff" 
          />
        </View>

        <View style={Estilo.footer}>
          <TouchableOpacity
            style={Estilo.botao}
            onPress={() => alert("Paciente Salvo!")}
          >
            <Text style={Estilo.textoBotao}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Estilo = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#001f33',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  ficha: {
    width: '100%',
    backgroundColor: "#001f33",
    borderWidth: 2,
    borderColor: "#d3d3d3", 
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  txtLogin: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  body: {
    width: "100%",
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#E9F8FF",
    width: "100%",
    height: 40,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#7A7A78",
    borderColor: "#C2DDEE",
    borderWidth: 2,
    borderRadius: 6, 
    marginBottom: 18, 
  },
  footer: {
    alignItems: "center"
  },
  botao: {
    backgroundColor: "#00c817",
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8 
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  }
});