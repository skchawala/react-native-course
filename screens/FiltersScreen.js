import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import CustomHeaderButtons from "../components/CustomHeaderButtons";
import colors from "../constants/colors";
import { setFilter } from "../store/actions/meals";
import { useDispatch } from "react-redux";

const FilterItem = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.children}</Text>
      <Switch
        trackColor={{ false: "#aaaaaa", true: colors.primary }}
        thumbColor={colors.primary}
        value={props.value}
        onValueChange={props.onValueChange}
      />
    </View>
  );
};
const FiltersScreen = (props) => {
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);

  const dispatch = useDispatch();
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      isGlutenFree,
      isVegan,
      isVegetarian,
      isLactoseFree,
    };
    dispatch(setFilter(appliedFilters));
  }, [dispatch, isGlutenFree, isVegan, isVegetarian, isLactoseFree]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Available Filters</Text>
      <FilterItem value={isGlutenFree} onValueChange={setIsGlutenFree}>
        Gluten-Free
      </FilterItem>
      <FilterItem value={isVegan} onValueChange={setIsVegan}>
        Vegan
      </FilterItem>
      <FilterItem value={isVegetarian} onValueChange={setIsVegetarian}>
        Vegetarian
      </FilterItem>
      <FilterItem value={isLactoseFree} onValueChange={setIsLactoseFree}>
        Lactose-Free
      </FilterItem>
    </View>
  );
};
FiltersScreen.navigationOptions = (props) => {
  return {
    headerLeft: () => (
      <CustomHeaderButtons
        color={"white"}
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
        iconName={"menu"}
        isLeft={true}
      />
    ),
    headerRight: () => (
      <CustomHeaderButtons
        color={"white"}
        onPress={props.navigation.getParam("save")}
        iconName={"save"}
      />
    ),
  };
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
    margin: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
  },
});

export default FiltersScreen;
