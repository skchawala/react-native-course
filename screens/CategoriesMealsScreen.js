import React from "react";
import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import BodyText from "../components/BodyText";

const getSelectedCategory = (navigation) => {
  const categoryId = navigation.getParam("categoryId");
  return CATEGORIES.find(({ id }) => id === categoryId);
};

const CategoriesMealsScreen = (props) => {
  const categoryId = props.navigation.getParam("categoryId");
  const availableMeals = useSelector((state) => state.meals.filteredMeals);
  const meals = availableMeals.filter(
    ({ categoriesIds }) => categoriesIds.indexOf(categoryId) !== -1
  );
  if (!meals || meals.length === 0) {
    return (
      <View style={styles.noFavMeal}>
        <BodyText>No meal found.May be check your filters.</BodyText>
      </View>
    );
  }

  return (
    <MealList
      meals={meals}
      navigation={props.navigation}
      routeName="MealsDetail"
    />
  );
};

CategoriesMealsScreen.navigationOptions = (props) => {
  const selectedCategory = getSelectedCategory(props.navigation);
  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  root: {},
  noFavMeal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CategoriesMealsScreen;
