import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import openSans from "./assets/fonts/OpenSans-Regular.ttf";
import openSansBold from "./assets/fonts/OpenSans-Bold.ttf";
import MealsNavigator from "./navigation/MealsNavigation";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import mealsReducer from "./store/reducers/meals";
// import { composeWithDevTools } from "redux-devtools-extension";
import { compose } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  meals: mealsReducer,
});
const store = createStore(rootReducer, composeEnhancers());

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": openSans,
    "open-sans-bold": openSansBold,
  });
};
const App = (props) => {
  const [isFontsLoaded, setIsFontsLoaded] = React.useState(false);

  if (!isFontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({
  root: {},
});

export default App;
