import React from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/actions/cart";
import CustomHeaderButtons from "../../components/CustomHeaderButtons";
import MainButton from "../../components/MainButton";
import { deleteProduct } from "../../store/actions/products";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const onDelete = (item) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      {
        text: "No",
        style: "default",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(item.id));
        },
      },
    ]);
  };
  const onEditItem = (itemData) => {
    props.navigation.navigate({
      routeName: "EditProduct",
      params: {
        productId: itemData.item.id,
      },
    });
  };
  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => {
        return (
          <ProductItem
            title={itemData.item.title}
            price={itemData.item.price}
            imageUrl={itemData.item.imageUrl}
            onSelect={() => {
              onEditItem(itemData);
            }}
          >
            <MainButton
              onPress={() => {
                onEditItem(itemData);
              }}
            >
              Edit
            </MainButton>
            <MainButton
              onPress={() => {
                onDelete(itemData.item);
              }}
            >
              Delete
            </MainButton>
          </ProductItem>
        );
      }}
    />
  );
};

UserProductsScreen.navigationOptions = (props) => {
  return {
    headerTitle: "Your Products",
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
    headerRight: () => (
      <CustomHeaderButtons
        color={"white"}
        onPress={() => {
          props.navigation.navigate("EditProduct");
        }}
        iconName={"md-create"}
        isLeft={false}
      />
    ),
  };
};

const styles = StyleSheet.create({
  root: {},
});

export default UserProductsScreen;
