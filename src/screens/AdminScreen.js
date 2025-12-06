import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert, TouchableOpacity } from "react-native";
import api from "../api/api";
import Screen from "../components/Screen";
import Card from "../components/Card";
import { AuthContext } from "../context/AuthContext";
import { spacing, colors } from "../styles/theme";

export default function AdminScreen({ navigation }) {
  const { isTeacher, isAdmin } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  async function load() {
    try {
      const res = await api.get("/posts");
      setPosts(res.data.data || []);
    } catch (err) {
      console.log("Erro ao carregar posts:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível carregar as postagens.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (!isTeacher && !isAdmin) {
    return (
      <Screen>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Você não tem permissão para acessar a área administrativa.</Text>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
      </Screen>
    );
  }

  function confirmDelete(id) {
    Alert.alert("Confirmar", "Deseja excluir este post?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/posts/${id}`);
            Alert.alert("Sucesso", "Post excluído.");
            load();
          } catch (err) {
            console.log("Erro ao excluir post:", err.response?.data || err.message);
            Alert.alert("Erro", "Não foi possível excluir o post.");
          }
        },
      },
    ]);
  }

  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: spacing.md,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Administração de Posts</Text>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card>
            <Text style={{ fontWeight: "600" }}>{item.title}</Text>
            {item.author?.name && (
              <Text style={{ color: colors.muted, marginBottom: spacing.sm }}>
                Autor: {item.author.name}
              </Text>
            )}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("PostEdit", { id: item.id })}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: colors.primary,
                }}
              >
                <Text style={{ color: "#fff" }}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => confirmDelete(item.id)}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: colors.danger,
                }}
              >
                <Text style={{ color: "#fff" }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />
    </Screen>
  );
}
