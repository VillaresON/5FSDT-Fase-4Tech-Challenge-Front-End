// src/navigation/stacks/AdminStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/Home/HomeScreen";
import PostListScreen from "../../screens/Posts/PostListScreen";
import PostDetailsScreen from "../../screens/Posts/PostDetailsScreen";
import CreatePostScreen from "../../screens/Posts/CreatePostScreen";
import EditPostScreen from "../../screens/Posts/EditPostScreen";

import TeacherListScreen from "../../screens/Teachers/TeacherListScreen";
import CreateTeacherScreen from "../../screens/Teachers/CreateTeacherScreen";
import EditTeacherScreen from "../../screens/Teachers/EditTeacherScreen";

import StudentListScreen from "../../screens/Students/StudentListScreen";
import CreateStudentScreen from "../../screens/Students/CreateStudentScreen";
import EditStudentScreen from "../../screens/Students/EditStudentScreen";

import AdminScreen from "../../screens/Admin/AdminScreen";

export type AdminStackParamList = {
  Home: undefined;
  PostList: undefined;
  PostDetails: { post: any };
  CreatePost: undefined;
  EditPost: { post: any };
  TeacherList: undefined;
  CreateTeacher: undefined;
  EditTeacher: { teacher: any };
  StudentList: undefined;
  CreateStudent: undefined;
  EditStudent: { student: any };
  Admin: undefined;
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

export default function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
      <Stack.Screen name="PostList" component={PostListScreen} options={{ title: "Posts" }} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{ title: "Detalhes" }} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: "Criar Post" }} />
      <Stack.Screen name="EditPost" component={EditPostScreen} options={{ title: "Editar Post" }} />

      <Stack.Screen name="TeacherList" component={TeacherListScreen} options={{ title: "Professores" }} />
      <Stack.Screen name="CreateTeacher" component={CreateTeacherScreen} options={{ title: "Novo Professor" }} />
      <Stack.Screen name="EditTeacher" component={EditTeacherScreen} options={{ title: "Editar Professor" }} />

      <Stack.Screen name="StudentList" component={StudentListScreen} options={{ title: "Estudantes" }} />
      <Stack.Screen name="CreateStudent" component={CreateStudentScreen} options={{ title: "Novo Estudante" }} />
      <Stack.Screen name="EditStudent" component={EditStudentScreen} options={{ title: "Editar Estudante" }} />

      <Stack.Screen name="Admin" component={AdminScreen} options={{ title: "Painel Administrativo" }} />
    </Stack.Navigator>
  );
}
