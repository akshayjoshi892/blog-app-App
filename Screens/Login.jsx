import React, { useState, useEffect } from "react";
import {
   View,
   TextInput,
   Button,
   ImageBackground,
   StyleSheet,
   TouchableOpacity,
   Text,
   Alert,
   Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
   const navigation = useNavigation();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [userType, setUserType] = useState("user"); // Default user type is 'user'
   const [token, setToken] = useState("");

   useEffect(() => {
      const loadStoredData = async () => {
         try {
            const storedEmail = await AsyncStorage.getItem("email");
            const storedPassword = await AsyncStorage.getItem("password");
            if (storedEmail) setEmail(storedEmail);
            if (storedPassword) setPassword(password);
         } catch (error) {
            console.error("Failed to load data from AsyncStorage", error);
         }
      };

      loadStoredData();
   }, []);

   const handleLogin = async () => {
      try {
         const response = await axios.post(
            "http://192.168.13.176:4000/api/v1/auth/login",
            {
               email,
               password,
            }
         );

         if (response.status === 200) {
            console.log("Login successful:", response.data);
            const { user } = response.data;
            const { username, role, token } = user;
            console.log(username, role);
            setToken(token);

            // Store email and username in AsyncStorage
            await AsyncStorage.setItem("email", email);
            await AsyncStorage.setItem("password", password);

            navigation.navigate("Home", { username, role, token });
            setEmail("");
            setPassword("");
            setUserType("user");
         } else {
            console.error("Login failed:", response.data);
         }
      } catch (error) {
         console.error("Error:", error);
      }
   };

   return (
      <SafeAreaView className="bg-white h-full">
         <Image
            source={require("../assets/login.png")}
            className="w-full h-3/6"
         />
         <View className="m-2 p-1 justify-center items-center">
            <Text className="m-3 text-3xl font-extrabold">Login</Text>
            <TextInput
               className="m-1 border-2 border-gray-500 rounded-lg w-full p-2 text-lg"
               onChangeText={(text) => setEmail(text)}
               value={email}
               placeholder="Email"
               keyboardType="email-address"
               autoCapitalize="none"
            />
            <TextInput
               className="m-1 border-2 border-gray-500 rounded-lg w-full p-2 text-lg"
               onChangeText={(text) => setPassword(text)}
               value={password}
               placeholder="Password"
               secureTextEntry={true}
            />

            <TouchableOpacity
               className="w-full h-12 rounded-lg p-2 m-1 justify-center items-center bg-blue-500"
               onPress={handleLogin}
            >
               <Text className="text-lg text-white">Login</Text>
            </TouchableOpacity>
            <View className="flex-row w-full gap-2  right-2 mt-1 ml-2 items-center">
               <Text className="text-lg ml-1">Not a user?</Text>
               <TouchableOpacity
                  className="bg-rose-500 p-2 rounded-lg  "
                  onPress={() => navigation.navigate("Signup")}
               >
                  <Text className="text-white text-lg">Signup</Text>
               </TouchableOpacity>
            </View>
         </View>
      </SafeAreaView>
   );
};

export default Login;
