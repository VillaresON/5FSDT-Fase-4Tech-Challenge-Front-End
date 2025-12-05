import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage("Preencha todos os campos!");
            return;
        }

        const success = await login(email, password);

        if (!success) {
            setErrorMessage("Email ou senha incorretos!");
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Login</Text>

            {errorMessage !== "" && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#333",
    },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        width: "100%",
        padding: 15,
        backgroundColor: "#0A84FF",
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        fontSize: 15,
    },
});
