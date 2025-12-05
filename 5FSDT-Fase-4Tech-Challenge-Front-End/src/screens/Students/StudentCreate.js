import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import api from "../../services/api";

export default function StudentCreate({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleCreate() {
    try {
      await api.post("/students", {
        name,
        email,
      });
      navigation.goBack();
    } catch (err) {
      console.log("Erro ao criar estudante:", err.response?.data);
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Novo Estudante</Text>

      <TextInput
        placeholder="Nome"
        style={{
          backgroundColor: "#eee",
          padding: 10,
          marginVertical: 10,
          borderRadius: 8,
        }}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="E-mail"
        style={{
          backgroundColor: "#eee",
          padding: 10,
          marginVertical: 10,
          borderRadius: 8,
        }}
        value={email}
        onChangeText={setEmail}
      />

      <Button title="Salvar" onPress={handleCreate} />
    </View>
  );
}
