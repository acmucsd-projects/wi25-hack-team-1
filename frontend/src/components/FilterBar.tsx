import * as React from "react";
import { DatePicker } from "baseui/datepicker";
import { Select } from "baseui/select";
import styles from "@/components/FilterBar.module.css";
import Selector from "@/components/Selector";
import { TimePicker } from "baseui/timepicker";

const FilterBar: React.FC = () => {
  const [date, setDate] = React.useState<
    Date | Date[] | (Date | null | undefined)[] | null | undefined
  >([new Date()]);
  const [departure, setDeparture] = React.useState<
    { id: string; label: string }[]
  >([]);
  const [destination, setDestination] = React.useState<
    { id: string; label: string }[]
  >([]);

  const [gender, setGender] = React.useState<string[]>([]); // Updated to store selected gender options

  const [value, setValue] = React.useState(
    new Date("2025-04-14T20:21:36.050Z"),
  );

  const handleGenderChange = (selected: string[]) => {
    setGender(selected); // Update the state with the selected gender options
    console.log("Selected Gender:", selected); // Log the selected options for debugging
  };

  return (
    <div className={styles.sortContainer}>
      <DatePicker
        value={date}
        onChange={({ date }) => {
          setDate(Array.isArray(date) ? date : [date]);
        }}
        displayValueAtRangeIndex={0}
      />

      <TimePicker
        value={value}
        onChange={(date) => {
          if (date) setValue(date);
        }}
        minTime={new Date("2025-04-14T07:00:00.000Z")}
      />

      <Select
        options={[
          { label: "Revelle", id: "#F0F8FF" },
          { label: "Muir", id: "#FAEBD7" },
          { label: "Marshall", id: "#00FFFF" },
          { label: "Warren", id: "#7FFFD4" },
          { label: "Roosevelt", id: "#F0FFFF" },
          { label: "Sixth", id: "#F5F5DC" },
          { label: "Seventh", id: "#F0FFFF" },
          { label: "Eighth", id: "#F5F5DC" },
        ]}
        value={departure}
        placeholder="Departure"
        onChange={(params) =>
          setDeparture(params.value as { id: string; label: string }[])
        }
      />

      <Select
        options={[
          { label: "San Diego (SAN)", id: "#F0F8FF" },
          { label: "Los Angeles (LAX)", id: "#FAEBD7" },
        ]}
        value={destination}
        placeholder="Destination"
        onChange={(params) =>
          setDestination(params.value as { id: string; label: string }[])
        }
      />

      <Selector
        options={["Female", "Male", "Other"]}
        onFilterChange={handleGenderChange} // Pass the callback to handle gender selection
        buttonLabel="Gender"
      />

      {/* Display the selected gender options */}
      {gender.length > 0 && <p>Selected Gender: {gender.join(", ")}</p>}
    </div>
  );
};

export default FilterBar;
