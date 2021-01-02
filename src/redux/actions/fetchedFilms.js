import axios from "axios";

import { UPDATE_FILM } from "../constants";

const updateFilm = (film) => {
  return {
    type: UPDATE_FILM,
    payload: film,
  };
};

export const getFilmInfo = (url) => (dispatch) => {
  axios
    .get(url)
    .then(({ data }) => {
      dispatch(updateFilm(data));
    })
    .catch((error) => {
      console.log(error);
      // handle error if necessary
    });
};
