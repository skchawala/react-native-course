import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import BodyText from "./BodyText";
const MealItem = ({
  title,
  onSelect,
  duration,
  complexity,
  affordability,
  imageUrl,
}) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity activeOpacity={0.5} onPress={onSelect}>
        <View style={styles.container}>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground style={styles.bgImage} source={{ uri: imageUrl }}>
              <View style={styles.titleContainer}>
                <Text numberOfLines={1} style={styles.title}>
                  {title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetails }}>
            <BodyText>{duration}m</BodyText>
            <BodyText>{complexity.toUpperCase()}</BodyText>
            <BodyText>{affordability.toUpperCase()}</BodyText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 3,
    overflow: "hidden",
  },
  container: {},
  mealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetails: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});

export default MealItem;
