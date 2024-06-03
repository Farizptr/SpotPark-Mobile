// components/Footer.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SpotParkIcon from "../assets/images/icons/ic-spotparklogo.svg";

const Footer = () => {
  return <View className="flex flex-row items-center px-8 h-28 "></View>;
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#27374D",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Footer;
