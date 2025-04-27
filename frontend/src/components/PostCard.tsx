import React from "react";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { StyledTitle } from "baseui/card";

const PostCard = () => {
  return (
    <Card
      overrides={{
        Root: {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
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
      {/* Header Section */}
      <StyledTitle>
        <h3 style={{ margin: 0 }}>Post Title</h3>
      </StyledTitle>

      {/* Body Section */}
      <StyledBody>
        This is a sample post description. It provides details about the content of the post.
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
    </Card>
  );
};

export default PostCard;