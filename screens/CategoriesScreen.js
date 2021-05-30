import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";

import { CATEGORIES } from "../data/dummy-data";
import CustomHeaderButtons from "../components/CustomHeaderButtons";

const CategoriesScreen = (props) => {
  const renderCategory = (itemData, index) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "CategoriesMeals",
            params: {
              categoryId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  return (
    <FlatList numColumns={2} data={CATEGORIES} renderItem={renderCategory} />
  );
};

CategoriesScreen.navigationOptions = (props) => {
  return {
    headerLeft: () => (
      <CustomHeaderButtons
        color={"white"}
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
        iconName={"menu"}
        isLeft={true}
      />
    ),
  };
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CategoriesScreen;
