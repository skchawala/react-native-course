import AsyncStorage from "@react-native-async-storage/async-storage";
export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
let timer;
export const authenticate = (token, userId) => {
  return (dispatch) => {
    dispatch(setLogoutTimer());
    dispatch({
      type: AUTHENTICATE,
      payload: {
        token,
        userId,
      },
    });
  };
};

export function signUp(email, password) {
  return async (dispatch) => {
    try {
      const resp = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEI7GaCaAVm0K45y4Os5WQY9t-4Ois8BU`,
        {
          method: "POST",
          "Content-Type": "application/json",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );
      const respData = await resp.json();
      if (!resp.ok) {
        throw new Error(respData.error.message);
      }
      const payload = {
        token: respData.idToken,
        userId: respData.localId,
      };
      const tInMs = parseInt(respData.expiresIn) * 1000;
      dispatch(setLogoutTimer(tInMs));
      dispatch({
        type: SIGN_UP,
        payload: payload,
      });
      const expirationDate = new Date(new Date().getTime() + tInMs);
      saveDataToStorage(payload.token, payload.userId, expirationDate);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}

export function login(email, password) {
  return async (dispatch) => {
    try {
      const resp = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEI7GaCaAVm0K45y4Os5WQY9t-4Ois8BU`,
        {
          method: "POST",
          "Content-Type": "application/json",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );
      const respData = await resp.json();
      if (!resp.ok) {
        throw new Error(respData.error.message);
      }
      const payload = {
        token: respData.idToken,
        userId: respData.localId,
      };
      const tInMs = parseInt(respData.expiresIn) * 1000;
      dispatch(setLogoutTimer(tInMs));
      dispatch({
        type: LOGIN,
        payload: payload,
      });
      const expirationDate = new Date(new Date().getTime() + tInMs);
      saveDataToStorage(payload.token, payload.userId, expirationDate);
    } catch (e) {
      console.log("errr", e);
      throw e;
    }
  };
}

export function logout() {
  clearTimeout(timer);
  AsyncStorage.removeItem("userData");
  return {
    type: LOGOUT,
  };
}

export function setLogoutTimer(timeInMillisPassed) {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    let timeInMillis = timeInMillisPassed;
    if (userData && !timeInMillis) {
      const { expiryDate } = JSON.parse(userData);
      timeInMillis = new Date(expiryDate).getTime() - new Date().getTime();
    }
    timer = setTimeout(() => {
      dispatch(logout());
    }, timeInMillisPassed);
  };
}

const saveDataToStorage = (token, userId, expirationDate) => {
  return AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate ? expirationDate.toISOString() : "",
    })
  );
};
