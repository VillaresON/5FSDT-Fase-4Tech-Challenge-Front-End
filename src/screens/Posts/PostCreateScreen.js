import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import Screen from "../../components/Screen";
import Card from "../../components/Card";
import { AuthContext } from "../../context/AuthContext";
import { spacing } from "../../styles/theme";
import api from "../../api/api";

export default function PostCreateScreen({ navigation }) {
  const { isTeacher, isAdmin } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isTeacher && !isAdmin) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Você não tem permissão para criar postagens.</Text>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
      </Screen>
    );
  }

  async function handleSave() {
    if (!title || !content) {
      Alert.alert("Atenção", "Preencha título e conteúdo.");
      return;
    }
    try {
      setLoading(true);
      await api.post("/posts", { title, content });
      Alert.alert("Sucesso", "Post criado com sucesso!", [
        { text: "OK", onPress: () => navigation.navigate("PostList") },
      ]);
    } catch (err) {
      console.log("Erro ao criar post:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível criar o post.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Card>
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: spacing.md }}>
          Novo Post
        </Text>
        <TextInput
          placeholder="Título"
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
          placeholder="Conteúdo"
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
