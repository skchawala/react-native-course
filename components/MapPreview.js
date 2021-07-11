import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ENV from "../env";
const MapPreview = (props) => {
  let imgUrl;
  if (props.location) {
    const { lat, lng } = props.location;
    imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:green%7Clabel:A%7C${lat},${lng}&key=${ENV.googleApiKey}`;
  }
  console.log("props.location", props.location, imgUrl);
  return (
    <TouchableOpacity
      style={{ ...styles.root, ...props.style }}
      onPress={props.onPress}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imgUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
