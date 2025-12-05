import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import api from "../../services/api";

export default function StudentCreateScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = async () => {
    if (!name || !email) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/students", { name, email, role });
      Alert.alert("Sucesso", "Aluno criado!");
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Não foi possível criar o aluno");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Criar Aluno" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  backBtn: { marginBottom: 12 },
  backText: { color: "#2196f3", fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 16 },
});
