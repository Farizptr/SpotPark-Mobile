import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

export default function ModalComponent({ data, isOpen, onConfirm, onCancel }) {
  const listData = [
    { key: "Nomor Pemesanan", value: data.orderNo },
    { key: "Tanggal", value: data.date },
    { key: "Plat Nomor", value: data.plateNo },
    { key: "Lokasi Parkir", value: data.location },
    { key: "Nomor Tempat Parkir", value: data.parkNo },
  ];

  return (
    <Modal transparent={true} visible={isOpen} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Verifikasi</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.descriptionText}>Deskripsi</Text>
            <FlatList
              data={listData}
              renderItem={({ item }) => (
                <Text style={styles.listItem}>
                  • {item.key}: {item.value}
                </Text>
              )}
              keyExtractor={(item) => item.key}
              style={styles.listContainer}
              contentContainerStyle={styles.listContentContainer}
            />
            <Text style={styles.confirmText}>
              Apakah data tersebut sudah sesuai?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onCancel}>
                <View className="bg-[#9DB2BF] rounded-md items-center justify-center w-32 py-2">
                  <Text className="font-semibold text-[#27374D]">Tidak</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onConfirm}>
                <View className="bg-[#27374D] rounded-md items-center justify-center w-32 py-2">
                  <Text className="font-semibold text-white">Ya</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  header: {
    backgroundColor: "#27374D",
    paddingVertical: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    padding: 20,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  listContainer: {
    marginBottom: 20,
    maxHeight: 120, // Adjust maxHeight as needed
  },
  listContentContainer: {
    paddingBottom: 10,
  },
  listItem: {
    fontSize: 14,
    color: "black",
    marginBottom: 5,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#27374D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
