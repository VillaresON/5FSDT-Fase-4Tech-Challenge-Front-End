// src/screens/Home/HomeScreen.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Bem-vindo {user?.name}!
      </Text>

      <Text>Seu papel: {user?.role}</Text>

      <View style={{ height: 20 }} />

      <Button title="Sair" onPress={logout} />
    </View>
  );
}
