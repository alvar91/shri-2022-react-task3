import React from "react";
import styles from "./Popup.module.css";

export default function Popup({ options, close }) {
  return (
    <div className={styles.popup}>
      <ul>
        {options.map((option) => (
          <li
            onClick={() => {
              option.action();
              close();
            }}
            key={option.name}
          >
            <span>{option.name}</span>
          </li>
        ))}
      </ul>
      <button
        className={styles.popupCloseCross}
        onClick={close}
        aria-label="Close"
      ></button>
    </div>
  );
}
