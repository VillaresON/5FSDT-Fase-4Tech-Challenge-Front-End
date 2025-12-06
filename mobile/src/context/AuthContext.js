
import React,{createContext,useState,useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

export const AuthContext=createContext();

export default function AuthProvider({children}){
 const [user,setUser]=useState(null);
 const [loading,setLoading]=useState(true);

 useEffect(()=>{(async()=>{
  const t=await AsyncStorage.getItem("token");
  const u=await AsyncStorage.getItem("user");
  if(t&&u) setUser(JSON.parse(u));
  setLoading(false);
 })();},[]);

 async function login(email,password){
  const {data}=await api.post("/auth/login",{email,password});
  await AsyncStorage.setItem("token",data.token);
  await AsyncStorage.setItem("user",JSON.stringify(data.user));
  setUser(data.user);
 }

 return(<AuthContext.Provider value={{user,login,loading}}>{children}</AuthContext.Provider>);
}
