import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import colors from "../constants/colors";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

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
const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: {
      screen: ProductsOverviewScreen,
    },
    ProductDetails: {
      screen: ProductDetailsScreen,
    },
    Cart: {
      screen: CartScreen,
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => {
        return (
          <Ionicons name="md-cart" size={23} color={drawerConfig.tintColor} />
        );
      },
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: {
      screen: OrdersScreen,
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => {
        return (
          <Ionicons name="md-list" size={23} color={drawerConfig.tintColor} />
        );
      },
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: {
      screen: UserProductsScreen,
    },
    EditProduct: {
      screen: EditProductScreen,
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => {
        return (
          <Ionicons name="md-create" size={23} color={drawerConfig.tintColor} />
        );
      },
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsNavigator,
    },
    Orders: {
      screen: OrdersNavigator,
    },
    Admin: {
      screen: AdminNavigator,
    },
  },
  {
    contentOptions: {
      activeTintColor: colors.primary,
      itemsContainerStyle: {
        marginTop: 32,
      },
    },
  }
);

export default createAppContainer(ShopNavigator);
