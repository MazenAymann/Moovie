import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getNameOfGenre } from "../utils/genre_helper";
import Icon from "react-native-vector-icons/Fontisto";
import MoviesList from "../components/moviesList";
import { toggleFavorite } from "../redux/store/slices/moviesSlice";
import StarRating from "../components/starRating";

const MovieDetails = () => {
  const route = useRoute();
  const { id } = route.params;
  const movies = useSelector((state) => state.movies.movies);
  const favorites = useSelector((state) => state.movies.favorites);
  let movie = movies.find((movie) => movie.id === id);
  const dispatch = useDispatch();

  if (!movie) {
    const top_rated_movies = useSelector(
      (state) => state.movies.top_rated_movies
    );
    movie = top_rated_movies.find((movie) => movie.id === id);
  }
  const category = getNameOfGenre(movie.genre_ids[0]);
  const rate = movie.vote_average.toFixed(1);

  const imgPath = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
  const imgPoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const isFavorite = favorites.find((favMovie) => favMovie.id === id);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1 }}>
        <View>
          <TouchableOpacity
            onPress={() => dispatch(toggleFavorite(movie))}
            style={styles.loveButton}
          >
            <Icon
              name="heart"
              size={25}
              color={isFavorite ? "#8d1c2d" : "white"}
            />
          </TouchableOpacity>
          <ImageBackground
            source={{ uri: imgPath }}
            style={styles.image}
            blurRadius={2}
          >
            <View style={styles.overlay}></View>
          </ImageBackground>
        </View>
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: imgPoster }}
              height={150}
              width={100}
              style={styles.poster}
            ></Image>
            <View
              style={{
                marginLeft: 20,
                marginTop: 5,
                justifyContent: "space-around",
              }}
            >
              <Text style={styles.title}>{movie.title}</Text>
              <View style={styles.category}>
                <Text style={[styles.text, { color: "#e5e5e5" }]}>
                  {category}
                </Text>
              </View>
              <Text
                style={{ color: "#e5e5e5", fontSize: 9, marginVertical: 5 }}
              >
                Release Date: {movie.release_date}
              </Text>
              <StarRating rate={rate}></StarRating>
            </View>
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 40 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
              Overview
            </Text>
            <Text style={{ color: "#e5e5e5", fontSize: 12, marginTop: 10 }}>
              {movie.overview}
            </Text>
          </View>
          <MoviesList
            header="Similar Movies"
            moviesList="similar_movies"
          ></MoviesList>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#14213d",
    borderRadius: 20,
    marginTop: -15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "100%",
  },
  image: {
    height: 250,
    resizeMode: "cover",
  },
  poster: {
    resizeMode: "contain",
    marginTop: -50,
    marginLeft: 20,
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    width: 190,
    fontWeight: "bold",
    color: "white",
  },
  category: {
    borderWidth: 1,
    borderColor: "#fca311",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  text: {
    color: "white",
    fontSize: 8,
  },
  loveButton: {
    position: "absolute",
    top: 43,
    right: 23,
    zIndex: 1,
  },
});

export default MovieDetails;
