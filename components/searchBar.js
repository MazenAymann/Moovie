import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  fetchMoviesBySearch,
  fetchTopRatedMoviesBySearch,
} from "../redux/store/slices/moviesSlice";
import Genre from "./genre";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoviesBySearch(searchQuery));
    dispatch(fetchTopRatedMoviesBySearch(searchQuery));
  }, [searchQuery]);

  return (
    <View style={{ marginBottom: 20 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeholderTextColor={"black"}
        iconColor="black"
        style={styles.searchbar}
        inputStyle={{ color: "black" }}
      />
      <View style={{ marginTop: -60, marginRight: 30 }}>
        <Genre />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: "#fca311",
    color: "black",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    paddingBottom: 0,
    marginTop: 50,
  },
});

export default Search;
