import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext.js";

// Telas públicas
import LoginScreen from "../screens/LoginScreen.js";

// Telas privadas
import PostListScreen from "../screens/Posts/PostsListScreen.js";
import PostReadScreen from "../screens/Posts/PostReadScreen.js";
import PostCreateScreen from "../screens/Posts/PostCreateScreen.js";
import PostEditScreen from "../screens/Posts/PostEditScreen.js";

import TeacherListScreen from "../screens/Teachers/TeacherList.js";
import TeacherCreateScreen from "../screens/Teachers/TeacherCreate.js";
import TeacherEditScreen from "../screens/Teachers/TeacherEdit.js";

import StudentListScreen from "../screens/Students/StudentList.js";
import StudentCreateScreen from "../screens/Students/StudentCreate.js";
import StudentEditScreen from "../screens/Students/StudentEdit.js";

import AdminPostsScreen from "../screens/Admin/AdminPostsScreen.js";

const Stack = createNativeStackNavigator();

export default function Routes() {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
        return null; // aqui pode colocar uma splash screen
    }

    return (
        <Stack.Navigator>

            {/* ROTAS PÚBLICAS */}
            {!authenticated ? (
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
            ) : (
                <>
                    {/* ROTAS PRIVADAS */}

                    <Stack.Screen
                        name="PostList"
                        component={PostListScreen}
                        options={{ title: "Posts" }}
                    />

                    <Stack.Screen
                        name="PostRead"
                        component={PostReadScreen}
                        options={{ title: "Ler Postagem" }}
                    />

                    <Stack.Screen
                        name="PostCreate"
                        component={PostCreateScreen}
                        options={{ title: "Criar Postagem" }}
                    />

                    <Stack.Screen
                        name="PostEdit"
                        component={PostEditScreen}
                        options={{ title: "Editar Postagem" }}
                    />

                    {/* PROFESSORES */}
                    <Stack.Screen
                        name="TeacherList"
                        component={TeacherListScreen}
                        options={{ title: "Professores" }}
                    />

                    <Stack.Screen
                        name="TeacherCreate"
                        component={TeacherCreateScreen}
                        options={{ title: "Criar Professor" }}
                    />

                    <Stack.Screen
                        name="TeacherEdit"
                        component={TeacherEditScreen}
                        options={{ title: "Editar Professor" }}
                    />

                    {/* ESTUDANTES */}
                    <Stack.Screen
                        name="StudentList"
                        component={StudentListScreen}
                        options={{ title: "Alunos" }}
                    />

                    <Stack.Screen
                        name="StudentCreate"
                        component={StudentCreateScreen}
                        options={{ title: "Criar Aluno" }}
                    />

                    <Stack.Screen
                        name="StudentEdit"
                        component={StudentEditScreen}
                        options={{ title: "Editar Aluno" }}
                    />

                    {/* ADMIN */}
                    <Stack.Screen
                        name="AdminPosts"
                        component={AdminPostsScreen}
                        options={{ title: "Admin Posts" }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}
