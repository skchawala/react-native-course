import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.root, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  root: {
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default Card;
