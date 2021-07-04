import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const deleteProduct = (id) => {
  return async (dispatch) => {
    const resp = await fetch(
      `https://react-native-course-cd169-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
  };
};
export const createProduct = (token, title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      const resp = await fetch(
        `https://react-native-course-cd169-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            price,
            ownerId: userId,
          }),
        }
      );
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.error);
      }
      dispatch({
        type: CREATE_PRODUCT,
        payload: {
          id: data.name,
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        },
      });
    } catch (e) {
      throw e;
    }
  };
};

export const updateProduct = (token, id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const tok = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const resp = await fetch(
        `https://react-native-course-cd169-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json?auth=${tok}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            ownerId: userId,
          }),
        }
      );
      const respData = await resp.json();
      if (!resp.ok) {
        throw new Error(respData.error);
      }
      dispatch({
        type: UPDATE_PRODUCT,
        payload: {
          id,
          title,
          description,
          imageUrl,
        },
      });
    } catch (e) {
      throw e;
    }
  };
};

export const fetchProdcuts = () => {
  return async (dispatch) => {
    try {
      const resp = await fetch(
        "https://react-native-course-cd169-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      );
      if (!resp.ok) {
        throw new Error("Something went wrong");
      }
      const data = await resp.json();

      const loadedProdcuts = [];
      for (const key in data) {
        loadedProdcuts.push(
          new Product(
            key,
            "u1",
            data[key].title,
            data[key].imageUrl,
            data[key].description,
            data[key].price
          )
        );
      }
      dispatch({
        type: FETCH_PRODUCTS,
        payload: {
          products: loadedProdcuts,
        },
      });
    } catch (e) {
      throw e;
    }
  };
};
