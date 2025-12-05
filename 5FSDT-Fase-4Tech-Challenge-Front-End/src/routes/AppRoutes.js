import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthRoutes from "./AuthRoutes";
import MainRoutes from "./MainRoutes";
import { ActivityIndicator, View } from "react-native";

export default function AppRoutes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <MainRoutes /> : <AuthRoutes />;
}
