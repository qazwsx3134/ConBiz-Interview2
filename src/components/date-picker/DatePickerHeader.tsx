import React from "react";
import styles from "./dp.module.css";
import { monthFormatter } from "./utils";
type Props = {
  dateView: Date;
  onClickPrev: () => void;
  onClickNext: () => void;
  onClickThisMonth: () => void;
};

// memo this component
const DatePickerHeader = (props: Props) => {
  return (
    <div className={styles.header}>
      <button onClick={props.onClickPrev} className={styles.monthSelector}>
        {"<"}
      </button>
      <button
        onClick={props.onClickThisMonth}
        className={styles.monthFormatter}
      >
        {monthFormatter(props.dateView)}
      </button>
      <button onClick={props.onClickNext} className={styles.monthSelector}>
        {">"}
      </button>
    </div>
  );
};

export default DatePickerHeader;
