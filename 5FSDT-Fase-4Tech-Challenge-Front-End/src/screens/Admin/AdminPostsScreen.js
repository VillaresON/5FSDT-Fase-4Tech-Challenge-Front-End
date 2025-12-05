import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  RefreshControl,
} from "react-native";
import api from "../../services/api";

export default function AdminPostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (err) {
      console.log("Erro ao carregar posts:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadPosts);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = (id) => {
    Alert.alert("Confirmação", "Deseja realmente excluir este post?", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/posts/${id}`);
            loadPosts();
          } catch (err) {
            console.log("Erro ao excluir post:", err);
          }
        },
      },
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel Administrativo de Posts</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardAuthor}>Autor: {item.author}</Text>
            </View>

            <View style={styles.buttonGroup}>
              <Button
                title="Editar"
                onPress={() => navigation.navigate("PostEdit", { post: item })}
              />
              <View style={{ height: 5 }} />
              <Button
                title="Excluir"
                color="red"
                onPress={() => handleDelete(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 15 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fafafa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardAuthor: { fontSize: 14, color: "#666", marginTop: 5 },
  buttonGroup: { marginLeft: 10, justifyContent: "center" },
});
