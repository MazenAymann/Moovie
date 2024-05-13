import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AppBar = () => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.appBar}>
      <View style={{ flexDirection: "row", marginLeft: 127 }}>
        <Text style={styles.title}>M</Text>
        <Text
          style={[
            styles.title,
            { color: "#fca311", fontSize: 25, marginTop: -2 },
          ]}
        >
          ∞
        </Text>
        <Text style={styles.title}>vie</Text>
      </View>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          navigate("Movies", { moviesList: "all" });
        }}
      >
        <Ionicons name="search" size={24} color="#fca311" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 60,
    marginTop: -35,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  searchButton: {
    padding: 10,
  },
});

export default AppBar;
