import React, { useCallback, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Input from "../../components/shop/Input";
import MainButton from "../../components/MainButton";
import { useDispatch } from "react-redux";
import { addPlace } from "../../store/actions/places";
import ImgPicker from "../../components/ImagePicker";
import LocationPicker from "../../components/LocationPicker";

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
const NewPlaceScreen = (props) => {
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: "",
      imageUrl: "",
      lat: "",
      lng: "",
    },
    inputValidities: {
      title: false,
      imageUrl: false,
      lat: false,
      lng: false,
    },
    isFormValid: false,
  });
  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (`${text}`.trim().length > 0) {
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
  const { title, imageUrl, lat, lng } = formState.inputValues;

  const submitHandler = useCallback(async () => {
    dispatch(addPlace(title, imageUrl, lat, lng));
    props.navigation.goBack();
  }, [title, imageUrl, lat, lng, dispatch]);
  const onLocPicked = useCallback((location) => {
    if (location) {
      console.log("location", location);
      textChangeHandler("lat", location.lat);
      textChangeHandler("lng", location.lng);
    }
  }, []);

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
          <ImgPicker onSelect={textChangeHandler.bind(this, "imageUrl")} />
          <LocationPicker
            navigation={props.navigation}
            onLocPicked={onLocPicked}
          />
          <MainButton onPress={submitHandler}>Save Place</MainButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

NewPlaceScreen.navigationOptions = (props) => {
  return {
    headerTitle: "Add Place",
  };
};
const styles = StyleSheet.create({
  root: {},
  form: {
    margin: 30,
  },
});

export default NewPlaceScreen;
