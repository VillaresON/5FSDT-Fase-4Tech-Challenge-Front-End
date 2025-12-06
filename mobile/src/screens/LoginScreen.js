
import {useContext,useState} from "react";
import {View,TextInput,Button} from "react-native";
import {AuthContext} from "../context/AuthContext";
export default ()=>{
 const {login}=useContext(AuthContext);
 const [e,setE]=useState("admin@admin.com");
 const [p,setP]=useState("admin123");
 return(<View style={{padding:20}}>
  <TextInput value={e} onChangeText={setE}/>
  <TextInput value={p} onChangeText={setP} secureTextEntry/>
  <Button title="Login" onPress={()=>login(e,p)}/>
 </View>);
}
