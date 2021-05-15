import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";
const NumberContainer = (props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 2,
    borderColor: colors.accent,
    padding: 10,
    borderRadius: 3,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    color: colors.accent,
    fontSize: 28,
  },
});

export default NumberContainer;
