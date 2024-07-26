export const monthFormatter = (date: Date) => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
};

export const notCurrentMonth = (date: Date, compareDate = new Date()) => {
  return (
    date.getFullYear() !== compareDate.getFullYear() ||
    date.getMonth() !== compareDate.getMonth()
  );
};

export const equalDates = (date1: Date, date2: Date): boolean => {
  // just match the year, month, date
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const createDatesArray = (date: Date): Date[] => {
  // get the last day of the month eg. 3/31
  const currentMonth = new Date(date);
  currentMonth.setMonth(currentMonth.getMonth() + 1, 0); // +1 month -1 day

  const prevMonth = new Date(date);
  prevMonth.setMonth(prevMonth.getMonth(), 0);

  const nextMonth = new Date(date);
  nextMonth.setMonth(nextMonth.getMonth() + 2, 0);

  const numberOfDaysInCurrentMonth = currentMonth.getDate();
  const numberOfDaysInPrevMonth = prevMonth.getDate();

  currentMonth.setDate(1);
  const getCurrentDay = currentMonth.getDay();

  const daysArray: Date[] = [];

  for (let index = getCurrentDay - 1; index >= 0; index--) {
    daysArray.push(
      new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth(),
        numberOfDaysInPrevMonth - index,
        0,
        0,
        0,
        0
      )
    );
  }

  for (let index = 0; index < numberOfDaysInCurrentMonth; index++) {
    daysArray.push(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        index + 1,
        0,
        0,
        0,
        0
      )
    );
  }

  const totalsDaysInArray = 35;
  const daysLeftInArray = totalsDaysInArray - daysArray.length;

  for (let index = 0; index < daysLeftInArray; index++) {
    daysArray.push(
      new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        index + 1,
        0,
        0,
        0,
        0
      )
    );
  }

  return daysArray;
};
