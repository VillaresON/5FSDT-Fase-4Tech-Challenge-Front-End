import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export default function PostCreateScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = async () => {
    if (!title || !content) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/posts", {
        title,
        content,
        author: user.name,
      });

      Alert.alert("Sucesso", "Post criado com sucesso!");
      navigation.goBack();
    } catch (err) {
      console.log("Erro ao criar post:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível criar o post.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 150 }]}
        placeholder="Conteúdo"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Button title="Salvar" onPress={handleCreate} />
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
