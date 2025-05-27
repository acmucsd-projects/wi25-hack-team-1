import * as React from "react";
import { useContext } from "react";
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
import { UserContext } from "@/contexts/UserContext";
interface CreatePostModalProps {
  onPostCreated: () => void;
}

const CreatePostModal = ({ onPostCreated }: CreatePostModalProps) => {
  const { firebaseUser } = useContext(UserContext);

  const [isOpen, setIsOpen] = React.useState(false);
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
  const [departure, setDeparture] = React.useState<string[]>([]);
  const [communication, setCommunication] = React.useState<string[]>([]);
  const [time, setTime] = React.useState(new Date("2025-04-14T00:00:00.0000"));

  // Error states for each field
  const [dateError, setDateError] = React.useState(false);
  const [destinationError, setDestinationError] = React.useState(false);
  const [departureError, setDepartureError] = React.useState(false);
  const [communicationError, setCommunicationError] = React.useState(false);
  const [timeError, setTimeError] = React.useState(false);

  const validateFields = () => {
    let valid = true;

    // Example validation logic, adjust as needed
    if (!date || (Array.isArray(date) && date.length === 0)) {
      setDateError(true);
      valid = false;
    } else {
      setDateError(false);
    }

    if (!destination || destination.length === 0) {
      setDestinationError(true);
      valid = false;
    } else {
      setDestinationError(false);
    }

    if (!departure || departure.length === 0) {
      setDepartureError(true);
      valid = false;
    } else {
      setDepartureError(false);
    }

    if (!communication || communication.length === 0) {
      setCommunicationError(true);
      valid = false;
    } else {
      setCommunicationError(false);
    }

    if (!time) {
      setTimeError(true);
      valid = false;
    } else {
      setTimeError(false);
    }

    return valid;
  };

  return (
    <div>
<<<<<<< HEAD
      <Button onClick={() => setIsOpen(true)}>Post</Button>
=======
>>>>>>> main
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
                    error={dateError}
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
                    error={timeError}
                  />
                </div>
              </div>
            </div>
            <div className={styles.horizontalContainer}>
              <div className={styles.verticalContainer}>
                <div className={styles.titleCombo}>
                  <p>Departure Location</p>
                  <Selector
                    options={["On-Campus", "Off-Campus"]}
                    onFilterChange={setDeparture}
                    buttonLabel="Departure"
                    error={departureError}
                  />
                </div>
              </div>
              <div className={styles.verticalContainer}>
                <div className={styles.titleCombo}>
                  <p>Destination</p>
                  <Select
                    options={[
                      { label: "San Diego (SAN)", id: "SAN" },
                      { label: "Los Angeles (LAX)", id: "LAX" },
                    ]}
                    value={destination}
                    placeholder="Destination"
                    onChange={(params) =>
                      setDestination(
                        params.value as { id: string; label: string }[],
                      )
                    }
                    error={destinationError}
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
                    onFilterChange={setCommunication}
                    buttonLabel="Communication"
                    error={communicationError}
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
<<<<<<< HEAD
=======
          <ModalButton kind={ButtonKind.tertiary} onClick={onClose}>
            Cancel
          </ModalButton>
>>>>>>> main
          <ModalButton
            kind={ButtonKind.tertiary}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </ModalButton>
          <ModalButton
            onClick={async () => {
              if (!validateFields()) return;
              // Display the information in an alert
              alert(`Post Details:
                - Departure Date: ${date}
                - Departure Time: ${time}
                - Departure Location: ${departure.join(", ")}
                - Destination: ${destination.map((d) => d.label).join(", ")}
                - Communication: ${communication.join(", ")}
                - Additional Information: ${text}`);

              try {
                const token = await firebaseUser?.getIdToken();
                await fetch(
                  `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/post`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      flightDay: (date as Date[])[0].toISOString(),
                      time: time.toISOString(),
                      airport: destination[0].id,
                      luggage: { carryOn: 1, checked: 1 },
                      numPassengers: 1,
                    }),
                  },
                );
              } catch (error) {
                console.error("Error posting data:" + error);
              }
              onPostCreated();
              setDate([new Date()]);
              setTime(new Date("2025-04-14T20:21:36.050Z"));
              setDeparture([]);
              setDestination([]);
              setCommunication([]);
              setText("");
<<<<<<< HEAD
              setIsOpen(false);
=======
              // Close the modal
              onClose();
>>>>>>> main
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
