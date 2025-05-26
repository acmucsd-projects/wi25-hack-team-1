import React from "react";
import { Card } from "baseui/card";
import {
  FaUser,
  FaMars,
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
  pfp?: string;
}

const PostCard = ({ name, time, date, location, numPeople }: PostCardProps) => {
  return (
    <Card
      overrides={{
        Root: {
          style: {
            width: "60%",
            height: "20vh",
            margin: "0 auto",
            padding: "20px",
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
          <span className={styles.nameText}>{name}</span>
          <FaMars />
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
