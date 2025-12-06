
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({ baseURL:"http://192.168.1.13:3000" });

api.interceptors.request.use(async c=>{
 const t=await AsyncStorage.getItem("token");
 if(t) c.headers.Authorization=`Bearer ${t}`;
 return c;
});
export default api;
