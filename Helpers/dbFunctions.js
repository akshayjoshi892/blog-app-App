import axios from "axios";

const URL = "http://192.168.13.176:4000/api/v1";

export const getPendingArticles = async () => {
   try {
      const response = await axios.get(`${URL}/articles/pending-articles`);
      console.log(response.data);
      if (response.status == 200) {
         return response.data;
      }
   } catch (error) {
      console.log(error);
   }
};
