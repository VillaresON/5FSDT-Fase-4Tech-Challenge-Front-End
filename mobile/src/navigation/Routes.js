
import {useContext} from "react";
import {ActivityIndicator,View} from "react-native";
import {AuthContext} from "../context/AuthContext";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

export default function Routes(){
 const {user,loading}=useContext(AuthContext);
 if(loading) return <View style={{flex:1,justifyContent:"center"}}><ActivityIndicator/></View>;
 return user ? <AppStack/> : <AuthStack/>;
}
