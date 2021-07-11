import { ADD_PLACE, FETCH_PLACE } from "../actions/places";
import Place from "../../models/place";
const initialState = {
  places: [],
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PLACE:
      const { id, title, imageUrl, address, lat, lng } = payload;
      const newPlace = new Place(id, title, imageUrl, address, lat, lng);
      return {
        ...state,
        places: [...state.places, newPlace],
      };
    case FETCH_PLACE:
      return {
        ...state,
        places: payload.map(
          (p) => new Place(p.id, p.title, p.imageUrl, p.address, p.lat, p.lng)
        ),
      };
  }
  return state;
};
