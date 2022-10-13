import React, { useState } from "react";
import styles from "./TitledContainer.module.css";
import Popup from "../Popup/Popup";

export default function TitledContainer({
  title,
  withOptions,
  options,
  children,
  ...props
}) {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div {...props} className={styles.titledContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
        {withOptions && popupOpen && (
          <Popup options={options} close={() => setPopupOpen(false)} />
        )}
        {withOptions && !popupOpen && (
          <button
            className={styles.optionsImage}
            onClick={() => setPopupOpen(true)}
            aria-label="More"
          ></button>
        )}
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {children === undefined ? "пусто" : children}
        </div>
      </div>
    </div>
  );
}
