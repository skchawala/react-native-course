import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.root, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  root: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.26,
    elevation: 6,
    shadowRadius: 6,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 3,
  },
});

export default Card;
