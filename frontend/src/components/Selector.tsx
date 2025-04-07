import React, { useState } from 'react';
import styles from './Selector.module.css';

interface SelectorProps {
  options: string[];
  onFilterChange: (selectedOptions: string[]) => void;
  isMultiSelect?: boolean; // Determines if the selector is multi-select or single-select
}

const Selector: React.FC<SelectorProps> = ({ options, onFilterChange, isMultiSelect = true }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionToggle = (option: string) => {
    if (isMultiSelect) {
      // Multi-select logic
      const updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option) // Remove if already selected
        : [...selectedOptions, option]; // Add if not selected

      setSelectedOptions(updatedOptions);
      onFilterChange(updatedOptions); // Notify parent of changes
    } else {
      // Single-select logic
      setSelectedOptions([option]);
      onFilterChange([option]); // Notify parent of changes
    }
  };

  const isOptionSelected = (option: string) => selectedOptions.includes(option);

  return (
    <div className={styles.selectorContainer}>
      {/* Button to toggle dropdown */}
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        Filter Options
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <div key={option} className={styles.dropdownItem}>
              <label>
                <input
                  type={isMultiSelect ? 'checkbox' : 'radio'} // Use checkbox for multi-select, radio for single-select
                  name={!isMultiSelect ? 'single-select' : undefined} // Group radio buttons for single-select                  checked={isOptionSelected(option)}
                  onChange={() => handleOptionToggle(option)}
                  disabled={!isMultiSelect && isOptionSelected(option)} // Disable checkbox for single-select after selection
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Selector;