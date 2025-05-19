import * as React from "react";
import { DatePicker } from "baseui/datepicker";
import { Select } from "baseui/select";
import styles from "@/components/FilterBar.module.css";
import Selector from "@/components/Selector";
import { TimePicker } from "baseui/timepicker";
import { Button } from "baseui/button";

interface FilterBarProps {
  onSubmit: (filters: {
    date: Date | Date[] | (Date | null | undefined)[] | null | undefined;
    time: Date;
    departure: string[];
    destination: string[];
    gender: string[];
  }) => void;
}

const FilterBar = ({ onSubmit }: FilterBarProps) => {
  const [date, setDate] = React.useState<
    Date | Date[] | (Date | null | undefined)[] | null | undefined
  >([new Date()]);

  const [destination, setDestination] = React.useState<
    { id: string; label: string }[]
  >([]);

  const [departure, setDeparture] = React.useState<string[]>([]); // Updated to store selected gender options

  const [gender, setGender] = React.useState<string[]>([]); // Updated to store selected gender options

  const [time, setTime] = React.useState(new Date("2025-04-14T20:21:36.050Z"));

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
      />

      <TimePicker
        value={time}
        onChange={(date) => {
          if (date) setTime(date);
        }}
        minTime={new Date("2025-04-14T07:00:00.000Z")}
      />

      <Selector
        options={["On-Campus", "Off-Campus"]}
        onFilterChange={setDeparture} // Pass the callback to handle gender selection
        buttonLabel="Departure"
      />

      <Select
        options={[
          { label: "San Diego (SAN)", id: "SAN" },
          { label: "Los Angeles (LAX)", id: "LAX" },
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

      <Button
        onClick={() => {
          onSubmit({
            date,
            departure,
            destination: destination.map((el) => {
              return el.label;
            }),
            gender,
            time,
          });
        }}
      >
        Search
      </Button>
    </div>
  );
};

export default FilterBar;
