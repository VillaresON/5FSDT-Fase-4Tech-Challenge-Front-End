import { useContext } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { colors, spacing } from "../styles/theme";

export default function MainMenu({ navigation }) {
    const { isStudent, isTeacher, isAdmin } = useContext(AuthContext);

    return (
        <View style={{ marginTop: spacing.md }}>

            {/* 👨‍🎓 ALUNO */}
            {isStudent && (
                <MenuButton
                    label="Ver Postagens"
                    onPress={() => navigation.navigate("PostList")}
                />
            )}

            {/* 👨‍🏫 PROFESSOR */}
            {(isTeacher || isAdmin) && (
                <>
                    <MenuButton
                        label="+ Novo Post"
                        color={colors.primary}
                        onPress={() => navigation.navigate("PostCreate")}
                    />

                    <MenuButton
                        label="Gerenciar Alunos"
                        color="#4b5563"
                        onPress={() => navigation.navigate("Students")}
                    />
                </>
            )}

            {/* 👑 ADMIN */}
            {isAdmin && (
                <>
                    <MenuButton
                        label="Gerenciar Professores/Admins"
                        color="#0f766e"
                        onPress={() => navigation.navigate("Teachers")}
                    />

                    <MenuButton
                        label="Administração de Posts"
                        color="#6d28d9"
                        onPress={() => navigation.navigate("Admin")}
                    />
                </>
            )}
        </View>
    );
}

function MenuButton({ label, onPress, color }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: color || "#374151",
                padding: 12,
                borderRadius: 8,
                marginBottom: spacing.sm,
            }}
        >
            <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}
