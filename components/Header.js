import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../constants/colors";
import TitleText from "./TitleText";

const Header = (props) => {
  return (
    <View style={styles.root}>
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.primary,
    paddingTop: 36,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "black",
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
});
