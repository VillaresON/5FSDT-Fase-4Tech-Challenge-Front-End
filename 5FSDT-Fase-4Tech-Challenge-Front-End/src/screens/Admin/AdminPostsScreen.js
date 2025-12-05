import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import api from "../../services/api";

export default function AdminPostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts/admin/all");
      setPosts(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir este post?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: async () => {
            try {
              await api.delete(`/posts/${id}`);
              fetchPosts();
            } catch (err) {
              console.log(err);
            }
          }
        }
      ]
    );
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Autor: {item.author?.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => navigation.navigate("PostEdit", { postId: item.id })}>
                <Text style={styles.edit}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: "#f5f5f5", padding: 12, borderRadius: 8, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: "bold" },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  edit: { color: "#2196f3", fontWeight: "bold" },
  delete: { color: "#f44336", fontWeight: "bold" },
});
