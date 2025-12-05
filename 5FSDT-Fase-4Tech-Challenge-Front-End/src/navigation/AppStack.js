import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostsList from '../screens/posts/PostsListScreen';
import PostView from '../screens/posts/PostView';
import PostCreate from '../screens/posts/PostCreateScreen';
import PostEdit from '../screens/posts/PostEditScreen';

import TeachersList from '../screens/teachers/TeachersList';
import TeacherCreate from '../screens/teachers/TeacherCreate';
import TeacherEdit from '../screens/teachers/TeacherEdit';

import StudentsList from '../screens/students/StudentsList';
import StudentCreate from '../screens/students/StudentCreate';
import StudentEdit from '../screens/students/StudentEdit';

import AdminDashboard from '../screens/AdminDashboard';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Posts" component={PostsList} />
      <Stack.Screen name="PostView" component={PostView} />
      <Stack.Screen name="PostCreate" component={PostCreate} />
      <Stack.Screen name="PostEdit" component={PostEdit} />

      <Stack.Screen name="Teachers" component={TeachersList} />
      <Stack.Screen name="TeacherCreate" component={TeacherCreate} />
      <Stack.Screen name="TeacherEdit" component={TeacherEdit} />

      <Stack.Screen name="Students" component={StudentsList} />
      <Stack.Screen name="StudentCreate" component={StudentCreate} />
      <Stack.Screen name="StudentEdit" component={StudentEdit} />

      <Stack.Screen name="Admin" component={AdminDashboard} />
    </Stack.Navigator>
  );
}
