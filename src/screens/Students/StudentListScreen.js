import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { View, Text, FlatList, Button, Alert, TouchableOpacity } from "react-native";
import api from "../../api/api";
import Screen from "../../components/Screen";
import Card from "../../components/Card";
import { AuthContext } from "../../context/AuthContext";
import { spacing, colors } from "../../styles/theme";

export default function StudentListScreen({ navigation }) {
  const { isTeacher, isAdmin } = useContext(AuthContext);
  const [students, setStudents] = useState([]);

  async function load() {
    try {
      const res = await api.get("/students");
      setStudents(res.data.data || []);
    } catch (err) {
      console.log("Erro ao listar alunos:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível carregar os alunos.");
    }
  }

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );


  if (!isTeacher && !isAdmin) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Apenas professores podem gerenciar alunos.</Text>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
      </Screen>
    );
  }

  function confirmDelete(id) {
    Alert.alert("Confirmar", "Deseja excluir este aluno?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        async onPress() {
          try {
            await api.delete(`/students/${id}`);

            setStudents((prev) => prev.filter((s) => s.id !== id));

            Alert.alert("Sucesso", "Aluno excluído com sucesso.");
          } catch (err) {
            console.log("Erro ao excluir aluno:", err.response?.data || err.message);

            // ✅ 404 pós-delete não é erro real
            if (err.response?.status === 404) {
              setStudents((prev) => prev.filter((s) => s.id !== id));
              return;
            }

            Alert.alert("Erro", "Não foi possível excluir o aluno.");
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
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Alunos</Text>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card>
            <Text style={{ fontWeight: "600" }}>{item.name}</Text>
            <Text style={{ color: colors.muted, marginBottom: spacing.sm }}>
              {item.email}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("StudentEdit", {
                    id: item.id,
                  })
                }
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

      <View style={{ marginTop: spacing.md }}>
        <Button
          title="Novo aluno"
          onPress={() => navigation.navigate("StudentCreate")}
        />
      </View>
    </Screen>
  );
}
