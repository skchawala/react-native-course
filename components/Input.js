import React from "react";
import { StyleSheet, TextInput } from "react-native";
const Input = (props) => {
  return <TextInput {...props} style={{ ...styles.root, ...props.style }} />;
};

const styles = StyleSheet.create({
  root: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Input;
