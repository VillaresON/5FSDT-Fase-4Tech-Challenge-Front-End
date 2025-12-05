import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostsList from "../screens/posts/PostsListScreen";
import PostCreate from "../screens/posts/PostCreateScreen";
import PostEdit from "../screens/posts/PostEditScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TeacherList from "../screens/Teachers/TeacherList";
import TeacherCreate from "../screens/Teachers/TeacherCreate";
import TeacherEdit from "../screens/Teachers/TeacherEdit";

import StudentList from "../screens/Students/StudentList";
import StudentCreate from "../screens/Students/StudentCreate";
import StudentEdit from "../screens/Students/StudentEdit";


import TeachersScreen from "../screens/Teachers/TeacherList";
import StudentsScreen from "../screens/Students/StudentList";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PostsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PostsList" component={PostsList} options={{ title: "Posts" }} />
            <Stack.Screen name="PostCreate" component={PostCreate} options={{ title: "Criar Post" }} />
            <Stack.Screen name="PostEdit" component={PostEdit} options={{ title: "Editar Post" }} />
        </Stack.Navigator>
    );
}

function TeachersStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TeacherList" component={TeacherList} options={{ title: "Professores" }} />
            <Stack.Screen name="TeacherCreate" component={TeacherCreate} options={{ title: "Novo Professor" }} />
            <Stack.Screen name="TeacherEdit" component={TeacherEdit} options={{ title: "Editar Professor" }} />
        </Stack.Navigator>
    );
}

function StudentsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="StudentList" component={StudentList} options={{ title: "Estudantes" }} />
            <Stack.Screen name="StudentCreate" component={StudentCreate} options={{ title: "Novo Estudante" }} />
            <Stack.Screen name="StudentEdit" component={StudentEdit} options={{ title: "Editar Estudante" }} />
        </Stack.Navigator>
    );
}



export default function MainRoutes() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Posts" component={PostsStack} options={{ headerShown: false }} />
            <Tab.Screen name="Teachers" component={TeachersScreen} />
            <Tab.Screen name="Students" component={StudentsScreen} />
            <Tab.Screen name="Teachers" component={TeachersStack} options={{ headerShown: false }} />
            <Tab.Screen name="Students" component={StudentsStack} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}
