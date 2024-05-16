import React, { useState } from "react";
import {
   View,
   Text,
   Modal,
   TouchableOpacity,
   Linking,
   ScrollView,
} from "react-native";
import { handleApprove } from "../Helpers/approve";
const ModalComponent = ({ visible, onClose, article, approvebtn, token }) => {
   const { title, description, from, author, date, url } = article;

   const handlePress = () => {
      if (url) {
         Linking.openURL(url);
      }
   };

   return (
      <Modal
         visible={visible}
         transparent
         animationType="slide"
         onRequestClose={onClose}
      >
         <View
            style={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
               backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
         >
            <View
               style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 10,
                  width: "100%",
                  height: "95%",
                  bottom: 0,
                  position: "absolute",
               }}
            >
               <Text
                  className="text-text_color"
                  style={{
                     fontSize: 25,
                     fontWeight: "bold",
                     marginBottom: 10,
                     marginTop: 15,
                  }}
               >
                  {article["article_title"]}
               </Text>
               <ScrollView>
                  <Text
                     style={{
                        marginBottom: 10,
                        textAlign: "justify",
                        lineHeight: 20,
                        fontSize: 18,
                     }}
                  >
                     {article["article_desc"]}
                  </Text>
               </ScrollView>
               <Text
                  style={{
                     marginBottom: 1,
                     position: "absolute",
                     top: 5,
                     right: 5,
                     padding: 5,
                  }}
               >
                  Created on : {new Date(article.createdAt).toLocaleString()}
               </Text>
            </View>
            <View
               style={{
                  position: "absolute",
                  bottom: 5,
                  width: "95%",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               {approvebtn == true && (
                  <TouchableOpacity
                     onPress={() => handleApprove(article["_id"], token)}
                     className="bg-bg_btn"
                     style={{
                        height: 35,
                        width: "100%",
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                     }}
                  >
                     <Text
                        style={{
                           color: "white",
                           textAlign: "center",
                           fontSize: 16,
                        }}
                     >
                        Approve
                     </Text>
                  </TouchableOpacity>
               )}
               <TouchableOpacity
                  onPress={onClose}
                  className="bg-rose-600"
                  style={{
                     height: 35,
                     width: "100%",
                     borderRadius: 5,
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  <Text
                     style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 16,
                     }}
                  >
                     Close
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
   );
};

export default ModalComponent;
