import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const StarRating = ({ rate }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rate / 2);
    const halfStars = rate % 2 === 0 ? 0 : 1;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesome key={i} name="star" size={20} color="#FFD700" />);
    }

    if (halfStars === 1) {
      stars.push(
        <FontAwesome
          key={fullStars}
          name="star-half-full"
          size={20}
          color="#FFD700"
        />
      );
    }

    const emptyStars = 5 - fullStars - halfStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesome
          key={fullStars + halfStars + i}
          name="star-o"
          size={20}
          color="#FFD700"
        />
      );
    }

    return stars;
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {renderStars().map((star, index) => (
        <View key={index}>{star}</View>
      ))}
      <Text
        style={{
          marginLeft: 5,
          color: "gold",
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        {rate}
      </Text>
    </View>
  );
};

export default StarRating;
