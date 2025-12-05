import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import api from "../../services/api";

export default function TeacherEdit({ route, navigation }) {
  const { teacher } = route.params;

  const [name, setName] = useState(teacher.name);
  const [email, setEmail] = useState(teacher.email);

  async function handleUpdate() {
    try {
      await api.put(`/teachers/${teacher.id}`, {
        name,
        email,
      });
      navigation.goBack();
    } catch (err) {
      console.log("Erro ao editar professor:", err);
    }
  }

  async function handleDelete() {
    Alert.alert("Confirmação", "Deseja realmente excluir?", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/teachers/${teacher.id}`);
            navigation.goBack();
          } catch (err) {
            console.log("Erro ao excluir professor:", err);
          }
        },
      },
    ]);
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Editar Professor</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: "#eee",
          padding: 10,
          marginVertical: 10,
          borderRadius: 8,
        }}
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor: "#eee",
          padding: 10,
          marginVertical: 10,
          borderRadius: 8,
        }}
      />

      <Button title="Salvar" onPress={handleUpdate} />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Excluir"
          color="red"
          onPress={handleDelete}
        />
      </View>
    </View>
  );
}
