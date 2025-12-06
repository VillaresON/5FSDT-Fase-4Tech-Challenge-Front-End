import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import Screen from "../components/Screen";
import Card from "../components/Card";
import { colors, spacing } from "../styles/theme";
import api from "../api/api";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("teacher"); // teacher | admin | student
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password || !confirm) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Atenção", "As senhas não conferem.");
      return;
    }

    if (role === "student") {
      Alert.alert(
        "Cadastro de aluno",
        "O cadastro de alunos deve ser feito por um professor na área administrativa."
      );
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", {
        name,
        email,
        password,
        isAdmin: role === "admin",
      });
      Alert.alert("Sucesso", "Conta criada com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.log("Register error:", err.response?.data || err.message);
      const msg = err.response?.data?.error || "Não foi possível criar a conta.";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Card>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: spacing.md }}>
            Criar conta de professor
          </Text>

          <Text>Nome</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              padding: 10,
              borderRadius: 8,
              marginBottom: spacing.sm,
            }}
          />

          <Text>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              padding: 10,
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
              padding: 10,
              borderRadius: 8,
              marginBottom: spacing.sm,
            }}
          />

          <Text>Confirmar senha</Text>
          <TextInput
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              padding: 10,
              borderRadius: 8,
              marginBottom: spacing.md,
            }}
          />

          <Text style={{ marginBottom: 4 }}>Papel</Text>
          <View style={{ flexDirection: "row", marginBottom: spacing.md }}>
            {[
              { key: "teacher", label: "Professor" },
              { key: "admin", label: "Admin" },
              { key: "student", label: "Aluno" },
            ].map((opt) => (
              <TouchableOpacity
                key={opt.key}
                onPress={() => setRole(opt.key)}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: role === opt.key ? colors.primary : "#ddd",
                  backgroundColor: role === opt.key ? colors.primary : "#fff",
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    color: role === opt.key ? "#fff" : colors.text,
                    fontSize: 12,
                  }}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            title={loading ? "Enviando..." : "Cadastrar"}
            onPress={handleRegister}
          />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: spacing.md }}
          >
            <Text style={{ textAlign: "center", color: colors.muted }}>
              Voltar para login
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    </Screen>
  );
}
