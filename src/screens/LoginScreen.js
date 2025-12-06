import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import Card from "../components/Card";
import { AuthContext } from "../context/AuthContext";
import { colors, spacing } from "../styles/theme";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();

  const [tab, setTab] = useState("teacher"); // teacher | student
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email) {
      Alert.alert("Atenção", "Informe o e-mail");
      return;
    }

    if (tab === "teacher" && !password) {
      Alert.alert("Atenção", "Informe a senha");
      return;
    }

    try {
      setLoading(true);

      if (tab === "student") {
        // ✅ PASSA PARÂMETROS CORRETAMENTE
        await login(email, null, "student");
      }

      if (tab === "teacher") {
        await login(email, password, "teacher");
      }

    } catch (err) {
      Alert.alert(
        "Erro",
        err.response?.data?.error || "Falha no login"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <Screen>
          <Card>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                marginBottom: spacing.md,
                textAlign: "center",
              }}
            >
              Login
            </Text>

            {/* Tabs */}
            <View
              style={{
                flexDirection: "row",
                marginBottom: spacing.md,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {[
                { key: "teacher", label: "Professor / Admin" },
                { key: "student", label: "Sou Aluno" },
              ].map((t) => (
                <TouchableOpacity
                  key={t.key}
                  onPress={() => {
                    setTab(t.key);
                    setPassword("");
                  }}
                  style={{
                    flex: 1,
                    padding: 12,
                    backgroundColor:
                      tab === t.key ? colors.primary : "#eee",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: tab === t.key ? "#fff" : "#000",
                      fontWeight: "600",
                    }}
                  >
                    {t.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

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

            {tab === "teacher" && (
              <>
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
                    marginBottom: spacing.md,
                  }}
                />
              </>
            )}

            <Button
              title={loading ? "Entrando..." : "Entrar"}
              onPress={handleLogin}
              disabled={loading}
            />

            {tab === "teacher" && (
              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                style={{ marginTop: spacing.md }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.primary,
                    fontWeight: "600",
                  }}
                >
                  Criar conta (Professor / Admin)
                </Text>
              </TouchableOpacity>
            )}
          </Card>
        </Screen>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
