import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import api from "../api/api";
import Screen from "../components/Screen";
import Card from "../components/Card";
import { AuthContext } from "../context/AuthContext";
import { spacing, colors } from "../styles/theme";

export default function AdminScreen({ navigation }) {
  const { isTeacher, isAdmin } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Carregar posts (usado em vários lugares)
  async function load() {
    try {
      setLoading(true);
      const res = await api.get("/posts");
      setPosts(res.data.data || []);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível carregar as postagens.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Atualiza sempre que a tela ganhar foco (editou / voltou)
  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  // 🔒 Proteção de permissão
  if (!isTeacher && !isAdmin) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Você não tem permissão para acessar a área administrativa.</Text>
          <TouchableOpacity
            style={{ marginTop: spacing.md }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: colors.primary }}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  // 🗑️ DELETE PROFISSIONAL
  function confirmDelete(id) {
    Alert.alert("Confirmar exclusão", "Deseja excluir este post?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        async onPress() {
          try {
            await api.delete(`/posts/${id}`);

            // 🔥 Atualização imediata de estado (sem depender do GET)
            setPosts((prev) => prev.filter((p) => p.id !== id));

            Alert.alert("Sucesso", "Post excluído com sucesso.");
          } catch (err) {
            if (err.response?.status === 404) {
              Alert.alert(
                "Post não encontrado",
                "Esse post já foi excluído."
              );
              setPosts((prev) => prev.filter((p) => p.id !== id));
              return;
            }

            Alert.alert(
              "Erro",
              err.response?.data?.error || "Não foi possível excluir o post."
            );
          }
        },
      },
    ]);
  }

  return (
    <Screen>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing.md,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "600" }}>
          Administração de Posts
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.primary }}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={load} />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: spacing.lg }}>
            Nenhuma postagem encontrada.
          </Text>
        }
        renderItem={({ item }) => (
          <Card>
            <Text style={{ fontWeight: "600", marginBottom: 4 }}>
              {item.title}
            </Text>

            {item.Teacher?.name && (
              <Text style={{ color: colors.muted, marginBottom: spacing.sm }}>
                Autor: {item.Teacher.name}
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("PostEdit", { id: item.id })}
                style={{
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: colors.primary,
                }}
              >
                <Text style={{ color: "#fff" }}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => confirmDelete(item.id)}
                style={{
                  padding: 10,
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
