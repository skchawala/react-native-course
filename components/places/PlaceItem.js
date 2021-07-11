import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import BodyText from "../../components/BodyText";
import TitleText from "../../components/TitleText";
import colors from "../../constants/colors";
const PlaceItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.root}>
      <Image source={{ uri: props.imageUrl }} style={styles.image} />
      <View style={styles.container}>
        <TitleText style={styles.title}>{props.title}</TitleText>
        <BodyText style={styles.address}>{props.address}</BodyText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    marginLeft: 25,
    width: 250,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ccc",
    borderColor: colors.primary,
    borderWidth: 1,
  },
  title: {
    color: "black",
    marginBottom: 5,
  },
  address: {
    color: "#666",
  },
});

export default PlaceItem;
