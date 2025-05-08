import React from "react";
import { Card } from "baseui/card";
import {
  FaUser,
  FaMars,
  FaClock,
  FaMapMarkerAlt,
  FaUserFriends,
} from "react-icons/fa";

const PostCard = () => {
  return (
    <Card
      overrides={{
        Root: {
          style: {
            width: "70%",
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
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}>
        {/* Name */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}>
            <FaUser />
          </div>
          <span style={{ fontSize: "16px", fontWeight: "500" }}>Maxime</span>
        </div>

        {/* Gender */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}>
          <FaMars />
          <span style={{ fontSize: "14px" }}>Male</span>
        </div>

        {/* Time */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}>
            <FaClock />
            <span>12:35</span>
          </div>
          <div style={{ fontSize: "12px" }}>Date</div>
        </div>

        {/* Location */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}>
          <FaMapMarkerAlt />
          <span>On-Campus</span>
        </div>

        {/* People */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}>
          <FaUserFriends />
          <span>2</span>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;