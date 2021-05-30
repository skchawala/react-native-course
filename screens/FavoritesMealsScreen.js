import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MealList from "../components/MealList";
import CustomHeaderButtons from "../components/CustomHeaderButtons";
import { useSelector } from "react-redux";
import BodyText from "../components/BodyText";
const FavoritesMealsScreen = (props) => {
  const favMeals = useSelector((state) => state.meals.favoritesMeals);

  if (!favMeals || favMeals.length === 0) {
    return (
      <View style={styles.noFavMeal}>
        <BodyText>No favorite meal found. Start adding some.</BodyText>
      </View>
    );
  }

  return (
    <MealList
      meals={favMeals}
      navigation={props.navigation}
      routeName="MealsDetail"
    />
  );
};

FavoritesMealsScreen.navigationOptions = (props) => {
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
  root: { flex: 1, alignItems: "center", justifyContent: "center" },
  noFavMeal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FavoritesMealsScreen;
