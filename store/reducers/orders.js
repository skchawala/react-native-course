import Order from "../../models/order";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ORDER:
      const { cartItems, totalAmount } = payload;
      const newOrder = new Order(
        new Date().toString(),
        cartItems,
        totalAmount,
        new Date()
      );
      return {
        ...state,
        orders: [...state.orders, newOrder],
      };
  }
  return state;
};
