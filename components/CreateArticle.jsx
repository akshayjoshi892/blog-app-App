import React, { useState } from "react";
import {
   View,
   TextInput,
   Button,
   StyleSheet,
   Alert,
   Text,
   TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const CreateArticle = ({ route }) => {
   const [articleName, setArticleName] = useState("");
   const [articleTitle, setArticleTitle] = useState("");
   const [articleDescription, setArticleDescription] = useState("");
   const navigation = useNavigation();
   const { username } = route.params;

   const handleSaveArticle = () => {

      const URL = "http://192.168.13.176:4000/api/v1/articles/create";
      console.log("Article Name:", articleName);
      console.log("Article Title:", articleTitle);
      console.log("Article Description:", articleDescription);

      if (!articleName || !articleTitle || !articleDescription) {
         Alert.alert("Error", "Please fill all the fields");
         return;
      }

      const articleData = {
         username: username,
         article_name: articleName,
         article_title: articleTitle,
         article_desc: articleDescription,
         publish: false, 
      };

    
      axios
         .post(URL, articleData)
         .then((response) => {
            console.log("Article saved successfully:", response.data);
         
            setArticleName("");
            setArticleTitle("");
            setArticleDescription("");
            Alert.alert("Created successfully, waiting for approval!!");
         })
         .catch((error) => {
            console.error("Error saving article:", error);
            
         });
   };

   return (
      <View style={styles.container} className="bg-gray-100">
         <View className="mb-6">
            <Text className="text-2xl text-text_color font-extrabold">
               Create articles
            </Text>
         </View>
         <TextInput
            className="m-1 border-2 border-gray-500 rounded-lg w-full p-2 text-lg"
            value={articleName}
            onChangeText={setArticleName}
            placeholder="Enter Article category/related to"
         />
         <TextInput
            className="m-1 border-2 border-gray-500 rounded-lg w-full p-2 text-lg"
            value={articleTitle}
            onChangeText={setArticleTitle}
            placeholder="Enter Article Title"
         />
         <TextInput
            className="m-1 border-2 border-gray-500 rounded-lg w-full h-24 justify-start p-2 text-lg"
            value={articleDescription}
            onChangeText={setArticleDescription}
            placeholder="Enter Article Description"
            multiline
         />
         <View className="w-full">
            <TouchableOpacity
               className="w-full h-12 rounded-lg p-2 m-1 justify-center items-center bg-bg_btn"
               onPress={handleSaveArticle}
            >
               <Text className="text-white text-lg">Create Article</Text>
            </TouchableOpacity>
            <TouchableOpacity
               className="w-full h-12 rounded-lg p-2 m-1 justify-center items-center bg-rose-400"
               onPress={() => navigation.goBack()}
            >
               <Text className="text-white text-lg">Back</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
   },
   input: {
      height: 40,
      width: "100%",
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      borderRadius: 8,
   },
   descriptionInput: {
      height: 100,
   },
});

export default CreateArticle;
