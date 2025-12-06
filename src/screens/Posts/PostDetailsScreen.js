import React, { useContext, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
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
      Alert.alert("Erro", "Não foi possível carregar o post.");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadPost();
    }, [id])
  );

  async function handleDelete() {
    Alert.alert("Confirmar exclusão", "Deseja excluir este post?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        async onPress() {
          try {
            await api.delete(`/posts/${id}`);
            Alert.alert("Sucesso", "Post excluído", [
              { text: "OK", onPress: () => navigation.goBack() },
            ]);
          } catch {
            navigation.goBack();
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
      loadPost();
    } catch {
      Alert.alert("Erro", "Não foi possível enviar o comentário.");
    } finally {
      setSendingComment(false);
    }
  }

  if (loading) {
    return (
      <Screen>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: spacing.sm }}>Carregando…</Text>
        </View>
      </Screen>
    );
  }

  if (!post) {
    return (
      <Screen>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Post não encontrado.</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      {/* POST */}
      <Card>
        <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: spacing.sm }}>
          {post.title}
        </Text>

        {post.Teacher?.name && (
          <Text style={{ color: colors.muted, marginBottom: spacing.sm }}>
            Autor: {post.Teacher.name}
          </Text>
        )}

        <Text style={{ fontSize: 16, lineHeight: 22 }}>
          {post.content}
        </Text>
      </Card>

      {/* COMENTÁRIOS */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <Card>
            {/* CAMPO COMENTAR */}
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 12,
                padding: spacing.sm,
                marginTop: spacing.md,
              }}
            >
              <TextInput
                placeholder="Escreva um comentário..."
                value={comment}
                onChangeText={setComment}
                multiline
                style={{ minHeight: 60 }}
              />

              <View style={{ alignItems: "flex-end", marginTop: spacing.sm }}>
                <Button
                  title={sendingComment ? "Enviando…" : "Enviar"}
                  onPress={handleSendComment}
                  disabled={sendingComment}
                />
              </View>
            </View>
            <Text
              style={{ fontSize: 16, fontWeight: "700", marginTop: 15, marginBottom: spacing.md }}
            >
              Comentários
            </Text>

            {[...(post.Comments || [])]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((c) => {
                const authorName =
                  c.Teacher?.name ||
                  c.Student?.name ||
                  c.author?.name ||
                  c.student?.name ||
                  "Usuário";

                return (
                  <View
                    key={c.id}
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#f7f7f7",
                      borderRadius: 10,
                      padding: spacing.sm,
                      marginBottom: spacing.sm,
                    }}
                  >
                    {/* Avatar */}
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: colors.primary,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: spacing.sm,
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "700" }}>
                        {authorName.charAt(0).toUpperCase()}
                      </Text>
                    </View>

                    {/* Conteúdo */}
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: "600" }}>{authorName}</Text>

                      <Text style={{ marginTop: 2 }}>{c.content}</Text>

                      <Text
                        style={{
                          fontSize: 12,
                          color: colors.muted,
                          marginTop: 4,
                        }}
                      >
                        {new Date(c.createdAt).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                );
              })}

          </Card>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* AÇÕES */}
      {(isTeacher || isAdmin) && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: spacing.md,
          }}
        >
          <Button title="Editar" onPress={() => navigation.navigate("PostEdit", { id })} />
          <Button title="Excluir" color={colors.danger} onPress={handleDelete} />
        </View>
      )}

      <View style={{ marginTop: spacing.md }}>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    </Screen>
  );
}
