import { Card } from "baseui/card";
import {
  FaUser,
  FaMars,
  FaVenus,
  FaGenderless,
  FaClock,
  FaMapMarkerAlt,
  FaUserFriends,
  FaCalendarAlt,
} from "react-icons/fa";
import styles from "./PostCard.module.css";

interface PostCardProps {
  name: string;
  time: Date;
  date: Date;
  location: string;
  numPeople: number;
  gender: "Male" | "Female" | "Other";
  pfp?: string;
  email: string;
  isAuthenticated: boolean;
}

const PostCard = ({
  name,
  time,
  date,
  location,
  numPeople,
  email,
  gender,
  isAuthenticated,
}: PostCardProps) => {
  return (
    <Card
      overrides={{
        Root: {
          style: {
            width: "70%",
            height: "20vh",
            margin: "0 auto",
            padding: "15px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
            borderRadius: "12px",
            backgroundColor: "#fff",
          },
        },
      }}
    >
      {/* Outer container to enforce horizontal layout */}
      <div className={styles.outerContainer}>
        {/* Name */}
        <div className={styles.rowContainer}>
          <div className={styles.iconContainer}>
            <FaUser />
          </div>
          {/* Make name a mailto link if user is signed in */}
          {isAuthenticated && email ? (
            <a className={styles.nameText} href={`mailto:${email}`}>
              {name}
            </a>
          ) : (
            <span className={styles.nameText}>{name}</span>
          )}

          {/* Gender icon */}
          {gender === "Male" && <FaMars title="Male" />}
          {gender === "Female" && <FaVenus title="Female" />}
          {gender === "Other" && <FaGenderless title="Other" />}
        </div>

        <div className={styles.rowContainer}>
          <FaCalendarAlt />
          <span>{date.toLocaleDateString("en-US", { timeZone: "UTC" })}</span>
        </div>

        {/* Time */}
        <div className={styles.rowContainer}>
          <FaClock />
          <span>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
        </div>

        {/* Location */}
        <div className={styles.rowContainer}>
          <FaMapMarkerAlt />
          <span>{location}</span>
        </div>

        {/* People */}
        <div className={styles.rowContainer}>
          <FaUserFriends />
          <span>{numPeople}</span>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
