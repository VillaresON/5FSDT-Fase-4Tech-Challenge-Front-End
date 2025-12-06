
import {useEffect,useState} from "react";
import {View,Text,TouchableOpacity,FlatList} from "react-native";
import api from "../../api/api";
export default ({navigation})=>{
 const [p,setP]=useState([]);
 useEffect(()=>{api.get("/posts").then(r=>setP(r.data.data));},[]);
 return(<FlatList data={p} keyExtractor={i=>i.id.toString()}
  renderItem={({item})=>(<TouchableOpacity onPress={()=>navigation.navigate("Details",{id:item.id})}>
   <View style={{padding:12,borderWidth:1}}>
    <Text>{item.title}</Text>
   </View>
  </TouchableOpacity>)} />);
}
