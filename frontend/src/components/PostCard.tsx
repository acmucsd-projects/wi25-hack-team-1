import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button } from "baseui/button";

const PostCard = () => {
  return (
    <Card title="UserCard">
      <StyledBody>
        Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
        faucibus ex, non facilisis nisl. Proin ut dui sed metus pharetra hend
        rerit vel non mi. Nulla ornare faucibus ex, non facilisis nisl.
      </StyledBody>
      <StyledAction>
        <Button
          overrides={{
            BaseButton: {
              style: {
                width: "100%",
              },
            },
          }}
        >
          Button Label
        </Button>
      </StyledAction>
    </Card>
  );
};

export default PostCard;
