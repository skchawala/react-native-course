import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createStore, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import ProductsReducer from "./store/reducers/products";
import CartReducer from "./store/reducers/cart";
import OrdersReducer from "./store/reducers/orders";
import * as Font from "expo-font";
import openSans from "./assets/fonts/OpenSans-Regular.ttf";
import openSansBold from "./assets/fonts/OpenSans-Bold.ttf";
import AppLoading from "expo-app-loading";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  products: ProductsReducer,
  cart: CartReducer,
  orders: OrdersReducer,
});
const store = createStore(rootReducer, composeEnhancers());
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": openSans,
    "open-sans-bold": openSansBold,
  });
};
import ShopsNavigator from "./navigation/ShopNavigator";
const App = (prop) => {
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
      <ShopsNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({});
export default App;
