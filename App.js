import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./Screens/Welcome";
import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import Home from "./Screens/Home";
import CreateArticle from "./components/CreateArticle";
import Articleapprove from "./Screens/Articleapprove";
const Stack = createNativeStackNavigator();
export default function App() {
   return (
      <NavigationContainer>
         <Stack.Navigator initialRouteName="First">
            <Stack.Screen
               name="First"
               component={Welcome}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="Signup"
               component={Signup}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="Login"
               component={Login}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="Home"
               component={Home}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="CreateArticle"
               component={CreateArticle}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="Articleapprove"
               component={Articleapprove}
               options={{ headerShown: false }}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}
