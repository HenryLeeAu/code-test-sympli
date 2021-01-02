import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getInitialPage,
  getPreviousPage,
  getNextPage,
} from "./redux/actions/currentPage";

import { getFilmInfo } from "./redux/actions/fetchedFilms";

import Table from "./component/Table";
import Modal from "./component/Modal";
import StatusWrapper from "./component/StatusWrapper";
import PopupContent from "./component/PopupContent";

const App = () => {
  const dispatch = useDispatch();

  const loadingStatus = useSelector((state) => state.currentPage.status);

  const list = useSelector((state) => state.currentPage.data.results);
  const enablePrev = useSelector((state) => !!state.currentPage.data.previous);
  const enableNext = useSelector((state) => !!state.currentPage.data.next);
  const fetchedFilms = useSelector((state) => state.fetchedFilms);

  const [selectedData, setSelectedData] = useState(null);

  const clickNext = () => {
    dispatch(getNextPage());
  };

  const clickPrevious = () => {
    dispatch(getPreviousPage());
  };

  const findMatchedFilm = (filmUrl) =>
    fetchedFilms.find(({ url }) => url === filmUrl);

  const handleOnRowClick = (obj) => {
    setSelectedData(obj);

    obj.films.forEach((filmUrl) => {
      //fetch Film info if it's not in fetchedFilms
      if (!findMatchedFilm(filmUrl)) {
        dispatch(getFilmInfo(filmUrl));
      }
    });
  };

  const handleOnModalClose = () => {
    setSelectedData(null);
  };

  const mapFilmsTitleArray = selectedData?.films.map(
    (filmUrl) => findMatchedFilm(filmUrl)?.title || ""
  );

  useEffect(() => {
    dispatch(getInitialPage());
  }, [dispatch]);

  return (
    <>
      <StatusWrapper loadingStatus={loadingStatus}>
        <>
          <Table
            list={list}
            clickNext={clickNext}
            clickPrevious={clickPrevious}
            enablePrev={enablePrev}
            enableNext={enableNext}
            onClick={handleOnRowClick}
          />
        </>
      </StatusWrapper>
      <Modal isOpen={!!selectedData} onClose={handleOnModalClose}>
        <PopupContent
          name={selectedData?.name}
          height={selectedData?.height}
          birth={selectedData?.birth_year}
          gender={selectedData?.gender}
          films={mapFilmsTitleArray}
        />
      </Modal>
    </>
  );
};

export default App;
