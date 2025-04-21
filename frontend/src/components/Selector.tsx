import React, { useState, useEffect, useRef } from "react";
import styles from "./Selector.module.css";
import { Button } from "baseui/button";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";

interface SelectorProps {
  options: string[];
  onFilterChange: (selectedOptions: string[]) => void;
  buttonLabel?: string; // Custom label for the button
}

const Selector: React.FC<SelectorProps> = ({
  options,
  onFilterChange,
  buttonLabel = "Filter Options",
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

  return (
    <div className={styles.selectorContainer} ref={dropdownRef}>
      <Button
        onClick={toggleDropdown}
        overrides={{
          BaseButton: {
            style: {
              backgroundColor: "#EEEEEE",
              color: "#6B6B6B",
              fontWeight: 400,
              ":hover": { backgroundColor: "#EEEEEE" },
            },
          },
        }}
      >
        {buttonLabel}
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
