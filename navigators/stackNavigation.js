import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "../pages/home";
import movieDetails from "../pages/movieDetails";
import Movies from "../pages/movies";
import { Ionicons } from "@expo/vector-icons";
import Favorites from "../pages/favorites";
import { View } from "react-native";

const StackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerBackImage: () => (
          <View
            style={{
              backgroundColor: "white",
              marginLeft: 10,
              borderRadius: 5,
            }}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#fca311"
              style={{ margin: 2 }}
            />
          </View>
        ),
        headerTitle: "",
      }}
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="MovieDetails" component={movieDetails} />
      <Stack.Screen name="Movies" component={Movies} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
