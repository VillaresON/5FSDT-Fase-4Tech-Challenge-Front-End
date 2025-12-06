import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, Alert, ActivityIndicator, TextInput } from "react-native";
import api from "../../api/api";
import Screen from "../../components/Screen";
import Card from "../../components/Card";
import { AuthContext } from "../../context/AuthContext";
import { spacing, colors } from "../../styles/theme";

export default function PostDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const { isTeacher, isAdmin } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [sendingComment, setSendingComment] = useState(false);

  async function loadPost() {
    try {
      setLoading(true);
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.log("Erro ao carregar post:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível carregar o post.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPost();
  }, []);

  function handleDelete() {
    Alert.alert("Confirmar", "Deseja excluir este post?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/posts/${id}`);
            Alert.alert("Sucesso", "Post excluído com sucesso.", [
              { text: "OK", onPress: () => navigation.goBack() },
            ]);
          } catch (err) {
            console.log("Erro ao excluir:", err.response?.data || err.message);
            Alert.alert("Erro", "Não foi possível excluir o post.");
          }
        },
      },
    ]);
  }

  async function handleSendComment() {
    if (!comment.trim()) {
      Alert.alert("Atenção", "Digite um comentário.");
      return;
    }
    try {
      setSendingComment(true);
      await api.post(`/posts/${id}/comments`, { content: comment });
      setComment("");
      Alert.alert("Sucesso", "Comentário enviado.");
      loadPost();
    } catch (err) {
      console.log("Erro comentário:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível enviar o comentário.");
    } finally {
      setSendingComment(false);
    }
  }

  if (loading) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: spacing.sm }}>Carregando...</Text>
        </View>
      </Screen>
    );
  }

  if (!post) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Post não encontrado.</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Card>
        <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: spacing.sm }}>
          {post.title}
        </Text>
        {post.author?.name && (
          <Text style={{ color: colors.muted, marginBottom: spacing.sm }}>
            Autor: {post.author.name}
          </Text>
        )}
        <Text style={{ fontSize: 16, lineHeight: 22 }}>{post.content}</Text>
      </Card>

      {/* comentários simples */}
      <Card>
        <Text style={{ fontWeight: "600", marginBottom: spacing.sm }}>Comentários</Text>
        {(post.comments || []).length === 0 ? (
          <Text style={{ color: colors.muted, marginBottom: spacing.sm }}>
            Ainda não há comentários.
          </Text>
        ) : (
          (post.comments || []).map((c) => (
            <View
              key={c.id}
              style={{ borderTopWidth: 1, borderTopColor: "#eee", paddingVertical: 6 }}
            >
              <Text>{c.content}</Text>
            </View>
          ))
        )}

        <TextInput
          placeholder="Escreva um comentário..."
          value={comment}
          onChangeText={setComment}
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 8,
            borderRadius: 8,
            marginTop: spacing.sm,
            marginBottom: spacing.sm,
          }}
        />
        <Button
          title={sendingComment ? "Enviando..." : "Enviar comentário"}
          onPress={handleSendComment}
        />
      </Card>

      {(isTeacher || isAdmin) && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: spacing.md,
          }}
        >
          <Button
            title="Editar"
            onPress={() => navigation.navigate("PostEdit", { id })}
          />
          <Button color={colors.danger} title="Excluir" onPress={handleDelete} />
        </View>
      )}

      <View style={{ marginTop: spacing.md }}>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    </Screen>
  );
}
