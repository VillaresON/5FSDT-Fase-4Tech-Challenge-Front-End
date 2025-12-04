// src/navigation/RoleBasedNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";

import AdminStack from "./stacks/AdminStack";
import TeacherStack from "./stacks/TeacherStack";
import StudentStack from "./stacks/StudentStack";
import AuthStack from "./AuthStack";

export default function RoleBasedNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        user.role === "ADMIN" ? (
          <AdminStack />
        ) : user.role === "TEACHER" ? (
          <TeacherStack />
        ) : (
          <StudentStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
