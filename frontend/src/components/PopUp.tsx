import React, { useState } from "react";
import styles from "./PopUp.module.css";

const PopUp: React.FC<{ isOpen: boolean; togglePopup: () => void }> = ({
  isOpen,
  togglePopup,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("Male");

  const handleSubmit = () => {
    console.log("User Input:", { phoneNumber, gender });
    togglePopup(); // Close the popup after submission
  };

  return (
    <>
      {/* Popup */}
      {isOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h2>Enter Your Details</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {/* Phone Number Input */}
              <div className={styles.inputGroup}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              {/* Gender Dropdown */}
              <div className={styles.inputGroup}>
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={styles.genderDropdown}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Buttons */}
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.submitButton}>
                  Submit
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={togglePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUp;
