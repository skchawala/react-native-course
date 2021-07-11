import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import PlacesNavigator from "./navigation/PlacesNavigator";
import * as Font from "expo-font";
import openSans from "./assets/fonts/OpenSans-Regular.ttf";
import openSansBold from "./assets/fonts/OpenSans-Bold.ttf";
import AppLoading from "expo-app-loading";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import PlacesReducer from "./store/reducers/places";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { init } from "./db";

init()
  .then(() => {
    console.log("successfully initialized Db");
  })
  .catch((err) => {
    console.log("Db init error", err);
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  places: PlacesReducer,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

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
      <PlacesNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({
  root: {},
});

export default App;
