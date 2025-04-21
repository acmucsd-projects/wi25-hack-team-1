import React from "react";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { StyledTitle } from "baseui/card";
import { Select } from "baseui/select";

const PostCard = () => {
  const [date, setDate] = React.useState([]);
  const [location, setLocation] = React.useState([]);
  const [placeholder1, setPlaceholder1] = React.useState([]);
  const [placeholder2, setPlaceholder2] = React.useState([]);

  return (
    <Card
      overrides={{
        Root: {
          style: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "800px",
            margin: "20px auto",
            padding: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          },
        },
      }}
    >
      {/* Dropdown Section */}
      <div style={{ display: "flex", flex: 2, gap: "10px", alignItems: "center" }}>
        {/* Date Dropdown */}
        <Select
          options={[
            { label: "Today", id: "today" },
            { label: "Tomorrow", id: "tomorrow" },
            { label: "Next Week", id: "next_week" },
          ]}
          value={date}
          placeholder="Select Date"
          onChange={(params) => setDate(params.value)}
        />

        {/* Location Dropdown */}
        <Select
          options={[
            { label: "New York", id: "ny" },
            { label: "San Francisco", id: "sf" },
            { label: "Los Angeles", id: "la" },
          ]}
          value={location}
          placeholder="Select Location"
          onChange={(params) => setLocation(params.value)}
        />

        {/* Placeholder Dropdown 1 */}
        <Select
          options={[
            { label: "Option 1", id: "option1" },
            { label: "Option 2", id: "option2" },
            { label: "Option 3", id: "option3" },
          ]}
          value={placeholder1}
          placeholder="Placeholder 1"
          onChange={(params) => setPlaceholder1(params.value)}
        />

        {/* Placeholder Dropdown 2 */}
        <Select
          options={[
            { label: "Option A", id: "optionA" },
            { label: "Option B", id: "optionB" },
            { label: "Option C", id: "optionC" },
          ]}
          value={placeholder2}
          placeholder="Placeholder 2"
          onChange={(params) => setPlaceholder2(params.value)}
        />
      </div>

      {/* Content Section */}
      <div style={{ flex: 3, marginLeft: "20px" }}>
        {/* Header Section */}
        <StyledTitle>
          <h3 style={{ margin: 0 }}>Post Title</h3>
        </StyledTitle>

        {/* Image Section */}
        <img
          src="https://via.placeholder.com/300x150"
          alt="Post Thumbnail"
          style={{ width: "100%", height: "150px", objectFit: "cover", marginBottom: "10px" }}
        />

        {/* Body Section */}
        <StyledBody>
          Proin ut dui sed metus pharetra hendrerit vel non mi. Nulla ornare faucibus ex, non facilisis nisl.
        </StyledBody>

        {/* Footer Section */}
        <StyledAction>
          <Button
            overrides={{
              BaseButton: {
                style: {
                  width: "48%",
                  marginRight: "4%",
                },
              },
            }}
          >
            Like
          </Button>
          <Button
            overrides={{
              BaseButton: {
                style: {
                  width: "48%",
                },
              },
            }}
          >
            Share
          </Button>
        </StyledAction>
      </div>
    </Card>
  );
};

export default PostCard;