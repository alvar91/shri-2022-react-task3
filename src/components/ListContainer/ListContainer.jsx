import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { moveTask } from "../../store/listSlice";
import List from "../List/List";
import styles from "./ListContainer.module.css";

export default function ListContainer({ lists }) {
  const dispatch = useDispatch();

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    dispatch(moveTask({ source, destination }));
  }

  return (
    <div className={styles.listContainer}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {Object.entries(lists).map(([id, list]) => (
          <List
            id={id}
            title={list.title}
            tasks={list.tasks}
            buttonContent={list.buttonContent}
            key={id}
          />
        ))}
      </DragDropContext>
    </div>
  );
}
