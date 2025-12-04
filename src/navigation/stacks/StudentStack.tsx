// src/navigation/stacks/StudentStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/Home/HomeScreen";
import PostListScreen from "../../screens/Posts/PostListScreen";
import PostDetailsScreen from "../../screens/Posts/PostDetailsScreen";

export type StudentStackParamList = {
  Home: undefined;
  PostList: undefined;
  PostDetails: { post: any };
};

const Stack = createNativeStackNavigator<StudentStackParamList>();

export default function StudentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
      <Stack.Screen name="PostList" component={PostListScreen} options={{ title: "Posts" }} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{ title: "Detalhes" }} />
    </Stack.Navigator>
  );
}
