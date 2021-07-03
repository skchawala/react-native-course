import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoriesMealsScreen from "../screens/CategoriesMealsScreen";
import MealsDetailScreen from "../screens/MealsDetailScreen";
import colors from "../constants/colors";
import FavoritesMealsScreen from "../screens/FavoritesMealsScreen";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import {} from "react-native-paper";
import { createDrawerNavigator } from "react-navigation-drawer";
import FiltersScreen from "../screens/FiltersScreen";
c
const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: "Meal Categories",
      },
    },
    CategoriesMeals: {
      screen: CategoriesMealsScreen,
    },
    MealsDetail: {
      screen: MealsDetailScreen,
    },
  },
  {
    // initialRouteName: "Categories",
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const FavoriteMealsNavigator = createStackNavigator(
  {
    Favorites: {
      screen: FavoritesMealsScreen,
      navigationOptions: {
        headerTitle: "Your Favorites",
      },
    },
    MealsDetail: {
      screen: MealsDetailScreen,
    },
  },
  {
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const FilterNavigator = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: colors.primary,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans" }}>Meals</Text>
        ) : (
          "Meals"
        ),
    },
  },
  Favorites: {
    screen: FavoriteMealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: colors.accent,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans" }}>Favorites</Text>
        ) : (
          "Favorites"
        ),
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true,
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: "white",
          labelStyle: {
            fontFamily: "open-sans",
          },
        },
      });
const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals",
      },
    },
    Filters: {
      screen: FilterNavigator,
      navigationOptions: {
        drawerLabel: "Filters",
      },
    },
  },
  {
    contentOptions: {
      itemsContainerStyle: {
        marginTop: 32,
      },
      activeTintColor: colors.accent,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    },
  }
);
export default createAppContainer(MainNavigator);
