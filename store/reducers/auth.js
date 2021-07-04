import { SIGN_UP, LOGIN, AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_UP:
      return {
        ...state,
        token: payload.token,
        userId: payload.userId,
      };
    case LOGIN:
      return {
        ...state,
        token: payload.token,
        userId: payload.userId,
      };
    case AUTHENTICATE:
      return {
        ...state,
        token: payload.token,
        userId: payload.userId,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
