// screens/HomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [plateNo, setPlateNo] = useState("");

  const handleInputChange = (text) => {
    setPlateNo(text);
  };

  const handleSubmit = async () => {
    await AsyncStorage.setItem("plateNo", plateNo);
    navigation.navigate("Order");
  };

  return (
    <View className="flex-1 bg-white">
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Customer Information</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Plat Nomor</Text>
          <TextInput
            onChangeText={handleInputChange}
            value={plateNo}
            style={styles.input}
            placeholder="Enter plate number"
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#27374D",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "black",
  },
  button: {
    backgroundColor: "#27374D",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
