import PRODUCTS from "../../data/shop_dummy_data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";
import Product from "../../models/product";
const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(({ ownerId }) => ownerId === "u1"),
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter((item) => item.id !== payload),
        availableProducts: state.availableProducts.filter(
          (item) => item.id !== payload
        ),
      };
    case CREATE_PRODUCT:
      const { title, description, imageUrl, price } = payload;
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        title,
        imageUrl,
        description,
        price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (item) => item.id === payload.id
      );
      const availableProductndex = state.availableProducts.findIndex(
        (item) => item.id === payload.id
      );
      const updatedItem = new Product(
        payload.id,
        state.userProducts[productIndex].ownerId,
        payload.title,
        payload.imageUrl,
        payload.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProduct = [...state.userProducts];
      updatedUserProduct[productIndex] = updatedItem;

      const updatedAvaiableProduct = [...state.availableProducts];
      updatedAvaiableProduct[availableProductndex] = updatedItem;
      return {
        ...state,
        availableProducts: updatedAvaiableProduct,
        userProducts: updatedUserProduct,
      };
  }
  return state;
};
