import * as React from "react";
import { DatePicker } from "baseui/datepicker";
import { Select } from "baseui/select";
import styles from "@/components/FilterBar.module.css";
import Selector from "@/components/Selector";
import { Button } from "baseui/button";

interface FilterBarProps {
  onSubmit: (filters: {
    date: Date | Date[] | (Date | null | undefined)[] | null | undefined;
    timeSort: "asc" | "desc";
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

  const [gender, setGender] = React.useState<string[]>([]); // Updated to store selected gender options

  const [timeSort, setTimeSort] = React.useState<"asc" | "desc">("asc");

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
        formatString="MM/dd/yyyy"
        clearable
      />

      <Select
        options={[
          { label: "Earliest", id: "asc" },
          { label: "Latest", id: "desc" },
        ]}
        value={
          timeSort === "asc"
            ? [{ label: "Earliest", id: "asc" }]
            : [{ label: "Latest", id: "desc" }]
        }
        placeholder="Sort by Time"
        onChange={(params) => {
          const selected = params.value?.[0]?.id;
          if (selected === "asc" || selected === "desc") {
            setTimeSort(selected);
          }
        }}
        clearable={false}
      />

      <Select
        options={[
          { label: "San Diego (SAN)", id: "1" },
          { label: "Los Angeles (LAX)", id: "2" },
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
            destination: destination.map((el) => {
              return el.label;
            }),
            gender,
            timeSort,
          });
        }}
      >
        Search
      </Button>
    </div>
  );
};

export default FilterBar;
