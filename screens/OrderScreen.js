import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { database } from "../firebase"; // Assuming you have configured firebase
import { ref, onValue, push, set, get } from "firebase/database";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ModalComponent from "../components/Modal";

export default function OrderScreen() {
  const navigation = useNavigation();
  const boxes = Array.from({ length: 10 }, (_, index) => index + 1);
  const [objectDetected, setObjectDetected] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [reservedBoxes, setReservedBoxes] = useState([]); // state untuk melacak kotak yang sudah dipesan

  const handleBoxClick = (box) => {
    if (reservedBoxes.includes(box)) {
      return; // Jika kotak sudah dipesan, keluar dari fungsi
    }
    setSelectedBox(box);
    setData((prevData) => ({
      ...prevData,
      parkNo: `A ${box}`,
    }));
  };

  const [data, setData] = useState({
    orderNo: "",
    date: "",
    plateNo: "",
    location: "",
    parkNo: "",
  });

  const handleConfirm = async () => {
    // Menyimpan data ke Firebase
    const newOrderRef = push(ref(database, "Booked"));
    try {
      await set(newOrderRef, data);
      console.log("Data berhasil disimpan ke Firebase");
      setReservedBoxes([...reservedBoxes, selectedBox]); // Tambahkan kotak yang baru dipesan ke reservedBoxes

      setData((prevData) => ({
        ...prevData,
        orderNo: (parseInt(prevData.orderNo, 10) + 1)
          .toString()
          .padStart(3, "0"),
      }));
      setIsOpen(false); // Tutup modal setelah konfirmasi
      navigation.navigate("Complete");
    } catch (error) {
      console.error("Error menyimpan data ke Firebase:", error);
    }
  };

  useEffect(() => {
    // Mendapatkan nomor pemesanan terakhir dari Firebase
    const ordersRef = ref(database, "Booked");
    get(ordersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const orders = snapshot.val();
          const orderNumbers = Object.values(orders).map((order) =>
            parseInt(order.orderNo, 10)
          );
          const maxOrderNumber = Math.max(...orderNumbers);
          setData((prevData) => ({
            ...prevData,
            orderNo: (maxOrderNumber + 1).toString().padStart(3, "0"),
          }));

          const reserved = Object.values(orders).map((order) =>
            parseInt(order.parkNo.split(" ")[1], 10)
          );
          setReservedBoxes(reserved); // Perbarui kotak yang sudah dipesan
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error reading data from Firebase:", error);
      });

    const objectDetectedRef = ref(database, "DHT11/ObjectDetected");
    const unsubscribeObjectDetected = onValue(objectDetectedRef, (snapshot) => {
      const data = snapshot.val();
      setObjectDetected(data);
    });

    return () => {
      unsubscribeObjectDetected();
    };
  }, []);
  useEffect(() => {
    const fetchPlateNo = async () => {
      try {
        const plateNo = await AsyncStorage.getItem("plateNo");
        setData((prevData) => ({
          ...prevData,
          plateNo: plateNo || "", // Update the state with the fetched plateNo
          date: new Date().toISOString().split("T")[0],
          location: "B2",
          orderNo: prevData.orderNo ? prevData.orderNo : "001",
        }));
      } catch (error) {
        console.error("Error retrieving plateNo from AsyncStorage:", error);
      }
    };

    fetchPlateNo();
  }, []);

  useEffect(() => {
    setData({
      orderNo: "001",
      date: new Date().toISOString().split("T")[0],
      plateNo: AsyncStorage.getItem("plateNo").toString(),
      location: "B2",
      parkNo: "",
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ModalComponent
        data={data}
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onCancel={() => setIsOpen(false)}
      />
      <View style={styles.content}>
        <View style={styles.boxContainer}>
          {boxes.map((box) => (
            <TouchableOpacity
              key={box}
              style={[
                styles.box,
                reservedBoxes.includes(box)
                  ? styles.reservedBox
                  : selectedBox === box
                  ? styles.selectedBox
                  : styles.availableBox,
              ]}
              onPress={() => handleBoxClick(box)}
            >
              <Text style={styles.boxText}>A {box}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => setIsOpen(true)}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#27374D",
    borderRadius: 5,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  boxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  box: {
    width: "45%",
    padding: 30,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  availableBox: {
    backgroundColor: "white",
    borderColor: "black",
  },
  reservedBox: {
    backgroundColor: "red",
    borderColor: "black",
  },
  selectedBox: {
    backgroundColor: "green",
    borderColor: "black",
  },
  boxText: {
    color: "black",
  },
  nextButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#27374D",
    borderRadius: 8,
    alignItems: "center",
    width: "90%",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
