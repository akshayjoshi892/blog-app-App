import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledImageBackground = styled(ImageBackground);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Welcome = () => {
   const navigation = useNavigation();
   const handleExplore = () => {
      navigation.navigate("Signup");
      console.log("Explore button pressed");
   };

   return (
      <StyledSafeAreaView className="flex-1">
         <StyledImageBackground
            source={require("../assets/welcome.jpg")}
            className="flex-1 justify-center items-center opacity-80"
         >
            <StyledView className="flex-1 justify-center items-center bg-gray-900 bg-opacity-70 w-full">
               <StyledText className="text-4xl text-white font-bold text-center mb-6">
                  Welcome to Our Blog App
               </StyledText>
               <StyledTouchableOpacity
                  onPress={handleExplore}
                  className="bg-blue-500 rounded-lg py-3 px-6"
               >
                  <StyledText className="text-white text-lg font-medium">
                     Explore
                  </StyledText>
               </StyledTouchableOpacity>
            </StyledView>
         </StyledImageBackground>
      </StyledSafeAreaView>
   );
};

export default Welcome;
