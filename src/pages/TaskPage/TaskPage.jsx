import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate, Route, Routes } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectTask } from "../../store/selectors";
import { editTask, removeTask } from "../../store/listSlice";
import TitledContainer from "../../components/TitledContainer/TitledContainer";
import Input from "../../components/Input/Input";
import Comment from "../../components/Comment/Comment";
import Button from "../../components/Button/Button";
import TagContainer from "../../components/TagContainer/TagContainer";
import Modal from "../../components/Modal/Modal";
import ModalDelete from "../../components/ModalDelete/ModalDelete";
import ModalAddComment from "../../components/ModalAddComment/ModalAddComment";
import styles from "./TaskPage.module.css";
import { setTask } from "../../store/taskSlice";
import TagSelector from "../../components/TagSelector/TagSelector";

export default function TaskPage() {
  const taskData = useSelector(selectTask);
  const [task, setCurrentTask] = useState(taskData);

  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();

  const navigate = useNavigate();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const [tags, setTags] = useState(task.tags);

  function deleteTag(tagToDelete) {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  }

  const [comments, setComments] = useState(task.comments);

  function updateTask(
    data = { title: task.title, description: task.description }
  ) {
  
    const newTask = { id: task.id, ...data, tags, comments };

    dispatch(editTask(newTask));
    dispatch(setTask(newTask));
    setCurrentTask(newTask);
  }

  function submitHandler(data) {
    setEditing(false);
    updateTask(data);
  }

  useEffect(() => {
    updateTask();
    // eslint-disable-next-line
  }, [comments]);

  function addComment({ name, text }) {
    setComments([...comments, { id: uuid(), userName: name, text }]);
  }

  function deleteComment(id) {
    setComments(comments.filter((comment) => comment.id !== id));
  }

  function deleteTask() {
    setDeleteModalOpen(false);
    dispatch(removeTask({ id: task.id }));
    navigate("/");
  }

  return (
    <div className={styles.taskPage}>
      <button className={styles.returnButton} onClick={() => navigate(`/`)}>
        Вернуться к задачам
      </button>

      <TitledContainer
        title="Todo"
        withOptions={true}
        options={[
          { name: "Удалить", action: () => setDeleteModalOpen(true) },
          { name: "Редактировать", action: () => setEditing(true) },
        ]}
        style={{
          width: 469,
          marginTop: 64,
        }}
      >
        <Controller
          name="title"
          control={control}
          defaultValue={task.title}
          rules={{ required: true }}
          render={({ field, ref }) => (
            <Input
              isMultiline={false}
              placeholder="Название"
              style={{ marginBottom: 8 }}
              disabled={!editing}
              ref={ref}
              {...field}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue={task.description}
          render={({ field, ref }) => (
            <Input
              isMultiline={true}
              placeholder="Описание"
              disabled={!editing}
              ref={ref}
              {...field}
            />
          )}
        />
        <div className={styles.bottomContainer}>
          <TagContainer
            tags={tags}
            deletePossibility={editing}
            deleteTag={deleteTag}
          />
          {editing && (
            <TagSelector selectedTags={tags} setSelectedTags={setTags} />
          )}
          <article className={styles.commentContainer}>
            {comments.map((comment, index) => (
              <Comment
                id={comment.id}
                userName={comment.userName}
                text={comment.text}
                deletePossibility={editing}
                deleteComment={deleteComment}
                key={comment.id}
              />
            ))}
          </article>

          {
            <button
              className={styles.addCommentButton}
              onClick={() => navigate(`/full/${task.id}/comment/create`)}
            >
              Добавить комментарий
            </button>
          }
        </div>
        {
          <div className={styles.buttonContainer}>
            <Button
              style={{
                width: 152,
              }}
              onClick={handleSubmit(submitHandler)}
            >
              Сохранить
            </Button>
          </div>
        }
      </TitledContainer>

      {deleteModalOpen && (
        <Modal>
          <ModalDelete
            deleteTask={deleteTask}
            close={() => setDeleteModalOpen(false)}
          />
        </Modal>
      )}

      <Routes>
        <Route
          path="/comment/create"
          element={
            <Modal withCloseCross={true}>
              <ModalAddComment addHandler={addComment} task={task} />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
}
