export const TOGGLE_FAVORITE = "toggle_favorite";
export const SET_FILTER = "set_filter";

export function toggleFavorite(mealId) {
  return {
    type: TOGGLE_FAVORITE,
    payload: {
      mealId,
    },
  };
}

export function setFilter(filterSetting) {
  return {
    type: SET_FILTER,
    payload: filterSetting,
  };
}
