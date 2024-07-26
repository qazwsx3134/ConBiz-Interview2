import React, { Dispatch, useState } from "react";
import styles from "./dp.module.css";
import DatePickerHeader from "./DatePickerHeader";
import DatePickerBody from "./DatePickerBody";
import { equalDates } from "./utils";

export type DatePickerType = "single" | "range";
export interface DatePickerValue {
  startDate?: Date;
  endDate?: Date;
}

type Props = {
  type?: DatePickerType;
  value?: DatePickerValue;
  onChange: Dispatch<React.SetStateAction<DatePickerValue>>;
};

const DataPicker = (props: Props) => {
  const now = new Date();

  const [viewDate, setViewDate] = useState<Date>(now);

  const [selectedRange, setSelectedRange] = useState<{
    startDate?: Date;
    endDate?: Date;
  }>({
    startDate: props.value?.startDate ?? now,
    endDate: props.value?.endDate ?? now,
  });

  const handleOnClickNext = () => {
    if (props.type === "single") {
      return;
    }
    setViewDate((prevViewDate) => {
      const newViewDate = new Date(prevViewDate);
      newViewDate.setMonth(newViewDate.getMonth() + 2, 0);

      return newViewDate;
    });
  };

  const handleOnClickPrev = () => {
    if (props.type === "single") {
      return;
    }

    setViewDate((prevViewDate) => {
      const newViewDate = new Date(prevViewDate);
      newViewDate.setMonth(newViewDate.getMonth(), 0);

      return newViewDate;
    });
  };

  const handleOnClickThisMonth = () => {
    setViewDate(now);
  };

  const handleOnClickDate = (clickedDate: Date) => {
    if (!selectedRange.startDate) {
      setSelectedRange(() => ({
        startDate: clickedDate,
        endDate: undefined,
      }));

      props.onChange({
        startDate: selectedRange.startDate,
        endDate: selectedRange.endDate,
      });

      return;
    }

    if (
      selectedRange.startDate &&
      !selectedRange.endDate &&
      !equalDates(clickedDate, selectedRange.startDate!)
    ) {
      if (clickedDate.getTime() < selectedRange.startDate!.getTime()) {
        setSelectedRange(() => ({
          startDate: clickedDate,
          endDate: undefined,
        }));
      } else {
        setSelectedRange((prev) => ({
          startDate: prev.startDate,
          endDate: clickedDate,
        }));
      }
      props.onChange({
        startDate: selectedRange.startDate,
        endDate: clickedDate,
      });

      return;
    }

    if (selectedRange.startDate && selectedRange.endDate) {
      setSelectedRange(() => ({
        startDate: clickedDate,
        endDate: undefined,
      }));
    }
  };

  return (
    <div className={styles.container}>
      <DatePickerHeader
        dateView={viewDate}
        onClickNext={handleOnClickNext}
        onClickPrev={handleOnClickPrev}
        onClickThisMonth={handleOnClickThisMonth}
      />
      <DatePickerBody
        type={props.type ?? "range"}
        dateView={viewDate}
        rangeSelected={selectedRange}
        setDateView={setViewDate}
        onClickDate={handleOnClickDate}
      />
    </div>
  );
};

export default DataPicker;
