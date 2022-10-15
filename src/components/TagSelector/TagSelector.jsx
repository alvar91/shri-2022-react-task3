import React, { useState } from "react";
import classNames from "classnames";
import Tag from "../Tag/Tag";
import styles from "./TagSelector.module.css";

import { TAGS_COLORS } from "../../constants";

export default function TagSelector({
  selectedTags,
  setSelectedTags,
  ...props
}) {
  const defaultTags = Object.values(TAGS_COLORS)?.map((color) => {
    return { color, selected: false };
  });

  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState(
    defaultTags?.map((tag) => ({
      ...tag,
      selected: selectedTags.includes(tag.color),
    }))
  );

  function toggleTag(clickedTag) {
    setTags(
      tags?.map((tag) => {
        if (tag.color === clickedTag.color) {
          return {
            color: tag.color,
            selected: !tag.selected,
          };
        }
        return tag;
      })
    );

    if (selectedTags.includes(clickedTag.color)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== clickedTag.color));
    } else {
      setSelectedTags([...selectedTags, clickedTag.color]);
    }
  }

  return (
    <div className={styles.selectorWrapper} {...props}>
      <div className={styles.selectorHead} onClick={() => setOpen(!open)}>
        <span>Выбрать тег</span>
        {open ? (
          <img
            className={styles.arrowImage}
            src="/img/tagSelector/arrowUp.svg"
            alt="Arrow up"
          />
        ) : (
          <img
            className={styles.arrowImage}
            src="/img/tagSelector/arrowDown.svg"
            alt="Arrow down"
          />
        )}
      </div>
      <div className={classNames(styles.selectorBodyWrapper)}>
        <div
          className={classNames(styles.selectorBody, { [styles.open]: open })}
        >
          {tags?.map((tag) => (
            <div
              className={styles.tagContainer}
              onClick={() => toggleTag(tag)}
              key={tag.color}
            >
              <Tag size="long" color={tag.color} />
              {tag.selected && (
                <img
                  className={styles.checkbox}
                  src="/img/tagSelector/checkedBox.svg"
                  alt="Checked box"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
