import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Tag.module.css";

export default function Tag({ size, color, isHoverable, ...props }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={classNames(styles.tag, styles[size], styles[color], {
        [styles.cursorPointer]: isHoverable,
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {isHoverable && isHovered && (
        <img
          className={styles.tagDeleteCross}
          src="/img/tag/tagDeleteCross.svg"
          alt="Tag delete cross"
        />
      )}
    </button>
  );
}
