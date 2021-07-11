import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import MainButton from "./MainButton";
import * as ImagePicker from "expo-image-picker";

const ImgPicker = (props) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const takeImageHandler = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      if (props.onSelect) {
        props.onSelect(result.uri);
      }
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.imagePreview}>
        {!!!image && <Text>No Image Picked Yet</Text>}
        {!!image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <MainButton onPress={takeImageHandler}>Take Image</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    marginBottom: 10,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
