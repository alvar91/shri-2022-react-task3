import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilters } from "../../store/selectors";
import { changeFilter } from "../../store/filterSlice";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./FilterContainer.module.css";

export default function FilterContainer(props) {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const handleCheck = (filter) => {
    dispatch(changeFilter({ filterId: filter.id }));
  };

  return (
    <ul className={styles.checkboxContainer} {...props}>
      {filters.map((filter) => (
        <Checkbox
          id={filter.id}
          text={filter.text}
          name={filter.text}
          checked={filter.selected}
          key={filter.id}
          handleCheck={() => handleCheck(filter)}
        />
      ))}
    </ul>
  );
}
