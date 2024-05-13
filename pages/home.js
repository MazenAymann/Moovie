import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import MoviesList from "../components/moviesList";
import Index from "../components/movieCarousel";
import AppBar from "../components/appBar";
import MovieCarousel from "../components/movieCarousel";
import { useDispatch } from "react-redux";
import {
  fetchMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "../redux/store/slices/moviesSlice";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(fetchTopRatedMovies());
      dispatch(fetchMovies());
      dispatch(fetchPopularMovies());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={{ paddingTop: 60 }}>
      <View>
        <AppBar></AppBar>
        <MovieCarousel></MovieCarousel>
        <MoviesList header="Upcoming Movies" moviesList="upcoming_movies" />
        <MoviesList header="Top Rated Movies" moviesList="top_rated_movies" />
        <MoviesList header="Favorites Movies" moviesList="favorites" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Home;
