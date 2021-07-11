import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaceDetailsScreen = (props) => {
  return (
    <View style={styles.root}>
      <Text>PlacesDetailsScreen</Text>
    </View>
  );
};

PlaceDetailsScreen.navigationOptions = (props) => {
  return {
    headerTitle: props.navigation.getParam("title"),
  };
};

const styles = StyleSheet.create({
  root: {},
});

export default PlaceDetailsScreen;
