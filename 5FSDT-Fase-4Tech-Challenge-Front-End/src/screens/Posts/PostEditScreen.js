import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import api from "../../services/api";

export default function PostEditScreen({ route, navigation }) {
  const { post } = route.params;

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleUpdate = async () => {
    if (!title || !content) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      await api.put(`/posts/${post.id}`, {
        title,
        content,
      });

      Alert.alert("Sucesso", "Post atualizado!");
      navigation.goBack();
    } catch (err) {
      console.log("Erro ao atualizar post:", err);
      Alert.alert("Erro", "Não foi possível atualizar o post.");
    }
  };

  const handleDelete = () => {
    Alert.alert("Confirmação", "Deseja realmente excluir este post?", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/posts/${post.id}`);
            navigation.goBack();
          } catch (err) {
            console.log("Erro ao excluir post:", err);
            Alert.alert("Erro", "Não foi possível excluir o post.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Post</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
      />

      <TextInput
        style={[styles.input, { height: 150 }]}
        value={content}
        onChangeText={setContent}
        placeholder="Conteúdo"
        multiline
      />

      <Button title="Salvar Alterações" onPress={handleUpdate} />
      <View style={{ marginTop: 15 }}>
        <Button title="Excluir Post" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
});
