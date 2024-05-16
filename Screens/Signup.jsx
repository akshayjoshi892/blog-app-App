import React, { useState } from "react";
import {
   View,
   TextInput,
   Button,
   StyleSheet,
   TouchableOpacity,
   Text,
   Alert,
   Image,
   KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Signup = () => {
   const navigation = useNavigation();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [username, setName] = useState("");
   const [role, setUserType] = useState("user"); // Default user type is 'user'

   const handleSignup = async () => {
      try {
         const response = await axios.post(
            "http://192.168.13.176:4000/api/v1/auth/register",
            {
               username,
               email,
               password,
               role,
            }
         );
         if (response.status == 200) {
            Alert.alert("Register successful");
            navigation.navigate("Login");
         }

         console.log(response.data); // Log the response from the backend
         // Reset form after signup
         setEmail("");
         setPassword("");
         setName("");
         setUserType("user");
      } catch (error) {
         console.error("Error:", error);
      }
   };

   return (
      <KeyboardAvoidingView
         behavior="padding"
         keyboardVerticalOffset={100}
         className=""
      >
         <SafeAreaView className="">
            <Image
               source={require("../assets/login.png")}
               className="w-full h-80"
            />
            <View className="m-2 p-1 justify-center items-center">
               <Text className="m-3 text-3xl font-extrabold">Signup</Text>
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
               <TextInput
                  className="m-1 border-2 border-gray-500 rounded-lg w-full p-2 text-lg"
                  onChangeText={(text) => setName(text)}
                  value={username}
                  placeholder="Name"
                  autoCapitalize="words"
               />
               <View style={styles.radioContainer}>
                  <Text style={styles.radioLabel}>User Type:</Text>
                  <View style={styles.radioGroup}>
                     <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setUserType("user")}
                     >
                        <View
                           style={[
                              styles.radioOuter,
                              role === "user" && styles.radioSelected,
                           ]}
                        >
                           {role === "user" && (
                              <View style={styles.radioInner} />
                           )}
                        </View>
                        <Text>User</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setUserType("admin")}
                     >
                        <View
                           style={[
                              styles.radioOuter,
                              role === "admin" && styles.radioSelected,
                           ]}
                        >
                           {role === "admin" && (
                              <View style={styles.radioInner} />
                           )}
                        </View>
                        <Text>Admin</Text>
                     </TouchableOpacity>
                  </View>
               </View>

               <TouchableOpacity
                  onPress={handleSignup}
                  className="w-full h-12 rounded-lg p-2 m-1 justify-center items-center bg-blue-500"
               >
                  <Text className="text-lg text-white">Signup</Text>
               </TouchableOpacity>
               <View className="flex-row w-full gap-2  right-2 mt-1 items-center">
                  <Text>Already a user?</Text>
                  <TouchableOpacity
                     onPress={() => navigation.navigate("Login")}
                     className="bg-rose-500 p-2 rounded-lg  "
                  >
                     <Text className="text-white text-lg">Login</Text>
                  </TouchableOpacity>
               </View>
         
            </View>
         </SafeAreaView>
      </KeyboardAvoidingView>
   );
};

const styles = StyleSheet.create({
   radioContainer: {
      marginVertical: 10,
      alignItems: "center",
      flexDirection: "row",
   },
   radioLabel: {
      fontSize: 16,
      marginBottom: 5,
   },
   radioGroup: {
      flexDirection: "row",
      gap: 12,
      width: "60%",
   },
   radioButton: {
      flexDirection: "row",
      alignItems: "center",
   },
   radioOuter: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "gray",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 5,
   },
   radioInner: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: "gray",
   },
   radioSelected: {
      borderColor: "blue",
   },
});

export default Signup;
