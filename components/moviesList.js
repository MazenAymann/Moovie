import React, { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Movie from "../components/movie";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  fetchTopRatedMovies,
  fetchSimilarMovies,
} from "../redux/store/slices/moviesSlice";

const MoviesList = ({ header, moviesList }) => {
  const dispatch = useDispatch();
  const upcoming_movies = useSelector((state) => state.movies.movies);
  const top_rated_movies = useSelector(
    (state) => state.movies.top_rated_movies
  );
  const similar_movies = useSelector((state) => state.movies.similar_movies);
  const favorites = useSelector((state) => state.movies.favorites);

  let movies;
  if (moviesList == "upcoming_movies") {
    movies = upcoming_movies;
  } else if (moviesList == "top_rated_movies") {
    movies = top_rated_movies;
  } else if (moviesList == "similar_movies") {
    movies = similar_movies;
  } else if (moviesList == "favorites") {
    movies = favorites;
  }
  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchSimilarMovies());
  }, [dispatch]);

  const { navigate } = useNavigation();

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text style={styles.header}>{header}</Text>
        <Pressable
          onPress={() => {
            navigate("Movies", { moviesList: moviesList });
          }}
        >
          <Text style={[styles.header, { color: "#fca311" }]}>See All</Text>
        </Pressable>
      </View>
      <FlatList
        data={movies}
        renderItem={({ item }) => <Movie key={item.id} {...item} />}
        keyExtractor={(item) => item.id.toString()}
        overScrollMode="always"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginRight: 20, marginLeft: 10 }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    color: "white",
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 18,
  },
});

export default MoviesList;
