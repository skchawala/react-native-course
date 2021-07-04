import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../constants/colors";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/actions/auth";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        return props.navigation.navigate("Auth");
      } else {
        const { token, userId, expiryDate } = JSON.parse(userData);
        if (new Date(expiryDate) <= new Date() || !userId || !token) {
          return props.navigation.navigate("Auth");
        } else {
          props.navigation.navigate("Shop");
          dispatch(authenticate(token, userId));
        }
      }
    };
    tryLogin();
  }, []);

  return (
    <View style={styles.root}>
      <ActivityIndicator size={"large"} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StartUpScreen;
