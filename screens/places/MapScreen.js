import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import CustomHeaderButtons from "../../components/CustomHeaderButtons";
const MapScreen = (props) => {
  const initialRegion = {
    latitude: 27.3530947,
    longitude: 77.3211251,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [location, setLocation] = useState(null);
  const onSelectLocation = (event) => {
    setLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocation = useCallback(() => {
    if (location) {
      props.navigation.navigate("NewPlace", {
        location,
      });
    }
  }, [location]);

  useEffect(() => {
    props.navigation.setParams({
      save: savePickedLocation,
    });
  }, [savePickedLocation]);
  let coordinate = null;
  if (location) {
    coordinate = {
      latitude: location.lat,
      longitude: location.lng,
    };
  }

  return (
    <MapView
      style={styles.root}
      region={initialRegion}
      onPress={onSelectLocation}
    >
      {coordinate && <Marker title="Picked Location" coordinate={coordinate} />}
    </MapView>
  );
};

MapScreen.navigationOptions = (props) => {
  return {
    headerTitle: "Pick Location",
    headerRight: () => (
      <CustomHeaderButtons
        color={"white"}
        onPress={props.navigation.getParam("save")}
        iconName={"md-save"}
        size={24}
        isLeft={false}
      />
    ),
  };
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default MapScreen;
