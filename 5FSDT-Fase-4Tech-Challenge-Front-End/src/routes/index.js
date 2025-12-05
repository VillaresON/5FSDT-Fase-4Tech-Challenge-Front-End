import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

// Telas
import LoginScreen from "../screens/LoginScreen";
import PostListScreen from "../screens/Posts/PostsListScreen";
import PostReadScreen from "../screens/Posts/PostReadScreen";
import PostCreateScreen from "../screens/Posts/PostCreateScreen";
import PostEditScreen from "../screens/Posts/PostEditScreen";
import TeacherListScreen from "../screens/Teachers/TeacherList";
import TeacherCreateScreen from "../screens/Teachers/TeacherCreate";
import TeacherEditScreen from "../screens/Teachers/TeacherEdit";
import StudentListScreen from "../screens/Students/StudentList";
import StudentCreateScreen from "../screens/Students/StudentCreate";
import StudentEditScreen from "../screens/Students/StudentEdit";
import AdminPostsScreen from "../screens/Admin/AdminPostsScreen";
import CustomHeader from "../components/CustomHeader";

const Stack = createNativeStackNavigator();

export default function Routes() {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) return null; // Pode colocar uma splash screen aqui

    return (
        <Stack.Navigator>
            {/* Rota pública */}
            {!authenticated ? (
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
            ) : (
                <>
                    {/* ROTAS DE POSTS */}
                    <Stack.Screen
                        name="PostList"
                        component={PostListScreen}
                        options={{
                            headerShown: true,
                            header: () => <CustomHeader title="Posts" />
                        }}
                    />
                    <Stack.Screen
                        name="PostRead"
                        component={PostReadScreen}
                        options={{
                            headerShown: true,
                            header: () => <CustomHeader title="Ler Postagem" />
                        }}
                    />
                    <Stack.Screen
                        name="PostCreate"
                        component={PostCreateScreen}
                        options={{
                            headerShown: true,
                            header: () => <CustomHeader title="Criar Postagem" />
                        }}
                    />
                    <Stack.Screen
                        name="PostEdit"
                        component={PostEditScreen}
                        options={{
                            headerShown: true,
                            header: () => <CustomHeader title="Editar Postagem" />
                        }}
                    />

                    {/* ROTAS DE PROFESSORES */}
                    <Stack.Screen
                        name="TeacherList"
                        component={TeacherListScreen}
                        options={{
                            headerShown: true,
                            header: () => <CustomHeader title="Professores" />
                        }}
                    />
                    <Stack.Screen
                        name="TeacherCreate"
                        component={TeacherCreateScreen}
                        options={{
                            headerShown: true,
                            header: () => <CustomHeader title="Criar Professor" />
                        }}
                    />
                    <Stack.Screen
                        name="TeacherEdit"
                        component={TeacherEditScreen}
                        options={{
                            headerShown: true,
                            header: () => <CustomHeader title="Editar Professor" />
                        }}
                    />

                    {/* ROTAS DE ESTUDANTES */}
                    <Stack.Screen
                        name="StudentList"
                        component={StudentListScreen}
                        options={{
                            headerShown: true,
                            header: () => <CustomHeader title="Alunos" />
                        }}
                    />
                    <Stack.Screen
                        name="StudentCreate"
                        component={StudentCreateScreen}
                        options={{
                            headerShown: true,
                            header: () => <CustomHeader title="Criar Aluno" />
                        }}
                    />
                    <Stack.Screen
                        name="StudentEdit"
                        component={StudentEditScreen}
                        options={{
                            headerShown: true,
                            header: () => <CustomHeader title="Editar Aluno" />
                        }}
                    />

                    {/* ADMIN */}
                    <Stack.Screen
                        name="AdminPosts"
                        component={AdminPostsScreen}
                        options={{
                            headerShown: true,
                            header: () => <CustomHeader title="Admin Posts" />
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}
