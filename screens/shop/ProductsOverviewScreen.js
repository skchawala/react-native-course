import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cart";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButtons from "../../components/CustomHeaderButtons";
import colors from "../../constants/colors";
import MainButton from "../../components/MainButton";
import { fetchProdcuts } from "../../store/actions/products";
import BodyText from "../../components/BodyText";
const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const [error, setError] = useState("");

  const onViewDetails = (itemData) => {
    props.navigation.navigate({
      routeName: "ProductDetails",
      params: {
        productId: itemData.item.id,
        productTitle: itemData.item.title,
      },
    });
  };
  const loadProducts = useCallback(
    (initial) => {
      if (!initial) {
        setIsRefreshing(true);
      }
      return dispatch(fetchProdcuts())
        .then(() => {
          setIsRefreshing(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsRefreshing(false);
        });
    },
    [setError, setIsLoading, dispatch]
  );
  useEffect(() => {
    loadProducts(true)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
    const willFocus = props.navigation.addListener("willFocus", loadProducts);
    return () => {
      willFocus.remove();
    };
  }, [loadProducts]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <BodyText>No Data Found</BodyText>
      </View>
    );
  }
  if (!isLoading && error) {
    return (
      <View style={styles.centered}>
        <BodyText style={{ color: "red" }}>An Error Occurred</BodyText>
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
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
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
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
