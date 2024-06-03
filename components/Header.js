// components/Header.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SpotParkIcon from "../assets/images/icons/ic-spotparklogo.svg";

const Header = () => {
  return (
    <View className="flex flex-row items-center px-6 h-28 ">
      <SpotParkIcon width={100} height={100} />
      <Text className="font-semibold text-2xl ml-5">SpotPark</Text>
    </View>
  );
};



export default Header;
