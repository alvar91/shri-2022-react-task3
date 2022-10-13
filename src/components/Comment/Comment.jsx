import React from "react";
import styles from "./Comment.module.css";

export default function Comment({
  id,
  userName,
  text,
  deletePossibility,
  deleteComment,
}) {
  return (
    <section className={styles.section}>
      <div className={styles.userNameContainer}>
        <h3 className={styles.userName}>{userName}</h3>
        {deletePossibility && (
          <button
            className={styles.deleteCross}
            onClick={() => deleteComment(id)}
            aria-label="Close"
          ></button>
        )}
      </div>
      <p className={styles.text}>{text}</p>
    </section>
  );
}
