import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasksRequest } from "../../store/listSlice";
// import { selectListsByFilter } from "../../store/selectors";
import { selectListsByFilter, selectLoading } from "../../store/selectors";
import FilterContainer from "../../components/FilterContainer/FilterContainer";
import ListContainer from "../../components/ListContainer/ListContainer";
import Modal from "../../components/Modal/Modal";
import ModalCreateTask from "../../components/ModalCreateTask/ModalCreateTask";
import ModalEditTask from "../../components/ModalEditTask/ModalEditTask";
import styles from "./BoardPage.module.css";

export default function BoardPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasksRequest());
  }, [dispatch]);

  const lists = useSelector(selectListsByFilter);
  const loading = useSelector(selectLoading);

  // const fetchTasks = useCallback(async () => {
  //   try {
  //     await dispatch(getAllTasksRequest());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchTasks();
  // }, [fetchTasks]);

  // if(Object.keys(lists) === 0) dispatch(getAllTasksRequest());

  // console.log(lists);
  // console.log("loading", loading);

  if (loading) {
    return (
      <div className={styles.boardPage}>Загрузка данных, подождите...</div>
    );
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
