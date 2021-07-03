import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import BodyText from "../../components/BodyText";
import MainButton from "../../components/MainButton";
import { addToCart } from "../../store/actions/cart";

const ProductDetailsScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam("productId");
  const productDetails = useSelector(
    (state) => state.products.availableProducts
  ).find((item) => item.id === productId);
  const onAddToCart = () => {
    dispatch(addToCart(productDetails));
  };
  return (
    <ScrollView style={styles.root}>
      <Image style={styles.image} source={{ uri: productDetails.imageUrl }} />
      <View style={styles.action}>
        <MainButton onPress={onAddToCart}>Add To Cart</MainButton>
      </View>
      <BodyText style={styles.price}>
        ${productDetails.price.toFixed(2)}
      </BodyText>
      <BodyText style={styles.description}>
        {productDetails.description}
      </BodyText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {},
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
  action: {
    marginVertical: 10,
    alignItems: "center",
  },
});
ProductDetailsScreen.navigationOptions = (props) => {
  return {
    headerTitle: props.navigation.getParam("productTitle"),
  };
};

export default ProductDetailsScreen;
