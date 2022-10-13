import React from "react";
import classNames from "classnames";
import styles from "./Checkbox.module.css";

export default React.memo(function Checkbox({
  id,
  text,
  name,
  checked = false,
  handleCheck,
  disabled = false,
  ...props
}) {
  return (
    <li className={styles.checkbox} {...props}>
      <input
        className={classNames("visually-hidden", styles.checkboxInput)}
        type="checkbox"
        checked={checked}
        onChange={handleCheck}
        id={id}
        name={name}
        disabled={disabled}
      />
      <label className={styles.checkboxLabel} htmlFor={id}>
        {text}
      </label>
    </li>
  );
});
