import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../constants/colors";
const MainButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.root}
      onPress={props.onPress}
    >
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 3,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
});

export default MainButton;
