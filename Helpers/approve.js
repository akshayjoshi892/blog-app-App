import axios from "axios";
import { Alert } from "react-native";
export const handleApprove = async (articleId, token) => {
   console.log("handleApprove");
   try {
      const response = await axios.post(
         `http://192.168.13.176:4000/api/v1/articles/approve-articles?articleId=${articleId}`,
         {},
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );

      // Check if the request was successful
      if (response.status === 200) {
         Alert.alert("Article approved successfully");
         
         console.log("Article approved successfully");
      }
   } catch (error) {
      console.error("Error approving article:", error);
      // Handle error
   }
};
