import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PostListScreen from "../screens/Posts/PostListScreen";
import PostDetailsScreen from "../screens/Posts/PostDetailsScreen";
import PostCreateScreen from "../screens/Posts/PostCreateScreen";
import PostEditScreen from "../screens/Posts/PostEditScreen";

import TeacherListScreen from "../screens/Teachers/TeacherListScreen";
import TeacherCreateScreen from "../screens/Teachers/TeacherCreateScreen";
import TeacherEditScreen from "../screens/Teachers/TeacherEditScreen";

import StudentListScreen from "../screens/Students/StudentListScreen";
import StudentCreateScreen from "../screens/Students/StudentCreateScreen";
import StudentEditScreen from "../screens/Students/StudentEditScreen";

import AdminScreen from "../screens/AdminScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PostList" component={PostListScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
      <Stack.Screen name="PostCreate" component={PostCreateScreen} />
      <Stack.Screen name="PostEdit" component={PostEditScreen} />

      <Stack.Screen name="Teachers" component={TeacherListScreen} />
      <Stack.Screen name="TeacherCreate" component={TeacherCreateScreen} />
      <Stack.Screen name="TeacherEdit" component={TeacherEditScreen} />

      <Stack.Screen name="Students" component={StudentListScreen} />
      <Stack.Screen name="StudentCreate" component={StudentCreateScreen} />
      <Stack.Screen name="StudentEdit" component={StudentEditScreen} />

      <Stack.Screen name="Admin" component={AdminScreen} />
    </Stack.Navigator>
  );
}
