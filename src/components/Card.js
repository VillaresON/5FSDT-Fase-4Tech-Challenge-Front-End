import { View } from "react-native";
import { colors, spacing } from "../styles/theme";

export default function Card({ children, style }) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          padding: spacing.md,
          borderRadius: 10,
          marginBottom: spacing.sm,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
