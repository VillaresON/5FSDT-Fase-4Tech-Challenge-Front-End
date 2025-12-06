import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert, TouchableOpacity } from "react-native";
import api from "../../api/api";
import Screen from "../../components/Screen";
import Card from "../../components/Card";
import { AuthContext } from "../../context/AuthContext";
import { spacing, colors } from "../../styles/theme";

export default function TeacherListScreen({ navigation }) {
  const { isAdmin } = useContext(AuthContext);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await api.get("/teachers");
      setTeachers(res.data.data || []);
    } catch (err) {
      console.log("Erro ao listar professores:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível carregar os professores.");
    }
  }

  function confirmDelete(id) {
    Alert.alert("Confirmar", "Deseja excluir este professor?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/teachers/${id}`);
            Alert.alert("Sucesso", "Professor excluído.");
            load();
          } catch (err) {
            console.log("Erro ao excluir professor:", err.response?.data || err.message);
            Alert.alert("Erro", "Não foi possível excluir o professor.");
          }
        },
      },
    ]);
  }

  if (!isAdmin) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Apenas administradores podem gerenciar professores.</Text>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
      </Screen>
    );
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
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Professores/Admins</Text>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>

      <FlatList
        data={teachers}
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
                  navigation.navigate("TeacherEdit", {
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
          title="Novo professor / admin"
          onPress={() => navigation.navigate("TeacherCreate")}
        />
      </View>
    </Screen>
  );
}
