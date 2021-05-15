import React from "react";
import { View, StyleSheet, Alert, ScrollView, Text } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";

const generateRandomNumberBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNumber = Math.floor(Math.random() * (max - min)) + min;
  if (rndNumber === exclude) {
    return generateRandomNumberBetween(min, max, exclude);
  }
  return rndNumber;
};

const renderListItem = (guess, roundNumber) => {
  return (
    <View key={guess} style={styles.listItem}>
      <BodyText>#{roundNumber}</BodyText>
      <BodyText>{guess}</BodyText>
    </View>
  );
};

const GameScreen = (props) => {
  const initialGuess = generateRandomNumberBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = React.useState(initialGuess);
  const [passGuesses, setPastGuesses] = React.useState([initialGuess]);

  React.useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.gameOverHandler(passGuesses.length);
    }
  }, [currentGuess, passGuesses, props.userChoice, props.gameOverHandler]);

  const currentLow = React.useRef(1);
  const currentHigh = React.useRef(100);
  const nextGuesHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      return Alert.alert("Don't lie!", "You know that this is wrong", [
        {
          text: "Sorry",
          style: "cancel",
        },
      ]);
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    }
    if (direction === "greater") {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomNumberBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((pastGuesses) => [nextNumber, ...pastGuesses]);
  };

  return (
    <View style={styles.root}>
      <TitleText style={styles.title}>Opponent's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <View style={styles.button}>
          <MainButton onPress={() => nextGuesHandler("lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.button}>
          <MainButton onPress={() => nextGuesHandler("greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
      </Card>
      <View style={styles.list}>
        <ScrollView contentContainerStyle={styles.list}>
          {passGuesses.map((guess, index) =>
            renderListItem(guess, passGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 20,
    paddingHorizontal: 15,
  },
  button: {},
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 15,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  list: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
    flex: 1,
  },
});

export default GameScreen;
