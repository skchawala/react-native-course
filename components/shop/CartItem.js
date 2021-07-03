import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../../components/BodyText";
import TitleText from "../../components/TitleText";

const CartItem = (props) => {
  return (
    <View style={styles.root}>
      <View style={styles.itemData}>
        <BodyText style={styles.quantity}>{props.quantity} </BodyText>
        <TitleText style={styles.title}>{props.title}</TitleText>
      </View>
      <View style={styles.itemData}>
        <BodyText style={styles.amount}>${props.amount}</BodyText>
        {!props.hideDelete && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    marginLeft: 20,
  },
  quantity: {
    color: "#888",
    fontSize: 16,
  },
  title: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
  },
});

export default CartItem;
