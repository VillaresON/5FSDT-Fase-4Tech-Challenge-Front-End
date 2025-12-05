import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import api from "../../services/api";

export default function PostReadScreen({ route, navigation }) {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#0000ff" />;
  if (!post) return <Text style={{ padding: 16 }}>Post não encontrado</Text>;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>Autor: {post.author?.name}</Text>
      <Text style={styles.content}>{post.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  backBtn: { marginBottom: 12 },
  backText: { color: "#2196f3", fontWeight: "bold" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  author: { fontSize: 14, color: "#555", marginBottom: 16 },
  content: { fontSize: 16 },
});
