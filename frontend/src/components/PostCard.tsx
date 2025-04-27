import React from "react";
import { Card, StyledBody } from "baseui/card";
import { StyledTitle } from "baseui/card";

const PostCard = () => {
  return (
    <Card
      overrides={{
        Root: {
          style: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "50%", // Half the page width
            height: "33vh", // 1/3 of the page height
            margin: "auto", // Center the card
            position: "relative",
            top: "33vh", // Center vertically
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "20px",
          },
        },
      }}
    >
      {/* Left Section: Date */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <StyledTitle>
          <h3 style={{ margin: 0 }}>Date</h3>
        </StyledTitle>
        <StyledBody>April 26, 2025</StyledBody>
      </div>

      {/* Middle Section: Location */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <StyledTitle>
          <h3 style={{ margin: 0 }}>Location</h3>
        </StyledTitle>
        <StyledBody>San Francisco, CA</StyledBody>
      </div>

      {/* Right Section: Gender */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <StyledTitle>
          <h3 style={{ margin: 0 }}>Gender</h3>
        </StyledTitle>
        <StyledBody>Male</StyledBody>
      </div>
    </Card>
  );
};

export default PostCard;