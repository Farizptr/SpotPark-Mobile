import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CompleteScreen() {
  return (
    <View className="flex flex-col min-h-screen bg-white">
      <Header />
      <ImageBackground
        source={require("../assets/images/images/image-bg.png")}
        style={styles.backgroundImage}
      >
        <View className="flex items-center justify-center min-h-screen pb-2">
            <Text className="font-semibold text-2xl text-[#27374D]">Your park is secured!</Text>

        </View>
      </ImageBackground>
      <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#4A90E2", // Assuming this is the hex code for your "text-main-500" color
  },
});
