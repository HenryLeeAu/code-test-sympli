import axios from "axios";
import { UPDATE_CURRENT_PAGE, UPDATE_LOADING_STATUS } from "../constants";

const updateLoadingStatus = (status) => {
  return {
    type: UPDATE_LOADING_STATUS,
    payload: {
      status,
    },
  };
};

const updateCurrentPage = (pageContent) => {
  return {
    type: UPDATE_CURRENT_PAGE,
    payload: pageContent,
  };
};

const fetchPageContent = (url) => (dispatch) => {
  dispatch(updateLoadingStatus("LOADING"));

  axios
    .get(url)
    .then(({ data }) => {
      dispatch(updateCurrentPage(data));
      dispatch(updateLoadingStatus("SUCCESS"));
    })
    .catch((error) => {
      dispatch(updateLoadingStatus("FAILED"));
    });
};

export const getNextPage = () => (dispatch, getState) => {
  dispatch(fetchPageContent(getState().currentPage.data.next));
};

export const getPreviousPage = () => (dispatch, getState) => {
  console.log(getState().currentPage);
  dispatch(fetchPageContent(getState().currentPage.data.previous));
};

export const getInitialPage = () => (dispatch) => {
  dispatch(fetchPageContent("https://swapi.dev/api/people"));
};
