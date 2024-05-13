import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIdOfGenre } from "../../../utils/genre_helper";

const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0NWIxOTQxNjE0NDFjNjI5MzE2OTgyZTE2NWFiYyIsInN1YiI6IjY2M2YzZWU1Y2VhNGFiNTNmZTQ3YmM3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TxrqjF-6rIjELu0O328X3CkdDgEjT2gGI2YVcOcMbXE",
};
const initialState = {
  movies: [],
  top_rated_movies: [],
  similar_movies: [],
  loading: false,
  error: null,
  favorites: [],
  popularMovies: [],
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch("https://api.themoviedb.org/3/movie/upcoming", {
    method: "GET",
    headers: headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch movies.");
  }
  const data = await response.json();
  return data;
});

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async () => {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch movies.");
    }
    const data = await response.json();
    return data;
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRatedMovies",
  async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      {
        method: "GET",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies.");
    }
    const data = await response.json();
    return data;
  }
);

export const fetchMoviesBySearch = createAsyncThunk(
  "movies/fetchMoviesBySearch",
  async (searchQuery) => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming",
      {
        method: "GET",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies.");
    }

    const data = await response.json();

    const filteredData = data.results.filter((movie) =>
      movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    return filteredData;
  }
);

export const fetchTopRatedMoviesBySearch = createAsyncThunk(
  "movies/fetchTopRatedMoviesBySearch",
  async (searchQuery) => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      {
        method: "GET",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies.");
    }

    const data = await response.json();

    const filteredData = data.results.filter((movie) =>
      movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    return filteredData;
  }
);

export const fetchSimilarMovies = createAsyncThunk(
  "movies/fetchSimilarMovies",
  async (movieID) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/similar`,
      {
        method: "GET",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies.");
    }

    const data = await response.json();
    return data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const index = state.favorites.findIndex((m) => m.id === movie.id);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(movie);
      }
    },
    filterByGenre: (state, action) => {
      const genre = action.payload;
      state.movies = state.movies.filter((movie) =>
        movie.genre_ids.includes(getIdOfGenre(genre))
      );
      state.top_rated_movies = state.top_rated_movies.filter((movie) =>
        movie.genre_ids.includes(getIdOfGenre(genre))
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.top_rated_movies = action.payload.results;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMoviesBySearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMoviesBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTopRatedMoviesBySearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedMoviesBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.top_rated_movies = action.payload;
      })
      .addCase(fetchTopRatedMoviesBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSimilarMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.similar_movies = action.payload.results;
      })
      .addCase(fetchSimilarMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload.results;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleFavorite, filterByGenre } = movieSlice.actions;
export default movieSlice.reducer;
