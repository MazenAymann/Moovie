import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { fetchSimilarMovies } from "../redux/store/slices/moviesSlice";

const Movie = ({ title, poster_path, id }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const imgPath = `https://image.tmdb.org/t/p/w500${poster_path}`;
  return (
    <Pressable
      onPress={() => {
        dispatch(fetchSimilarMovies(id));
        navigate("MovieDetails", { id: id });
      }}
    >
      <Image source={{ uri: imgPath }} style={styles.image} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    marginLeft: 10,
    width: 100,
    height: 150,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Movie;
