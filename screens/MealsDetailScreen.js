import React, { useMemo, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import CustomHeaderButtons from "../components/CustomHeaderButtons";
import BodyText from "../components/BodyText";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";
const getSelectedCategory = (navigation) => {
  const availableMeals = useSelector((state) => state.meals.meals);
  const mealId = navigation.getParam("mealId");
  return availableMeals.find(({ id }) => id === mealId);
};

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <BodyText>{props.children}</BodyText>
    </View>
  );
};

const MealsDetailScreen = (props) => {
  const mealDetail = getSelectedCategory(props.navigation);

  const {
    duration,
    complexity,
    affordability,
    title,
    imageUrl,
    ingredients,
    steps,
    id,
  } = mealDetail;
  const dispatch = useDispatch();

  const handleOnFavClick = useCallback(() => {
    dispatch(toggleFavorite(id));
  }, [dispatch, id]);

  const favMeals = useSelector((state) => state.meals.favoritesMeals);

  const len = favMeals.length;
  const isFav = useMemo(() => {
    return !!favMeals.find((m) => m.id === id);
  }, [id, len]);

  React.useLayoutEffect(() => {
    props.navigation.setParams({
      handleOnFavClick: handleOnFavClick,
    });
  }, [handleOnFavClick]);

  React.useLayoutEffect(() => {
    props.navigation.setParams({
      mealDetail: {
        title: title,
        isFavorite: isFav,
      },
    });
  }, [title, isFav]);

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <BodyText>{duration}m</BodyText>
        <BodyText>{complexity.toUpperCase()}</BodyText>
        <BodyText>{affordability.toUpperCase()}</BodyText>
      </View>
      <Text style={styles.title}>Ingredients</Text>

      {ingredients.map((ingredient) => {
        return <ListItem key={ingredient}>{ingredient}</ListItem>;
      })}

      <Text style={styles.title}>Steps</Text>

      {steps.map((step) => {
        return <ListItem key={step}>{step}</ListItem>;
      })}
    </ScrollView>
  );
};
MealsDetailScreen.navigationOptions = (props) => {
  const mealDetail = props.navigation.getParam("mealDetail") || {};
  const isFavorite = mealDetail.isFavorite;
  return {
    headerTitle: mealDetail.title,
    headerRight: () => (
      <CustomHeaderButtons
        color={"white"}
        iconName={isFavorite ? "ios-star" : "ios-star-outline"}
        onPress={props.navigation.getParam("handleOnFavClick")}
      />
    ),
  };
};

const styles = StyleSheet.create({
  root: {},
  details: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
});

export default MealsDetailScreen;
