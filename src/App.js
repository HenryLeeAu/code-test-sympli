import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getInitialPage,
  getPreviousPage,
  getNextPage,
} from "./redux/actions/currentPage";

import Table from "./component/Table";
import Modal from "./component/Modal";
import StatusWrapper from "./component/StatusWrapper";

const App = () => {
  const dispatch = useDispatch();

  const loadingStatus = useSelector((state) => state.currentPage.status);

  const list = useSelector((state) => state.currentPage.data.results);
  const enablePrev = useSelector((state) => !!state.currentPage.data.previous);
  const enableNext = useSelector((state) => !!state.currentPage.data.next);

  const [selectedData, setSelectedData] = React.useState(null);

  const clickNext = () => {
    dispatch(getNextPage());
  };

  const clickPrevious = () => {
    dispatch(getPreviousPage());
  };

  React.useEffect(() => {
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
            onClick={(obj) => setSelectedData(obj)}
          />
        </>
      </StatusWrapper>
      <Modal
        isOpen={!!selectedData}
        onClose={() => setSelectedData(null)}
      ></Modal>
    </>
  );
};

export default App;
