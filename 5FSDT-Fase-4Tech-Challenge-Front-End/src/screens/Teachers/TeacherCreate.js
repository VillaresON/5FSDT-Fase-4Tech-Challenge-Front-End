import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import api from "../../services/api";

export default function TeacherCreate({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleCreate() {
    try {
      await api.post("/teachers", {
        name,
        email,
        password,
      });
      navigation.goBack();
    } catch (err) {
      console.log("Erro ao criar professor:", err.response?.data);
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Novo Professor</Text>

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

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={{
          backgroundColor: "#eee",
          padding: 10,
          marginVertical: 10,
          borderRadius: 8,
        }}
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Salvar" onPress={handleCreate} />
    </View>
  );
}
