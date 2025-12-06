import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import api from "../../api/api";
import Screen from "../../components/Screen";
import Card from "../../components/Card";
import { AuthContext } from "../../context/AuthContext";
import { colors, spacing } from "../../styles/theme";

export default function PostListScreen({ navigation }) {
  const { logout, isTeacher, isAdmin } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadPosts(term) {
    try {
      setLoading(true);
      const params = term ? { search: term } : undefined;
      const res = await api.get("/posts", { params });
      setPosts(res.data.data || []);
    } catch (err) {
      console.log("Erro ao carregar posts:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível carregar os posts.");
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    loadPosts();
  }, []);

  const canCreatePost = isTeacher || isAdmin;

  function handleLogout() {
    logout();
  }

  function handleSearch() {
    loadPosts(search);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("PostDetails", { id: item.id })}
    >
      <Card>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 4 }}>
          {item.title}
        </Text>
        {item.author?.name && (
          <Text style={{ color: colors.muted, marginBottom: 4 }}>
            Autor: {item.author.name}
          </Text>
        )}
        {item.content && (
          <Text numberOfLines={2} style={{ color: colors.text }}>
            {item.content}
          </Text>
        )}
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <Screen>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: spacing.sm }}>Carregando posts...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      {/* Top bar */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: spacing.md,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Postagens</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ color: colors.danger, fontWeight: "600" }}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Busca */}
      <View style={{ flexDirection: "row", marginBottom: spacing.md }}>
        <TextInput
          placeholder="Buscar por título ou palavra-chave"
          value={search}
          onChangeText={setSearch}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 8,
            borderRadius: 8,
            marginRight: 8,
          }}
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>

      {/* Se não houver posts */}
      {posts.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ marginBottom: spacing.sm }}>
            Ainda não há posts cadastrados.
          </Text>
          {canCreatePost && (
            <Button
              title="Criar primeiro post"
              onPress={() => navigation.navigate("PostCreate")}
            />
          )}
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

      {/* Ações inferiores */}
      <View style={{ marginTop: spacing.md }}>
        {canCreatePost && (
          <TouchableOpacity
            onPress={() => navigation.navigate("PostCreate")}
            style={{
              backgroundColor: colors.primary,
              padding: 12,
              borderRadius: 8,
              marginBottom: spacing.sm,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
              + Novo Post
            </Text>
          </TouchableOpacity>
        )}

        {(isTeacher || isAdmin) && (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate("Teachers")}
              style={{
                backgroundColor: "#0f766e",
                padding: 10,
                borderRadius: 8,
                marginBottom: spacing.sm,
              }}
            >
              <Text
                style={{ color: "#fff", textAlign: "center", fontWeight: "500" }}
              >
                Gerenciar Professores
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Students")}
              style={{
                backgroundColor: "#4b5563",
                padding: 10,
                borderRadius: 8,
                marginBottom: spacing.sm,
              }}
            >
              <Text
                style={{ color: "#fff", textAlign: "center", fontWeight: "500" }}
              >
                Gerenciar Alunos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Admin")}
              style={{
                backgroundColor: "#6d28d9",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text
                style={{ color: "#fff", textAlign: "center", fontWeight: "500" }}
              >
                Área Administrativa de Posts
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Screen>
  );
}
