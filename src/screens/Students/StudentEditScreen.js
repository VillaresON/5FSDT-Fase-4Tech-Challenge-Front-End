import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from "react-native";
import Screen from "../../components/Screen";
import Card from "../../components/Card";
import { AuthContext } from "../../context/AuthContext";
import { spacing } from "../../styles/theme";
import api from "../../api/api";

export default function StudentEditScreen({ route, navigation }) {
  const { isTeacher, isAdmin } = useContext(AuthContext);
  const { id } = route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  if (!isTeacher && !isAdmin) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Apenas professores podem editar alunos.</Text>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
      </Screen>
    );
  }

  async function loadStudent() {
    try {
      setLoading(true);
      const res = await api.get(`/students/${id}`);
      setName(res.data.name);
      setEmail(res.data.email);
    } catch (err) {
      console.log("Erro ao carregar aluno:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível carregar o aluno.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudent();
  }, []);

  async function handleSave() {
    if (!name || !email) {
      Alert.alert("Atenção", "Preencha nome e email.");
      return;
    }
    try {
      setSaving(true);
      await api.put(`/students/${id}`, { name, email });
      Alert.alert("Sucesso", "Aluno atualizado com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.log("Erro ao atualizar aluno:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível atualizar o aluno.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: spacing.sm }}>Carregando...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Card>
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: spacing.md }}>
          Editar Aluno
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
          title={saving ? "Salvando..." : "Salvar alterações"}
          onPress={handleSave}
        />
      </Card>
      <View style={{ marginTop: spacing.md }}>
        <Button title="Cancelar" onPress={() => navigation.goBack()} />
      </View>
    </Screen>
  );
}
