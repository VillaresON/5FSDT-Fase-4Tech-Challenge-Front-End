import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import Screen from "../../components/Screen";
import Card from "../../components/Card";
import { AuthContext } from "../../context/AuthContext";
import { spacing } from "../../styles/theme";
import api from "../../api/api";

export default function StudentCreateScreen({ navigation }) {
  const { isTeacher, isAdmin } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isTeacher && !isAdmin) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Apenas professores podem criar alunos.</Text>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
      </Screen>
    );
  }

  async function handleSave() {
    if (!name || !email) {
      Alert.alert("Atenção", "Preencha nome e email.");
      return;
    }
    try {
      setLoading(true);
      await api.post("/students", { name, email });
      Alert.alert("Sucesso", "Aluno criado com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.log("Erro ao criar aluno:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível criar o aluno.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Card>
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: spacing.md }}>
          Novo Aluno
        </Text>
        <Text>Nome</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 8,
            borderRadius: 8,
            marginBottom: spacing.sm,
          }}
        />
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 8,
            borderRadius: 8,
            marginBottom: spacing.md,
          }}
        />
        <Button
          title={loading ? "Salvando..." : "Salvar"}
          onPress={handleSave}
        />
      </Card>
      <View style={{ marginTop: spacing.md }}>
        <Button title="Cancelar" onPress={() => navigation.goBack()} />
      </View>
    </Screen>
  );
}
