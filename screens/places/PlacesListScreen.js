import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CustomHeaderButtons from "../../components/CustomHeaderButtons";
import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "../../components/places/PlaceItem";
import { loadPlaces } from "../../store/actions/places";

const PlacesListScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);
  const places = useSelector((state) => state.places.places);
  console.log(places);
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => `${item.id}`}
      renderItem={(dataItem) => {
        const { title, id, imageUrl = "", address = "" } = dataItem.item;
        return (
          <PlaceItem
            title={title}
            imageUrl={imageUrl}
            address={address}
            onSelect={() => {
              props.navigation.navigate("PlaceDetail", {
                title: title,
                id: id,
              });
            }}
          />
        );
      }}
    />
  );
};

PlacesListScreen.navigationOptions = (props) => {
  return {
    headerTitle: "All Places",
    headerRight: () => (
      <CustomHeaderButtons
        color={"white"}
        onPress={() => {
          props.navigation.navigate("NewPlace");
        }}
        iconName={"md-add"}
        size={24}
        isLeft={false}
      />
    ),
  };
};

const styles = StyleSheet.create({
  root: {},
});

export default PlacesListScreen;
