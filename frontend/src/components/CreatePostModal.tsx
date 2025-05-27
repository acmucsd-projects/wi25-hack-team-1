import * as React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";
import { DatePicker } from "baseui/datepicker";
import { Select } from "baseui/select";
import styles from "@/components/CreatePostModal.module.css";
import Selector from "@/components/Selector";
import { TimePicker } from "baseui/timepicker";
import { Textarea } from "baseui/textarea";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [text, setText] = React.useState("");

  const [date, setDate] = React.useState<
    Date | Date[] | (Date | null | undefined)[] | null | undefined
  >([new Date()]);

  const [destination, setDestination] = React.useState<
    { id: string; label: string }[]
  >([]);

  const [departure, setDeparture] = React.useState<string[]>([]); // Updated to store selected gender options

  const [communication, setCommunication] = React.useState<string[]>([]); // Updated to store selected gender options

  const [time, setTime] = React.useState(new Date("2025-04-14T00:00:00.0000"));

  return (
    <div>
      <Modal
        onClose={onClose}
        closeable
        isOpen={isOpen}
        animate
        autoFocus={false}
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <button
          style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
          tabIndex={0}
          aria-hidden="true"
        />
        <ModalHeader>Post a Trip </ModalHeader>
        <ModalBody>
          <div className={styles.verticalContainer}>
            <div className={styles.horizontalContainer}>
              <div className={styles.verticalContainer}>
                <div className={styles.titleCombo}>
                  <p>Departure Date</p>
                  <DatePicker
                    value={date}
                    onChange={({ date }) => {
                      setDate(Array.isArray(date) ? date : [date]);
                    }}
                  />
                </div>
              </div>

              <div className={styles.verticalContainer}>
                <div className={styles.titleCombo}>
                  <p>Departure Time</p>
                  <TimePicker
                    value={time}
                    onChange={(date) => {
                      if (date) setTime(date);
                    }}
                    minTime={new Date("2025-04-14T07:00:00.000Z")}
                  />
                </div>
              </div>
            </div>

            <div className={styles.horizontalContainer}>
              <div className={styles.verticalContainer}>
                <div className={styles.titleCombo}>
                  <p>Departure Location</p>
                  <Selector
                    options={[
                      "Revelle",
                      "Muir",
                      "Marshall",
                      "Warren",
                      "Roosevelt",
                      "Sixth",
                      "Seventh",
                      "Eighth",
                    ]}
                    onFilterChange={setDeparture} // Pass the callback to handle gender selection
                    buttonLabel="Departure"
                  />
                </div>
              </div>
              <div className={styles.verticalContainer}>
                <div className={styles.titleCombo}>
                  <p>Destination</p>
                  <Select
                    options={[
                      { label: "San Diego (SAN)", id: "1" },
                      { label: "Los Angeles (LAX)", id: "2" },
                    ]}
                    value={destination}
                    placeholder="Destination"
                    onChange={(params) =>
                      setDestination(
                        params.value as { id: string; label: string }[],
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className={styles.horizontalContainer}>
              <div className={styles.verticalContainer}>
                <div className={styles.titleCombo}>
                  <p>Select form of communication</p>
                  <Selector
                    options={["Email", "Phone"]}
                    onFilterChange={setCommunication} // Pass the callback to handle gender selection
                    buttonLabel="Communication"
                  />
                </div>
              </div>
            </div>

            <div className={styles.horizontalContainer}>
              <div className={styles.titleCombo}>
                <p>Additional Information</p>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type here"
                  clearOnEscape
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalButton kind={ButtonKind.tertiary} onClick={onClose}>
            Cancel
          </ModalButton>
          <ModalButton
            onClick={() => {
              // Display the information in an alert
              alert(`Post Details:
                - Departure Date: ${date}
                - Departure Time: ${time}
                - Departure Location: ${departure.join(", ")}
                - Destination: ${destination.map((d) => d.label).join(", ")}
                - Communication: ${communication.join(", ")}
                - Additional Information: ${text}`);

              // Clear all fields
              setDate([new Date()]);
              setTime(new Date("2025-04-14T20:21:36.050Z"));
              setDeparture([]);
              setDestination([]);
              setCommunication([]);
              setText("");
              // Close the modal
              onClose();
            }}
          >
            Post
          </ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
