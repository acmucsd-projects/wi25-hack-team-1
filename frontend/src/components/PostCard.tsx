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

const PostCard = () => {
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
          <span className={styles.nameText}>Maxime</span>
          <FaMars />
        </div>

        {/* Time */}
        <div className={styles.rowContainer}>
          <FaClock />
          <span>12:35</span>
        </div>

        <div className={styles.rowContainer}>
          <FaCalendarAlt />
          <span>Date</span>
        </div>

        {/* Location */}
        <div className={styles.rowContainer}>
          <FaMapMarkerAlt />
          <span>On-Campus</span>
        </div>

        {/* People */}
        <div className={styles.rowContainer}>
          <FaUserFriends />
          <span>2</span>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
