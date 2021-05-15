import React from "react";
import { Text, StyleSheet } from "react-native";

const BodyText = (props) => {
  return (
    <Text style={{ ...styles.root, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontFamily: "open-sans",
  },
});

export default BodyText;
