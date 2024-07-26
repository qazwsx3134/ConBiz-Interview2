import React from "react";
import styles from "./dp.module.css";
import { createDatesArray, equalDates, notCurrentMonth } from "./utils";
import { DatePickerType } from ".";

type Props = {
  type: DatePickerType;
  dateView: Date;
  rangeSelected: {
    startDate?: Date;
    endDate?: Date;
  };
  setDateView: React.Dispatch<React.SetStateAction<Date>>;
  onClickDate: (date: Date) => void;
};

const DatePickerBody = (props: Props) => {
  const today = new Date();
  return (
    <div>
      <div className={styles.dayBodyContainer}>
        {createDatesArray(props.dateView).map((date) => {
          return (
            <button
              test-id={date.getMonth()}
              key={date.getTime()}
              onClick={() => {
                if (
                  props.type === "single" &&
                  notCurrentMonth(date, props.dateView)
                ) {
                  return;
                }
                props.onClickDate(date);
              }}
              className={`
              ${
                props.rangeSelected.startDate &&
                equalDates(date, props.rangeSelected.startDate)
                  ? styles.activeDay
                  : ""
              }
              ${
                props.rangeSelected.startDate &&
                props.rangeSelected.endDate &&
                props.rangeSelected.startDate.getTime() < date.getTime() &&
                props.rangeSelected.endDate.getTime() >= date.getTime()
                  ? styles.activeDay
                  : ""
              }
              ${equalDates(date, today) ? styles.currentDay : ""}
              ${styles.dayBtn}
              ${
                notCurrentMonth(date, props.dateView)
                  ? styles.notCurrentMonth
                  : ""
              }
              ${
                props.type === "single" && notCurrentMonth(date, props.dateView)
                  ? styles.disabled
                  : ""
              }
              `}
            >
              {date.getDate()}日
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DatePickerBody;
