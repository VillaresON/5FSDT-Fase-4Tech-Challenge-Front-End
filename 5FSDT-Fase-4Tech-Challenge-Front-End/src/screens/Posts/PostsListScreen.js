import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import api from "../../services/api";

export default function PostListScreen({ navigation }) {
  const [posts, setPosts] = useState([]);       // lista de posts
  const [search, setSearch] = useState("");     // busca
  const [loading, setLoading] = useState(true); // carregamento

  // Carregar posts do backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        // certifique-se de que response.data é um array
        setPosts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.log("Erro ao buscar posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Filtragem de posts por título
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Buscar posts..."
          value={search}
          onChangeText={setSearch}
        />
        <Text style={styles.noPostsText}>Nenhum post encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar posts..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()} // seu post precisa ter campo `id`
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postCard}
            onPress={() => navigation.navigate("PostRead", { postId: item.id })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>Autor: {item.author}</Text>
            <Text style={styles.description}>
              {item.content.length > 100
                ? item.content.substring(0, 100) + "..."
                : item.content}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  postCard: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  author: { fontSize: 14, color: "#555", marginVertical: 4 },
  description: { fontSize: 14, color: "#333" },
  noPostsText: { fontSize: 16, textAlign: "center", marginTop: 20 },
});
