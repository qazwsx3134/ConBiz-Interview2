import { useState } from "react";
import DataPicker, { DatePickerValue } from "./components/date-picker";
import "./App.css";

function App() {
  const [calendarValue, setCalendarValue] = useState<DatePickerValue>({});

  return (
    <div className="appContainer">
      {JSON.stringify(calendarValue, null, 2)}
      <p>Task 1</p>
      <DataPicker
        type="single"
        value={calendarValue}
        onChange={setCalendarValue}
      />

      <p>Task 2</p>
      <DataPicker value={calendarValue} onChange={setCalendarValue} />
    </div>
  );
}

export default App;
