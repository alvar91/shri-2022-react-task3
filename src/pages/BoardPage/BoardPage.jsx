import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectListsByFilter } from "../../store/selectors";
import FilterContainer from "../../components/FilterContainer/FilterContainer";
import ListContainer from "../../components/ListContainer/ListContainer";
import Modal from "../../components/Modal/Modal";
import ModalCreateTask from "../../components/ModalCreateTask/ModalCreateTask";
import ModalEditTask from "../../components/ModalEditTask/ModalEditTask";
import styles from "./BoardPage.module.css";

export default function BoardPage() {
  const lists = useSelector(selectListsByFilter);

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
