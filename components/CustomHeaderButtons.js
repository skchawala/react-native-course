import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomHeaderButtons = (props) => {
  const { color, onPress, iconName, size = 22, isLeft = false } = props;
  return (
    <View
      style={{
        ...styles.header,
        ...(isLeft ? styles.headerLeft : styles.headerRight),
      }}
    >
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <Ionicons name={iconName}  size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  header: {
    flex: 1,
    flexDirection: "row",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    marginRight: 15,
  },
  headerLeft: {
    marginLeft: 15,
  },
});

export default CustomHeaderButtons;
