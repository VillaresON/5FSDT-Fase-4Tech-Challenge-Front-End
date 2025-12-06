import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from "react-native";
import Screen from "../../components/Screen";
import Card from "../../components/Card";
import { AuthContext } from "../../context/AuthContext";
import { spacing } from "../../styles/theme";
import api from "../../api/api";

export default function TeacherEditScreen({ route, navigation }) {
  const { isAdmin } = useContext(AuthContext);
  const { id } = route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  if (!isAdmin) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Apenas administradores podem editar professores.</Text>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
      </Screen>
    );
  }

  async function loadTeacher() {
    try {
      setLoading(true);
      const res = await api.get(`/teachers/${id}`);
      setName(res.data.name);
      setEmail(res.data.email);
    } catch (err) {
      console.log("Erro ao carregar professor:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível carregar o professor.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTeacher();
  }, []);

  async function handleSave() {
    if (!name || !email) {
      Alert.alert("Atenção", "Preencha nome e email.");
      return;
    }
    try {
      setSaving(true);
      await api.put(`/teachers/${id}`, { name, email });
      Alert.alert("Sucesso", "Professor atualizado com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.log("Erro ao atualizar professor:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível atualizar o professor.");
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
          Editar Professor
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
