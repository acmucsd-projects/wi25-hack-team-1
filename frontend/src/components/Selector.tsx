import React, { useState, useEffect, useRef } from "react";
import styles from "./Selector.module.css";
import { Button } from "baseui/button";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";
import { GoTriangleDown } from "react-icons/go";

interface SelectorProps {
  options: string[];
  onFilterChange: (selectedOptions: string[]) => void;
  buttonLabel?: string; // Custom label for the button
  error?: boolean;
}

const Selector: React.FC<SelectorProps> = ({
  options,
  onFilterChange,
  buttonLabel = "Filter Options",
  error,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to track the dropdown container

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionToggle = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option) // Remove if already selected
      : [...selectedOptions, option]; // Add if not selected

    setSelectedOptions(updatedOptions);
    onFilterChange(updatedOptions); // Notify parent of changes
  };

  const isOptionSelected = (option: string) => selectedOptions.includes(option);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getButtonLabel = () => {
    if (selectedOptions.length === 0) {
      return buttonLabel; // Default label
    } else if (selectedOptions.length === 1) {
      return selectedOptions[0]; // Display the selected option
    } else {
      return `${selectedOptions.length} selected`; // Display "x selected"
    }
  };

  return (
    <div className={styles.selectorContainer} ref={dropdownRef}>
      <Button
        onClick={toggleDropdown}
        overrides={{
          BaseButton: {
            style: {
              width: "100%",
              color: selectedOptions.length > 0 ? "#000000" : "#6B6B6B",
              ":hover": error
                ? { backgroundColor: "#ffefed" }
                : { backgroundColor: "#EEEEEE" },
              borderRadius: 0,
              ":active": { backgroundColor: "#EEEEEE" },
              fontWeight: "400",
              display: "flex", // Add flex display
              alignItems: "center", // Vertically center the content
              justifyContent: "space-between", // Distribute space between label and icon
              border: error ? "2px solid #f1998e" : "none", // Add this line
              backgroundColor: error ? "#ffefed" : "#EEEEEE",
            },
          },
        }}
      >
        {getButtonLabel()}
        <GoTriangleDown color="black" size={17} /> {/* Add the triangle icon */}
      </Button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <div key={option} className={styles.dropdownItem}>
              <Checkbox
                checked={isOptionSelected(option)}
                onChange={() => handleOptionToggle(option)}
                labelPlacement={LABEL_PLACEMENT.right}
                overrides={{
                  Label: {
                    style: {
                      fontWeight: 400,
                    },
                  },
                }}
              >
                {option}
              </Checkbox>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Selector;
