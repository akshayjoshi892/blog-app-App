import {
   View,
   Text,
   TouchableOpacity,
   ScrollView,
   RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Card from "../components/Card";

const Home = ({ route }) => {
   const { username, role, token } = route.params;
   const navigation = useNavigation();
   const [articles, setArticles] = useState([]);
   const [refreshing, setRefreshing] = useState(false);

   const fetchArticles = async () => {
      try {
         const response = await axios.get(
            "http://192.168.13.176:4000/api/v1/articles/get-articles"
         );
         if (response.status === 200) {
            console.log(response.data);
            setArticles(response.data);
         }
      } catch (error) {
         console.error("Error fetching articles:", error);
      }
   };

   useEffect(() => {
      fetchArticles();
   }, []);

   const onRefresh = async () => {
      setRefreshing(true);
      await fetchArticles();
      setRefreshing(false);
   };

   return (
      <SafeAreaView className="bg-gray-100">
         <ScrollView
            refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
         >
            <View className="w-screen h-screen">
               <View className="mt-5 ml-4">
                  <Text className="text-3xl text-text_color font-extrabold">
                     Articles
                  </Text>
               </View>
               {role === "admin" && (
                  <View className="absolute right-4 mb-5 mt-5">
                     <TouchableOpacity
                        onPress={() =>
                           navigation.navigate("Articleapprove", {
                              token: token,
                           })
                        }
                        className="w-24 h-12 bg-bg_btn justify-center items-center rounded-xl"
                     >
                        <Text className="text-white text-lg">Approve</Text>
                     </TouchableOpacity>
                  </View>
               )}
               <View className="mt-1 relative">
                  {articles.map((article, index) => (
                     <Card article={article} key={index} />
                  ))}
               </View>
               <View className="absolute bottom-8 right-2">
                  <TouchableOpacity
                     onPress={() =>
                        navigation.navigate("CreateArticle", {
                           username: username,
                        })
                     }
                     className="w-20 h-12 bg-bg_btn justify-center items-center rounded-lg"
                  >
                     <Text className="text-xl text-white">+</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </ScrollView>
      </SafeAreaView>
   );
};

export default Home;
