import {
   View,
   Text,
   TouchableOpacity,
   Linking,
   ImageBackground,
} from "react-native";
import React, { useState } from "react";
import ModalComponent from "./Modal";

const Card = ({ article, approvebtn, token }) => {
   if (article["urlToImage"] == null) {
      article["urlToImage"] =
         "https://c4.wallpaperflare.com/wallpaper/467/417/159/dark-blue-wallpaper-preview.jpg";
   }
   const [modalVisible, setModalVisible] = useState(false);
   console.log(article);
   return (
      <View className="bg-blue-400 w-screen rounded-md mt-5 ">
         <View className="w-screen h-32  m-2 rounded-3xl p-4 ">
            <View className="flex flex-row gap-10 justify-between">
               <Text className="text-white">By:{article["username"]}</Text>
               <Text className="text-white">
                  Created:
                  {new Date(article.createdAt).toLocaleString()}
               </Text>
            </View>
            <View className="m-1 p-1">
               <Text className="text-xl text-white">
                  {article["article_title"]}
               </Text>
            </View>
            <View className="absolute bottom-3 right-10 w-32 ">
               <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  className="bg-rose-400 h-8 rounded-sm  justify-center items-center "
               >
                  <Text className="text-white text-lg">See more</Text>
               </TouchableOpacity>
            </View>
         </View>

         <ModalComponent
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            article={article}
            approvebtn={approvebtn}
            token={token}
         />
      </View>
   );
};

export default Card;
