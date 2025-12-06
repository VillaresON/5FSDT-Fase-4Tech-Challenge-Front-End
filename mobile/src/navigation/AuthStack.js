
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../screens/LoginScreen";
const S=createNativeStackNavigator();
export default ()=> (<S.Navigator><S.Screen name="Login" component={Login}/></S.Navigator>);
