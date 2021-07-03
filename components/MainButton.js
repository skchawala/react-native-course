import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../constants/colors";
const MainButton = (props) => {
  const { disabled, backgroundColor = colors.primary } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.root}
      onPress={props.onPress}
      disabled={disabled}
    >
      <View
        style={{
          ...styles.button,
          backgroundColor: disabled ? "#8888" : backgroundColor,
        }}
      >
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {},
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
    textAlign: "center",
  },
});

export default MainButton;
