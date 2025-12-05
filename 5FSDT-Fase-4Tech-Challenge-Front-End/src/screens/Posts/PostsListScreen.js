import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import api from "../../services/api";

export default function PostListScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.log(err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = Array.isArray(posts)
    ? posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
    : [];

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createBtn}
        onPress={() => navigation.navigate("PostCreate")}
      >
        <Text style={styles.createText}>Criar Post</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Buscar posts..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("PostRead", { postId: item.id })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>Autor: {item.author?.name}</Text>
            <Text style={styles.desc}>{item.content.substring(0, 100)}...</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  createBtn: { backgroundColor: "#4caf50", padding: 12, borderRadius: 8, marginBottom: 16 },
  createText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 16 },
  card: { backgroundColor: "#f5f5f5", padding: 12, borderRadius: 8, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: "bold" },
  author: { fontSize: 14, color: "#555", marginVertical: 4 },
  desc: { fontSize: 14 },
});
