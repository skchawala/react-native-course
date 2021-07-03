import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import TitleText from "../TitleText";
import BodyText from "../BodyText";
const Input = (props) => {
  const { label, isValid, errorMsg } = props;
  return (
    <View style={styles.formControl}>
      <TitleText style={styles.label}>{label}</TitleText>
      <TextInput {...props} style={styles.input} />
      {!isValid && (
        <View style={styles.errorContainer}>
          <BodyText style={styles.errorText}>{errorMsg}</BodyText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
    marginBottom: 5,
  },
  label: {},
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
  },
});

export default Input;
