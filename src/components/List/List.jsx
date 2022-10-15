import React from "react";
import { useNavigate } from "react-router-dom";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "../TaskCard/TaskCard";
import Button from "../Button/Button";
import TitledContainer from "../TitledContainer/TitledContainer";
import styles from "./List.module.css";

export default function List({ id, title, tasks, buttonContent }) {
  const navigate = useNavigate();

  return (
    <TitledContainer
      title={title}
      withOptions={false}
    >
      <Droppable droppableId={id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.length === 0 ? (
              <p className={styles.emptyText}>Нет задач</p>
            ) : (
              tasks?.map((task, index) => (
                <Draggable draggableId={task.id} index={index} key={task.id}>
                  {(provided) => (
                    <div
                      key={task.id}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <TaskCard
                        id={task.id}
                        title={task.title}
                        tags={task.tags}
                        comments={task.comments}
                        description={task.description}
                        style={{
                          marginBottom: index < tasks.length - 1 ? 10 : 0,
                        }}
                      />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {buttonContent !== "" && (
        <Button
          style={{ marginTop: 10 }}
          onClick={() => navigate(`/create/${id}`)}
        >
          {buttonContent}
        </Button>
      )}
    </TitledContainer>
  );
}
