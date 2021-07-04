import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import CustomHeaderButtons from "../../components/CustomHeaderButtons";
import OrderItem from "../../components/shop/OrderItem";
const OrdersScreen = (props) => {
    console.log('Order-------------')
  const orders = useSelector((state) => state.orders.orders);
  return (
    <FlatList
      style={styles.root}
      data={orders}
      renderItem={(itemData) => {
        return (
          <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  root: {},
});

OrdersScreen.navigationOptions = (props) => {
  return {
    headerTitle: "Your Orders",
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
export default OrdersScreen;
