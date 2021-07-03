import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import BodyText from "../BodyText";
import TitleText from "../TitleText";
import Card from "./Card";

const ProductItem = (props) => {
  const { title, price, imageUrl } = props;

  const Wrapper =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableWithoutFeedback;

  return (
    <Card style={styles.root}>
      <Wrapper onPress={props.onSelect} useForeground>
        <View>
          <Image style={styles.image} source={{ uri: imageUrl }} />
          <View style={styles.details}>
            <TitleText style={styles.title}>{title}</TitleText>
            <BodyText style={styles.price}>${price.toFixed(2)}</BodyText>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </View>
      </Wrapper>
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 20,
    height: 300,
    overflow: "hidden",
  },
  title: {},
  image: {
    width: "100%",
    height: "60%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
  price: {
    color: "#888",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
});

export default ProductItem;
