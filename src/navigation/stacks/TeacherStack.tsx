// src/navigation/stacks/TeacherStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/Home/HomeScreen";
import PostListScreen from "../../screens/Posts/PostListScreen";
import PostDetailsScreen from "../../screens/Posts/PostDetailsScreen";
import CreatePostScreen from "../../screens/Posts/CreatePostScreen";
import EditPostScreen from "../../screens/Posts/EditPostScreen";

import StudentListScreen from "../../screens/Students/StudentListScreen";

export type TeacherStackParamList = {
  Home: undefined;
  PostList: undefined;
  PostDetails: { post: any };
  CreatePost: undefined;
  EditPost: { post: any };
  StudentList: undefined;
};

const Stack = createNativeStackNavigator<TeacherStackParamList>();

export default function TeacherStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
      <Stack.Screen name="PostList" component={PostListScreen} options={{ title: "Posts" }} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{ title: "Detalhes" }} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: "Criar Post" }} />
      <Stack.Screen name="EditPost" component={EditPostScreen} options={{ title: "Editar Post" }} />
      <Stack.Screen name="StudentList" component={StudentListScreen} options={{ title: "Estudantes" }} />
    </Stack.Navigator>
  );
}
