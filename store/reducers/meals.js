import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTER } from "../actions/meals";
const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoritesMeals: [],
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_FAVORITE:
      const { mealId } = payload;
      const existingIndex = state.favoritesMeals.findIndex(
        (meal) => meal.id === mealId
      );
      if (existingIndex > -1) {
        return {
          ...state,
          favoritesMeals: state.favoritesMeals.filter(
            (meal) => meal.id !== mealId
          ),
        };
      } else {
        const meal = state.meals.find((m) => m.id === mealId);
        return {
          ...state,
          favoritesMeals: [...state.favoritesMeals, meal],
        };
      }
    case SET_FILTER:
      const { isGlutenFree, isVegan, isVegetarian, isLactoseFree } = payload;
      const filteredMeals = state.meals.filter((meal) => {
        if (isGlutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (isVegan && !meal.isVegan) {
          return false;
        }
        if (isVegetarian && !meal.isVegetarian) {
          return false;
        }
        if (isLactoseFree && !meal.isLactoseFree) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        filteredMeals: filteredMeals,
      };
    default:
      return state;
  }
};
