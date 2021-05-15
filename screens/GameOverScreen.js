import React from "react";
import { View, StyleSheet, Button, Image, Text } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import colors from "../constants/colors";
import MainButton from "../components/MainButton";
const GameOverScreen = (props) => {
  const onPlayAgain = () => {
    props.restart();
  };
  return (
    <View style={styles.root}>
      <TitleText>The Game is Over</TitleText>
      <Image
        style={styles.image}
        source={{
          uri:
            "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_1280.jpg",
        }}
      />
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your Phone Needed{" "}
          <Text style={styles.highlight}>{props.guessedRounds}</Text> Rounds to
          guess the Number{" "}
          <Text style={styles.highlight}>{props.userNumber}.</Text>
        </BodyText>
      </View>
      <View style={styles.button}>
        <MainButton  onPress={onPlayAgain} >NEW GAME</MainButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginVertical: 15,
  },

  button: {
    marginTop: 10,
  },
  resultContainer: {
    width: "80%",
    marginVertical: 20,
  },
  resultText: {
    textAlign: "center",
    fontSize: 20,
  },

  highlight: {
    color: colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
