import React, { useContext, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
            const res = await api.delete(`/posts/${id}`);

            // ✅ STATUS 2xx = SUCESSO
            if (res.status === 200 || res.status === 204) {
              Alert.alert("Sucesso", "Post excluído com sucesso", [
                { text: "OK", onPress: () => navigation.goBack() }
              ]);
              return;
            }

            Alert.alert("Erro", "Resposta inesperada do servidor");
          } catch (err) {
            // ✅ 404 após delete = estado esperado
            if (err.response?.status === 404) {
              navigation.goBack();
              return;
            }

            Alert.alert(
              "Erro",
              err.response?.data?.error || "Erro ao excluir"
            );
          }
        }
      }
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
        {post.Teacher?.name && (
          <Text style={{ color: colors.muted, marginBottom: spacing.sm }}>
            Autor: {post.Teacher.name}
          </Text>
        )}
        <Text style={{ fontSize: 16, lineHeight: 22 }}>{post.content}</Text>
      </Card>

      {/* comentários simples */}
      {/* Comentários */}
      <Card>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 16,
            marginBottom: spacing.md,
          }}
        >
          Comentários
        </Text>

        {(post.Comments || []).length === 0 ? (
          <Text style={{ color: colors.muted, marginBottom: spacing.sm }}>
            Ainda não há comentários.
          </Text>
        ) : (
          (post.Comments || []).map((c) => (
            <View
              key={c.id}
              style={{
                flexDirection: "row",
                marginBottom: spacing.sm,
                padding: spacing.sm,
                borderRadius: 10,
                backgroundColor: "#f7f7f7",
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
                  💬
                </Text>
              </View>

              {/* Conteúdo */}
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "600", fontSize: 14 }}>
                  {c.Teacher?.name || "Usuário"}
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 20,
                    marginTop: 2,
                  }}
                >
                  {c.content}
                </Text>

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
          ))
        )}

        {/* Campo de comentário */}
        <View
          style={{
            marginTop: spacing.md,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 12,
            padding: spacing.sm,
            backgroundColor: "#fff",
          }}
        >
          <TextInput
            placeholder="Escreva um comentário..."
            value={comment}
            onChangeText={setComment}
            multiline
            style={{
              minHeight: 60,
              textAlignVertical: "top",
              fontSize: 14,
            }}
          />

          <View style={{ alignItems: "flex-end", marginTop: spacing.sm }}>
            <Button
              title={sendingComment ? "Enviando..." : "Enviar"}
              onPress={handleSendComment}
              disabled={sendingComment}
            />
          </View>
        </View>
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
