// App.tsx
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/context/AuthContext";
import RoleBasedNavigator from "./src/navigation/RoleBasedNavigator";

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <RoleBasedNavigator />
      </AuthProvider>
    </PaperProvider>
  );
}
