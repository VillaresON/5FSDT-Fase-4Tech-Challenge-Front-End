import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import api from "../../services/api";

export default function PostEditScreen({ route, navigation }) {
  const { postId } = route.params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${postId}`);
        const post = res.data; // seu backend retorna o post direto
        setTitle(post.title);
        setContent(post.content);
      } catch (err) {
        console.log(err);
        Alert.alert("Erro", "Não foi possível carregar o post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async () => {
    if (!title || !content) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      await api.put(`/posts/${postId}`, { title, content });
      Alert.alert("Sucesso", "Post atualizado!");
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Não foi possível atualizar o post");
    }
  };

  if (loading) return null; // pode colocar ActivityIndicator

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="Conteúdo"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Salvar Alterações" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 16 },
});
