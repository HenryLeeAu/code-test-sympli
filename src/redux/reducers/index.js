import { combineReducers } from "redux";
import currentPage from "./currentPage";
import fetchedFilms from "./fetchedFilms";

export default combineReducers({
  currentPage,
  fetchedFilms,
});
