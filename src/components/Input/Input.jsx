import { React, forwardRef, memo } from "react";
import classNames from "classnames";
import styles from "./Input.module.css";

const Input = memo(
  forwardRef(
    ({ isMultiline = false, placeholder = "", ...props }, ref) => {

      if (isMultiline) {
        return (
            <textarea
              className={classNames(
                styles.input,
                styles.textArea
              )}
              placeholder={placeholder}
              ref={ref}
              {...props}
            />
        );
      } else {
        return (
            <input
              className={classNames(
                styles.input,
                styles.regularInput
              )}
              placeholder={placeholder}
              ref={ref}
              {...props}
            />
        );
      }
    }
  )
);

export default Input;
