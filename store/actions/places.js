import * as FileSystem from "expo-file-system";
export const ADD_PLACE = "ADD_PLACE";
export const FETCH_PLACE = "FETCH_PLACE";
import { insertPlace, fetchPlaces } from "../../db";
export const addPlace = (title, imageUrl, lat, lng) => {
  return async (dispatch) => {
    const fileName = imageUrl.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    console.log({ fileName, imageUrl, newPath });

    try {
      await FileSystem.moveAsync({
        from: imageUrl,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        imageUrl,
        "Pala Kumher rj",
        lat,
        lng
      );

      dispatch({
        type: ADD_PLACE,
        payload: {
          title,
          imageUrl: newPath,
          id: dbResult.insertId,
          address: "Pala Kumher rj",
          lat,
          lng,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};
export function loadPlaces() {
  return async (dispatch) => {
    try {
      const result = await fetchPlaces();
      dispatch({
        type: FETCH_PLACE,
        payload: result.rows._array,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
