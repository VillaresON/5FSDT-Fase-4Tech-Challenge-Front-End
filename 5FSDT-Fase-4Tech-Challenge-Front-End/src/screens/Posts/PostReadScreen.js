import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Button,
    StyleSheet,
    Alert,
} from "react-native";
import api from "../../services/api";

export default function PostReadScreen({ route, navigation }) {
    const { id } = route.params;
    const [post, setPost] = useState(null);

    const loadPost = async () => {
        try {
            const response = await api.get(`/posts/${id}`);
            setPost(response.data);
        } catch (err) {
            console.log("Erro ao carregar post:", err);
        }
    };

    useEffect(() => {
        loadPost();
    }, []);

    const handleDelete = () => {
        Alert.alert("Confirmação", "Deseja realmente excluir este post?", [
            { text: "Cancelar" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: async () => {
                    try {
                        await api.delete(`/posts/${id}`);
                        navigation.goBack();
                    } catch (err) {
                        console.log("Erro ao excluir post:", err);
                    }
                },
            },
        ]);
    };

    if (!post) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.author}>Autor: {post.author}</Text>
            <Text style={styles.date}>
                Criado em: {new Date(post.createdAt).toLocaleString()}
            </Text>

            <Text style={styles.content}>{post.content}</Text>

            <View style={styles.buttonContainer}>
                <Button
                    title="Editar"
                    onPress={() => navigation.navigate("PostEdit", { post })}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Excluir" color="red" onPress={handleDelete} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
    },
    author: {
        fontSize: 16,
        color: "#555",
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: "#888",
        marginBottom: 15,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    buttonContainer: {
        marginVertical: 5,
    },
});
