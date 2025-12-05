import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import api from "../../services/api";

export default function StudentEditScreen({ route, navigation }) {
  const { studentId } = route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/students/${studentId}`);
        const student = res.data;
        setName(student.name);
        setEmail(student.email);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [studentId]);

  const handleSubmit = async () => {
    if (!name || !email) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      await api.put(`/students/${studentId}`, { name, email });
      Alert.alert("Sucesso", "Aluno atualizado!");
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Não foi possível atualizar o aluno");
    }
  };

  if (loading) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Salvar Alterações" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  backBtn: { marginBottom: 12 },
  backText: { color: "#2196f3", fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 16 },
});
