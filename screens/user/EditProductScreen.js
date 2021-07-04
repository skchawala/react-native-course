import React, { useCallback, useEffect, useReducer } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import CustomHeaderButtons from "../../components/CustomHeaderButtons";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct, createProduct } from "../../store/actions/products";
import Input from "../../components/shop/Input";
const getInitialValue = (data, key) => {
  return data ? data[key] : "";
};

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.payload.input]: action.payload.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.payload.input]: action.payload.isValid,
    };
    let isFormValid = true;
    for (const key in updatedValidities) {
      isFormValid = isFormValid && updatedValidities[key];
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      isFormValid: isFormValid,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: getInitialValue(editedProduct, "title"),
      imageUrl: getInitialValue(editedProduct, "imageUrl"),
      price: getInitialValue(editedProduct, "price"),
      description: getInitialValue(editedProduct, "description"),
    },
    inputValidities: {
      title: !!editedProduct,
      imageUrl: !!editedProduct,
      price: !!editedProduct,
      description: !!editedProduct,
    },
    isFormValid: !!editedProduct,
  });
  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      payload: {
        value: text,
        isValid,
        input: inputIdentifier,
      },
    });
  };
  const { title, description, price, imageUrl } = formState.inputValues;

  const submitHandler = useCallback(async () => {
    if (!formState.isFormValid) {
      Alert.alert("Wrong Input!", "Please check the error in form", [
        {
          text: "Okay",
        },
      ]);
      return;
    }
    let action;
    if (editedProduct) {
      action = updateProduct(token, productId, title, description, imageUrl);
    } else {
      action = createProduct(token, title, description, imageUrl, +price);
    }

    try {
      await dispatch(action);
    } catch (e) {
      console.log(action);
      Alert.alert("Error Occured", e.message, [
        {
          text: "Ok",
        },
      ]);
    }

    props.navigation.goBack();
  }, [dispatch, productId, formState, token]);

  useEffect(() => {
    props.navigation.setParams({
      submitHandler: submitHandler,
    });
  }, [submitHandler]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.root}>
        <View style={styles.form}>
          <Input
            label="Title"
            value={title}
            onChangeText={textChangeHandler.bind(this, "title")}
            errorMsg={"Please Enter A Valid Text"}
            isValid={formState.inputValidities.title}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect={true}
            returnKeyType="next"
          />

          <Input
            label="Image Url"
            value={imageUrl}
            onChangeText={textChangeHandler.bind(this, "imageUrl")}
            errorMsg={"Please Enter A Valid Url"}
            isValid={formState.inputValidities.imageUrl}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect={true}
            returnKeyType="next"
          />
          {!editedProduct && (
            <Input
              label="Price"
              value={price}
              onChangeText={textChangeHandler.bind(this, "price")}
              errorMsg={"Please Enter A Valid Amount"}
              isValid={formState.inputValidities.price}
              keyboardType="decimal-pad"
              autoCapitalize="sentences"
              autoCorrect={true}
              returnKeyType="next"
            />
          )}

          <Input
            label="Description"
            value={description}
            onChangeText={textChangeHandler.bind(this, "description")}
            errorMsg={"Please Enter A Valid Text"}
            isValid={formState.inputValidities.description}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect={true}
            multiline={true}
            numberOfLines={3}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {},
  form: {
    margin: 20,
  },
});

EditProductScreen.navigationOptions = (props) => {
  const productId = props.navigation.getParam("productId");
  const submitHandler = props.navigation.getParam("submitHandler");
  return {
    headerTitle: productId ? "Edit Product" : "Add Product",
    headerRight: () => (
      <CustomHeaderButtons
        color={"white"}
        onPress={submitHandler}
        iconName={"md-checkmark"}
        isLeft={false}
      />
    ),
  };
};
export default EditProductScreen;
