import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import PlacesListScreen from "../screens/places/PlacesListScreen";
import PlaceDetailsScreen from "../screens/places/PlaceDetailsScreen";
import NewPlaceScreen from "../screens/places/NewPlaceScreen";
import MapScreen from "../screens/places/MapScreen";
import colors from "../constants/colors";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: "white",
};

const PlacesNavigator = createStackNavigator(
  {
    Places: {
      screen: PlacesListScreen,
    },
    PlaceDetail: {
      screen: PlaceDetailsScreen,
    },
    NewPlace: {
      screen: NewPlaceScreen,
    },
    Map: {
      screen: MapScreen,
    },
  },
  {
    defaultNavigationOptions,
  }
);

export default createAppContainer(PlacesNavigator);
