import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../styles/theme";

export default function Screen({ children }) {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top", "bottom"]} // respeita status bar e barra de navegação
    >
      <View style={{ flex: 1, padding: spacing.md }}>
        {children}
      </View>
    </SafeAreaView>
  );
}
