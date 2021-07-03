import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cartItem";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      let updatedOrNewCartItem = null;
      const productToAdd = payload;
      const pPrice = productToAdd.price;
      const pTitle = productToAdd.title;
      const items = state.items;
      if (items[productToAdd.id]) {
        const item = items[productToAdd.id];
        const sum = item.sum + item.price;
        updatedOrNewCartItem = new CartItem(
          item.quantity + 1,
          pPrice,
          pTitle,
          sum
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, pPrice, pTitle, pPrice);
      }
      return {
        ...state,
        items: {
          ...items,
          [productToAdd.id]: updatedOrNewCartItem,
        },
        totalAmount: state.totalAmount + pPrice,
      };
    case REMOVE_FROM_CART:
      const id = payload;
      const newItems = {
        ...state.items,
      };
      const item = newItems[id];
      let updatedCartItems;
      if (item) {
        if (item.quantity === 1) {
          delete newItems[id];
          updatedCartItems = newItems;
        } else {
          const updatedCartItem = new CartItem(
            item.quantity - 1,
            item.price,
            item.title,
            item.sum - item.price
          );
          updatedCartItems = {
            ...newItems,
            [id]: updatedCartItem,
          };
        }
        return {
          ...state,
          items: updatedCartItems,
          totalAmount: state.totalAmount - item.price,
        };
      } else {
        return state;
      }
    case ADD_ORDER:
      return {
        ...state,
        items: {},
        totalAmount: 0,
      };
    case DELETE_PRODUCT:
      const pId = payload;
      if (!state.items[pId]) {
        return state;
      } else {
        const updatedItems = { ...state.items };
        const itemTotal = updatedItems[pId].sum;
        delete updatedItems[pId];
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount - itemTotal,
        };
      }
  }
  return state;
};
