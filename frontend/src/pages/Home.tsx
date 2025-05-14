import React, { useState } from "react";
import Selector from "@/components/Selector";

const Home: React.FC = () => {
  const [multiSelectOptions, setMultiSelectOptions] = useState<string[]>([]);
  const [singleSelectOption, setSingleSelectOption] = useState<string | null>(
    null,
  );

  const multiSelectOptionsList = ["Option 1", "Option 2", "Option 3"];
  const singleSelectOptionsList = ["Choice A", "Choice B", "Choice C"];

  const handleMultiSelectChange = (selected: string[]) => {
    setMultiSelectOptions(selected);
    console.log("Multi-select options:", selected);
  };

  const handleSingleSelectChange = (selected: string) => {
    setSingleSelectOption(selected);
    console.log("Single-select option:", selected);
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>

      {/* Multi-select example */}
      <h2>Multi-Select Dropdown</h2>
      <Selector
        options={multiSelectOptionsList}
        onFilterChange={handleMultiSelectChange}
        isMultiSelect={true}
      />
      {multiSelectOptions.length > 0 && (
        <p>
          Currently selected (multi-select):{" "}
          {multiSelectOptions.sort().join(", ")}
        </p>
      )}

      {/* Single-select example */}
      <h2>Single-Select Dropdown</h2>
      <Selector
        options={singleSelectOptionsList}
        onFilterChange={(selectedOptions) =>
          handleSingleSelectChange(selectedOptions[0])
        }
        isMultiSelect={false}
      />
      {singleSelectOption && (
        <p>Currently selected (single-select): {singleSelectOption}</p>
      )}
    </div>
  );
};

export default Home;
