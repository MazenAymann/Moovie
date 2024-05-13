import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { filterByGenre } from "../redux/store/slices/moviesSlice";

const Genre = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const genres = ["Action", "Adventure", "Comedy", "Drama", "War"];
  function handleGenre(genre) {
    dispatch(filterByGenre(genre));
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.button}
      >
        <Ionicons name="filter" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {genres.map((genre) => (
              <TouchableOpacity
                key={genre}
                onPress={() => {
                  handleGenre(genre);
                  setModalVisible(false);
                }}
                style={styles.genreItemButton}
              >
                <Text style={styles.genreItemText}>{genre}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: "#14213d",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 5,
  },
  icon: {
    marginHorizontal: 2.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#14213d",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    elevation: 10,
  },
  genreItemButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  genreItemText: {
    fontSize: 18,
    color: "#ffffff",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#14213d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    width: "30%",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default Genre;
