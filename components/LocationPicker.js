import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MainButton from "./MainButton";
import * as Location from "expo-location";
import colors from "../constants/colors";
import MapPreview from "./MapPreview";
const LocationPicker = (props) => {
  const { onLocPicked } = props;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isGranted, setIsGranted] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const mapPickedLocation = props.navigation.getParam("location");
  useEffect(() => {
    setLocation(mapPickedLocation);
    onLocPicked(mapPickedLocation);
  }, [mapPickedLocation, onLocPicked]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      setIsGranted(true);
    })();
  }, []);

  const getUserLocation = async () => {
    if (isGranted) {
      try {
        setIsFetching(true);
        let location = await Location.getCurrentPositionAsync({
          timeInterval: 5000,
        });
        setIsFetching(false);
        setLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
        onLocPicked({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      } catch (e) {
        Alert.alert("Could not fetch location", "Please try later", [
          { text: "OK" },
        ]);
      }
    }
  };
  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };
  return (
    <View style={styles.root}>
      <MapPreview
        style={styles.mapPreview}
        location={location}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <Text>No Location Chosen yet</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <MainButton onPress={getUserLocation}> Get Location</MainButton>
        <MainButton onPress={pickOnMapHandler}>Pick On Map</MainButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 15,
    alignItems: "center",
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default LocationPicker;
