import {
   View,
   Text,
   TouchableOpacity,
   ScrollView,
   RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { getPendingArticles } from "../Helpers/dbFunctions";

const Articleapprove = ({ route }) => {
   const navigation = useNavigation();
   const { token } = route.params;
   console.log(token);
   const [articles, setArticles] = useState([]);
   const [refreshing, setRefreshing] = useState(false);

   const fetchData = async () => {
      const data = await getPendingArticles();
      console.log("data", data);
      if (data.length > 0) {
         setArticles(data);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   const onRefresh = async () => {
      setRefreshing(true);
      await fetchData();
      setRefreshing(false);
   };

   return (
      <SafeAreaView className="w-full h-full">
         <ScrollView
            refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
         >
            <View className="w-screen h-screen">
               <View className="mt-5 mb-5 ml-5">
                  <Text className="text-2xl font-extrabold">
                     Pending articles
                  </Text>
               </View>
               {articles.length === 0 && (
                  <View className="items-center">
                     <Text className="text-lg">No pending articles..!</Text>
                  </View>
               )}

               {articles.length > 0 &&
                  articles.map((article, index) => (
                     <Card
                        article={article}
                        key={index}
                        approvebtn={true}
                        token={token}
                     />
                  ))}
               <View className="absolute bottom-0 justify-center items-center w-full p-2">
                  <TouchableOpacity
                     onPress={() => navigation.goBack()}
                     className="w-full h-12 rounded-lg p-2 m-1 justify-center items-center bg-rose-400"
                  >
                     <Text className="text-white text-lg">Back</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </ScrollView>
      </SafeAreaView>
   );
};

export default Articleapprove;
