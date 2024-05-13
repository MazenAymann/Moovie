import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.6;
const ITEM_HEIGHT = width * 0.8;
const SELECTED_ITEM_HEIGHT = ITEM_HEIGHT * 1.5;
const AUTOPLAY_INTERVAL = 2500;

const MovieCarousel = () => {
  const movies = useSelector((state) => state.movies.popularMovies);
  const [selectedId, setSelectedId] = useState(
    movies.length > 0 ? movies[0].id : null
  );
  const flatListRef = useRef(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        if (autoplayEnabled) {
          let nextIndex = 0;
          const currentIndex = movies.findIndex(
            (movie) => movie.id === selectedId
          );
          if (currentIndex !== -1 && currentIndex < movies.length - 1) {
            nextIndex = currentIndex + 1;
          }
          setSelectedId(movies[nextIndex].id);
          flatListRef.current.scrollToIndex({
            animated: true,
            index: nextIndex,
          });
        }
      }, AUTOPLAY_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [movies, selectedId, autoplayEnabled]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: selectedId ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selectedId, animatedValue]);

  const renderItem = ({ item, index }) => {
    const isSelected = selectedId === item.id;
    const heightInterpolate = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [ITEM_HEIGHT, SELECTED_ITEM_HEIGHT],
    });
    const opacityInterpolate = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });
    return (
      <View
        style={[
          styles.item,
          isSelected ? styles.selectedItem : styles.unselectedItem,
          { opacity: isSelected ? 1 : 0.5 },
        ]}
        onStartShouldSetResponder={() => {
          setSelectedId(item.id);
          flatListRef.current.scrollToIndex({ animated: true, index });
        }}
      >
        <Animated.Image
          style={[styles.image, { height: heightInterpolate }]}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Popular Movies</Text>
      <FlatList
        ref={flatListRef}
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + 20}
        decelerationRate={0}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(
            event.nativeEvent.contentOffset.x / (ITEM_WIDTH + 20)
          );
          setSelectedId(movies[index].id);
        }}
        onTouchStart={() => setAutoplayEnabled(false)}
        onTouchEnd={() => setAutoplayEnabled(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
  },
  item: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  selectedItem: {
    height: SELECTED_ITEM_HEIGHT,
  },
  image: {
    width: "100%",
    resizeMode: "cover",
  },
  header: {
    color: "white",
    marginVertical: 10,
    marginLeft: 10,
    fontSize: 18,
  },
});

export default MovieCarousel;
