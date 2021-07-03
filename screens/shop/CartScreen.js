import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import MainButton from "../../components/MainButton";
import { useSelector, useDispatch } from "react-redux";
import BodyText from "../../components/BodyText";
import TitleText from "../../components/TitleText";
import colors from "../../constants/colors";
import CardItem from "../../components/shop/CartItem";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/orders";

import Card from "../../components/Card";
const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedItems = [];
    for (const key in state.cart.items) {
      const item = state.cart.items[key];
      transformedItems.push({
        productId: key,
        productTitle: item.title,
        productPrice: item.price,
        quantity: item.quantity,
        sum: item.sum,
      });
    }
    return transformedItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();
  const onRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <View style={styles.root}>
      <Card style={styles.summary}>
        <TitleText style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.summaryAmount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </TitleText>
        <MainButton
          disabled={cartItems.length === 0}
          backgroundColor={colors.accent}
          onPress={() => {
            dispatch(addOrder(cartItems, cartTotalAmount));
          }}
        >
          Order Now
        </MainButton>
      </Card>
      <View style={styles.items}>
        <FlatList
          data={cartItems}
          renderItem={(itemData) => {
            return (
              <CardItem
                quantity={itemData.item.quantity}
                price={itemData.item.productPrice}
                title={itemData.item.productTitle}
                amount={itemData.item.sum}
                onRemove={() => {
                  onRemove(itemData.item.productId);
                }}
              />
            );
          }}
          keyExtractor={(item) => item.productId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 20,
  },
  summaryText: {},
  summaryAmount: {
    color: colors.accent,
  },
  items: {},
});
CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

export default CartScreen;
