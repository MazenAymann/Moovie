import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  fetchTopRatedMovies,
} from "../redux/store/slices/moviesSlice";
import Movie from "../components/movie";
import Search from "../components/searchBar";

const Movies = () => {
  const route = useRoute();
  const moviesList = route.params.moviesList;
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
  } else if (moviesList == "all") {
    movies = upcoming_movies.concat(top_rated_movies);
  }
  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);

  const renderMovie = ({ item, index }) => {
    const marginRight = index % 3 === 2 ? 0 : 5;
    return <Movie key={item.id} {...item} style={{ marginRight }} />;
  };

  return (
    <View style={styles.container}>
      <Search />
      {movies.length === 0 ? (
        <Image
          source={{
            uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/70f4c7ed-5821-4709-9765-82ec0b27a210/dfs68r1-85be6b47-8df2-4b9e-a037-90528f3494cc.png/v1/fill/w_1280,h_1280/popcorn_png_by_allstaraward123_dfs68r1-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzcwZjRjN2VkLTU4MjEtNDcwOS05NzY1LTgyZWMwYjI3YTIxMFwvZGZzNjhyMS04NWJlNmI0Ny04ZGYyLTRiOWUtYTAzNy05MDUyOGYzNDk0Y2MucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.pE0Gbye25YWbVsxTCcktcIGlYKntn5iLGfHHMRapRDg",
          }}
          width={300}
          height={300}
          style={{ marginTop: "40%", marginLeft: "10%" }}
        ></Image>
      ) : (
        <FlatList
          numColumns={3}
          data={movies}
          renderItem={renderMovie}
          keyExtractor={(item) => item.id.toString()}
          overScrollMode="always"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  flatList: {
    marginHorizontal: 5,
    marginTop: 10,
    paddingBottom: 20,
    marginLeft: 10,
  },
  noMoviesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default Movies;
