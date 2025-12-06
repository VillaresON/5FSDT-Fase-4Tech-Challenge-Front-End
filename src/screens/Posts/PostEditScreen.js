import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from "react-native";
import Screen from "../../components/Screen";
import Card from "../../components/Card";
import { AuthContext } from "../../context/AuthContext";
import { spacing } from "../../styles/theme";
import api from "../../api/api";

export default function PostEditScreen({ route, navigation }) {
  const { id } = route.params;
  const { isTeacher, isAdmin } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  if (!isTeacher && !isAdmin) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Você não tem permissão para editar postagens.</Text>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
      </Screen>
    );
  }

  async function loadPost() {
    try {
      setLoading(true);
      const res = await api.get(`/posts/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (err) {
      console.log("Erro ao carregar post:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível carregar o post.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPost();
  }, []);

  async function handleSave() {
    if (!title || !content) {
      Alert.alert("Atenção", "Preencha título e conteúdo.");
      return;
    }
    try {
      setSaving(true);
      await api.put(`/posts/${id}`, { title, content });
      Alert.alert("Sucesso", "Post atualizado com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.log("Erro ao atualizar post:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível atualizar o post.");
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
          Editar Post
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 8,
            borderRadius: 8,
            marginBottom: spacing.sm,
          }}
        />
        <TextInput
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 8,
            borderRadius: 8,
            height: 120,
            textAlignVertical: "top",
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
