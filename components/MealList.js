import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MealItem from "./MealItem";

const MealList = (props) => {
  const renderMeal = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        imageUrl={itemData.item.imageUrl}
        onSelect={() => {
          props.navigation.navigate({
            routeName: props.routeName,
            params: {
              mealId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        style={{ width: "100%" }}
        data={props.meals}
        renderItem={renderMeal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MealList;
