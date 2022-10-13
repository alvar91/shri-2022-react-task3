import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTask } from "../../store/taskSlice";
import styles from "./TaskCard.module.css";
import Tag from "../Tag/Tag";
import classNames from "classnames";

export default function TaskCard({
  id,
  title,
  tags,
  comments,
  description,
  ...props
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function openTaskPage(e) {
    e.stopPropagation();
    dispatch(setTask({ id, title, tags, comments, description }));
    navigate(`/full/${id}`);
  }

  return (
    <div
      className={styles.card}
      {...props}
      onClick={() => {
        dispatch(setTask({ id, title, tags, comments, description }));
        navigate(`/edit/${id}`);
      }}
    >
      <div className={styles.upRow}>
        <h3 className={styles.title}>{title}</h3>
        <button
          className={styles.more}
          onClick={(e) => openTaskPage(e)}
          aria-label="More"
        ></button>
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.tagContainer}>
          {tags.map((tag, index) => (
            <Tag
              size="small"
              color={tag}
              key={tag}
            />
          ))}
        </div>
        <div className={styles.notesContainer}>
          {comments.length > 0 && (
            <img
              className={styles.noteImage}
              src="/img/taskCard/comment.svg"
              alt="Comment"
            />
          )}
          {description !== "" && (
            <img
              className={classNames(styles.noteImage, styles.descriptionImage)}
              src="/img/taskCard/description.svg"
              alt="Description"
            />
          )}
        </div>
      </div>
    </div>
  );
}
