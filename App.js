import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import strings from "./constants/strings";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import openSans from "./assets/fonts/OpenSans-Regular.ttf";
import openSansBold from "./assets/fonts/OpenSans-Bold.ttf";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": openSans,
    "open-sans-bold": openSansBold,
  });
};
const App = (props) => {
  const [isFontsLoaded, setIsFontsLoaded] = React.useState(false);
  const [userNumber, setUserNumber] = React.useState();
  const [guessedRounds, setGuessRounds] = React.useState(0);

  if (!isFontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  const startGameHnadler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };
  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  };
  const onRestart = () => {
    setUserNumber();
    setGuessRounds(0);
  };
  let content = <StartGameScreen startGameHnadler={startGameHnadler} />;

  if (userNumber && guessedRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} gameOverHandler={gameOverHandler} />
    );
  } else if (guessedRounds > 0) {
    content = (
      <GameOverScreen
        restart={onRestart}
        userNumber={userNumber}
        guessedRounds={guessedRounds}
      />
    );
  }

  return (
    <View style={styles.root}>
      <Header title={strings.appTitle} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
