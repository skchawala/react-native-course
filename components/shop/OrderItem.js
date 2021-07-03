import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import CardItem from "./CartItem";
import BodyText from "../BodyText";
import TitleText from "../TitleText";
import MainButton from "../MainButton";
import Card from "./Card";
const OrderItem = (props) => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <Card style={styles.root}>
      <View style={styles.summary}>
        <TitleText style={styles.amount}>${props.amount.toFixed(2)}</TitleText>
        <BodyText style={styles.date}>{props.date}</BodyText>
      </View>
      <View style={styles.action}>
        <MainButton
          onPress={() => {
            setShowDetails((prevState) => !prevState);
          }}
        >
          {showDetails ? "Hide" : "Show"} Details
        </MainButton>
      </View>
      {showDetails && (
        <View>
          {props.items.map((cartItem) => (
            <CardItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
              hideDelete={true}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  amount: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: "#888",
  },
  action: {
    alignItems: "center",
  },
});

export default OrderItem;
