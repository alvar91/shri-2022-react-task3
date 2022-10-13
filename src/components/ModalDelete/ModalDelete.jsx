import React from "react";
import styles from "./ModalDelete.module.css";

export default function DeleteModal({ deleteTask, close }) {
  return (
    <div className={styles.deleteModal}>
      <div className={styles.title}>Удалить тикет?</div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={deleteTask}>
          Да
        </button>
        <button className={styles.button} onClick={close}>
          Нет
        </button>
      </div>
    </div>
  );
}
