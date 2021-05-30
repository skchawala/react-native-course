import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

const CategoryGridTile = ({ title, color, onSelect }) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.root}>
      <TouchableCmp style={{ flex: 1 }} onPress={onSelect}>
        <View style={{ ...styles.container, backgroundColor: color }}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 3,
  },
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderRadius: 3,
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 5,
    shadowColor: "black",
    padding: 10,
  },
  title: {
    fontFamily: "open-sans",
    fontSize: 18,
    textAlign: "right",
  },
});

export default CategoryGridTile;
