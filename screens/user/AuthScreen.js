import React, { useState, useReducer, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import Input from "../../components/shop/Input";
import Card from "../../components/shop/Card";
import Button from "../../components/MainButton";
import colors from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { signUp, login } from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import { createProduct, updateProduct } from "../../store/actions/products";
import BodyText from "../../components/BodyText";

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

const AuthScreen = (props) => {
  const dispatch = useDispatch();

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    isFormValid: false,
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
  const { email, password } = formState.inputValues;

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

    if (isSignUpMode) {
      action = signUp(email, password);
    } else {
      action = login(email, password);
    }

    try {
      setIsLoading(true);
      setError("");
      await dispatch(action);
      props.navigation.navigate("Shop");
    } catch (e) {
      console.log(e);
      setError(e.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={1}
      style={styles.root}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id={"email"}
              label="E-Mail"
              keyboardType={"email-address"}
              required
              email
              autoCapitalize="none"
              errorMsg="Please Enter A Valid Email"
              isValid={formState.inputValidities.email}
              onChangeText={textChangeHandler.bind(this, "email")}
              value={email}
            />
            <Input
              id={"password"}
              label="Password"
              securTextEntry
              keyboardType={"default"}
              required
              autoCapitalize="none"
              errorMsg="Please Enter A Valid Password"
              isValid={formState.inputValidities.password}
              onChangeText={textChangeHandler.bind(this, "password")}
              value={password}
            />
            <View style={styles.buttonContainer}>
              <Button onPress={submitHandler} disabled={isLoading}>
                {isLoading && (
                  <ActivityIndicator size="small" color={colors.primary} />
                )}
                {isSignUpMode ? "Sign Up" : "Login"}
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                backgroundColor={colors.accent}
                onPress={() => {
                  setIsSignUpMode((prevValue) => !prevValue);
                }}
                disabled={isLoading}
              >
                Switch To {isSignUpMode ? "Login" : "Sign Up"}
              </Button>
            </View>
            {!!error && (
              <View style={styles.errorContainer}>
                <BodyText style={styles.errorText}>{error}</BodyText>
              </View>
            )}
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
AuthScreen.navigationOptions = {
  headerTitle: "Login",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
  errorContainer: {
    marginTop: 5,
  },
  errorText: {
    fontSize: 13,
    color: "red",
    textAlign: "center",
  },
  submitButton: {},
});

export default AuthScreen;
