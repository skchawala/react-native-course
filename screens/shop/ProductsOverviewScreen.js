import React from "react";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cart";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButtons from "../../components/CustomHeaderButtons";
import colors from "../../constants/colors";
import MainButton from "../../components/MainButton";
const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const onAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const onViewDetails = (itemData) => {
    props.navigation.navigate({
      routeName: "ProductDetails",
      params: {
        productId: itemData.item.id,
        productTitle: itemData.item.title,
      },
    });
  };

  return (
    <FlatList
      data={products}
      style={styles.root}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          imageUrl={itemData.item.imageUrl}
          onSelect={() => {
            onViewDetails(itemData);
          }}
        >
          <MainButton
            onPress={() => {
              onViewDetails(itemData);
            }}
          >
            View Details
          </MainButton>
          <MainButton
            onPress={() => {
              onAddToCart(itemData.item);
            }}
          >
            To Card
          </MainButton>
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  root: {},
});

ProductsOverviewScreen.navigationOptions = (props) => {
  return {
    headerTitle: "All Products",
    headerRight: () => (
      <CustomHeaderButtons
        color={Platform.OS === "android" ? "white" : colors.primary}
        onPress={() => {
          props.navigation.navigate("Cart");
        }}
        iconName={"md-cart"}
      />
    ),
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

export default ProductsOverviewScreen;
