// src/screens/Posts/PostListScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import { useNavigation } from "@react-navigation/native";

export default function PostListScreen() {
  const { user, token } = useAuth();
  const navigation: any = useNavigation();

  const [posts, setPosts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  async function loadPosts() {
    try {
      const response = await api.get("/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts(response.data);
      setFiltered(response.data);
    } catch (err) {
      console.log("Erro ao carregar posts", err);
    }
  }

  function handleSearch(text: string) {
    setSearch(text);
    if (text.trim() === "") {
      setFiltered(posts);
      return;
    }

    const result = posts.filter(
      (item) =>
        item.title.toLowerCase().includes(text.toLowerCase()) ||
        item.description.toLowerCase().includes(text.toLowerCase())
    );

    setFiltered(result);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Buscar..."
        value={search}
        onChangeText={handleSearch}
      />

      {user?.role !== "STUDENT" && (
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate("CreatePost")}
        >
          <Text style={styles.createButtonText}>+ Criar Post</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postItem}
            onPress={() => navigation.navigate("PostDetails", { post: item })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>Autor: {item.author?.name || "Desconhecido"}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#FFF" },
  search: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    marginBottom: 12,
  },
  createButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  createButtonText: { color: "#FFF", fontWeight: "bold", textAlign: "center" },
  postItem: {
    backgroundColor: "#f8f9fa",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  author: { marginTop: 4, fontSize: 14, color: "#333" },
  desc: { marginTop: 6, color: "#555" },
});
