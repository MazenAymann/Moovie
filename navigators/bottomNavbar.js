import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import Settings from "../pages/settings";
import StackNavigation from "./stackNavigation";
import Favorites from "../pages/favorites";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          let iconStyle = {};

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Trending") {
            iconName = "trending-up";
          } else if (route.name === "Favorites") {
            iconName = "star";
          } else if (route.name === "Settings") {
            iconName = "settings";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              style={iconStyle}
            />
          );
        },
        headerShown: false,
        tabBarActiveTintColor: "#1E304E",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          display: "flex",
        },
      })}
    >
      <Tab.Screen name="Home" component={StackNavigation} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default BottomNav;
