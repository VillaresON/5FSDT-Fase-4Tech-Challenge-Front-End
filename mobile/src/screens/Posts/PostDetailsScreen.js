
import {useEffect,useState} from "react";
import {View,Text} from "react-native";
import api from "../../api/api";
export default ({route})=>{
 const {id}=route.params;
 const [p,setP]=useState(null);
 useEffect(()=>{api.get(`/posts/${id}`).then(r=>setP(r.data));},[]);
 if(!p) return <Text>Carregando...</Text>;
 return(<View><Text>{p.title}</Text><Text>{p.content}</Text></View>);
}
