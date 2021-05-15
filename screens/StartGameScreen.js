import React from "react";
import {
  View,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Card from "../components/Card";
import colors from "../constants/colors";
import strings from "../constants/strings";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  const [enteredNumber, setEnteredNumber] = React.useState("");
  const [selectedNumber, setSelectedNumber] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);
  const inputHandler = (inputText) => {
    setEnteredNumber(inputText.replace(/[^0-9]/g, ""));
  };

  const onCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  const resetInputHandler = () => {
    setEnteredNumber("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid Number",
        "Number Has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredNumber("");
  };

  const onPlayGameClick = () => {
    props.startGameHnadler(selectedNumber);
  };

  return (
    <TouchableWithoutFeedback onPress={onCloseKeyboard}>
      <View style={styles.root}>
        <TitleText style={styles.title}>
          {strings.startGameScreenTitle}
        </TitleText>
        <Card style={styles.card}>
          <BodyText>{strings.inputLabel}</BodyText>
          <Input
            style={styles.input}
            keyboardType="number-pad"
            autoCorrect={false}
            maxLength={2}
            onChangeText={inputHandler}
            value={enteredNumber}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={colors.accent}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={colors.primary}
              />
            </View>
          </View>
        </Card>
        {!!confirmed && (
          <Card style={styles.confirmedViewCard}>
            <BodyText style={styles.title2}>You Selected</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <View style={styles.playGameButton}>
              <MainButton onPress={onPlayGameClick}>START GAME</MainButton>
            </View>
          </Card>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  title2: {
    fontFamily: "open-sans",
  },

  input: {
    width: "100%",
    textAlign: "center",
  },
  inputLabel: {
    fontFamily: "open-sans",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonWrapper: {
    width: "30%",
  },
  card: {
    width: "100%",
    alignItems: "center",
  },
  confirmedViewCard: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  playGameButton: {
    marginTop: 10,
  },
});

export default StartGameScreen;
