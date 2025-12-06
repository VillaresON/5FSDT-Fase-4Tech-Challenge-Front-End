import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import Screen from "../../components/Screen";
import Card from "../../components/Card";
import { AuthContext } from "../../context/AuthContext";
import { spacing } from "../../styles/theme";
import api from "../../api/api";

export default function TeacherCreateScreen({ navigation }) {
  const { isAdmin } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdminFlag, setIsAdminFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isAdmin) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Apenas administradores podem criar professores.</Text>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
      </Screen>
    );
  }

  async function handleSave() {
    if (!name || !email || !password) {
      Alert.alert("Atenção", "Preencha nome, email e senha.");
      return;
    }
    try {
      setLoading(true);
      await api.post("/teachers", { name, email, password, isAdmin: isAdminFlag });
      Alert.alert("Sucesso", "Professor criado com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.log("Erro ao criar professor:", err.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível criar o professor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Card>
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: spacing.md }}>
          Novo Professor / Admin
        </Text>
        <Text>Nome</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 8,
            borderRadius: 8,
            marginBottom: spacing.sm,
          }}
        />
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 8,
            borderRadius: 8,
            marginBottom: spacing.sm,
          }}
        />
        <Text>Senha</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 8,
            borderRadius: 8,
            marginBottom: spacing.sm,
          }}
        />
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: spacing.md }}>
          <Button
            title={isAdminFlag ? "É administrador" : "Não é administrador"}
            onPress={() => setIsAdminFlag((prev) => !prev)}
          />
        </View>
        <Button
          title={loading ? "Salvando..." : "Salvar"}
          onPress={handleSave}
        />
      </Card>
      <View style={{ marginTop: spacing.md }}>
        <Button title="Cancelar" onPress={() => navigation.goBack()} />
      </View>
    </Screen>
  );
}
