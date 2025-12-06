
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PostList from "../screens/Posts/PostListScreen";
import PostDetails from "../screens/Posts/PostDetailsScreen";
const S=createNativeStackNavigator();
export default ()=> (<S.Navigator>
 <S.Screen name="Posts" component={PostList}/>
 <S.Screen name="Details" component={PostDetails}/>
</S.Navigator>);
