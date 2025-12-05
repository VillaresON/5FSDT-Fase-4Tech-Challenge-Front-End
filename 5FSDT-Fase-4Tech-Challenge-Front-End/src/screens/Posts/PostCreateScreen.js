import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";

export default function PostCreateScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      // Faz requisição POST para criar post
      await api.post("/posts", { title, content });

      Alert.alert("Sucesso", "Post criado com sucesso!");
      setTitle("");
      setContent("");
      navigation.navigate("PostList"); // volta para a lista de posts
    } catch (err) {
      console.log(err.response?.data || err);
      Alert.alert("Erro", "Não foi possível criar o post");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título do post"
      />

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={[styles.input, { height: 120 }]}
        value={content}
        onChangeText={setContent}
        placeholder="Digite o conteúdo do post"
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Criar Post</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  label: { fontWeight: "bold", marginBottom: 8, marginTop: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12 },
  button: { backgroundColor: "#4caf50", padding: 14, borderRadius: 8, marginTop: 20, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  cancel: { backgroundColor: "#f44336" },
});
