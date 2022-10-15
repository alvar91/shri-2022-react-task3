import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasksRequest } from "../../store/listSlice";
import { selectListsByFilter, selectListLoading } from "../../store/selectors";
import FilterContainer from "../../components/FilterContainer/FilterContainer";
import ListContainer from "../../components/ListContainer/ListContainer";
import Modal from "../../components/Modal/Modal";
import ModalCreateTask from "../../components/ModalCreateTask/ModalCreateTask";
import ModalEditTask from "../../components/ModalEditTask/ModalEditTask";
import Loader from "../../components/Loader/Loader";
import styles from "./BoardPage.module.css";

export default function BoardPage() {
  const dispatch = useDispatch();

  const lists = useSelector(selectListsByFilter);
  const loading = useSelector(selectListLoading);

  useEffect(() => {
    if (!lists) dispatch(getAllTasksRequest());
  }, [lists, dispatch]);

  if (loading || !lists) {
    return <Loader />;
  }

  return (
    <div className={styles.boardPage}>
      <FilterContainer />
      <ListContainer lists={lists} />

      <Routes>
        {["/create/:listId", "/create"].map((path, index) => {
          return (
            <Route
              path={path}
              exact
              element={
                <Modal withCloseCross={true}>
                  <ModalCreateTask />
                </Modal>
              }
              key={index}
            />
          );
        })}
        <Route
          path="/edit/:taskId"
          element={
            <Modal withCloseCross={true}>
              <ModalEditTask lists={lists} />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
}
