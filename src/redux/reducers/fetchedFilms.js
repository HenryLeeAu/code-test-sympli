import { UPDATE_FILM } from "../constants";

const initState = [];

const fetchedFilms = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_FILM:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default fetchedFilms;
