import { useContext, useState } from "react";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Card } from "baseui/card";
import { Block } from "baseui/block";
import { styled } from "baseui";
import { UserContext } from "@/contexts/UserContext";
import { createUser } from "@/api/user";

const genderOptions = [
  { label: "Male", id: "male" },
  { label: "Female", id: "female" },
  { label: "Other", id: "other" },
];

const Overlay = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
});

const DropdownContainer = styled("div", {
  position: "relative",
  width: "100%",
  overflow: "visible", // Ensure dropdown is not clipped
});

const DropdownMenu = styled("ul", {
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  background: "#fff",
  border: "1px solid #ccc",
  borderRadius: "4px",
  zIndex: 1100,
  listStyle: "none",
  margin: 0,
  padding: 0,
  maxHeight: "180px",
  overflowY: "auto",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
});

const DropdownItem = styled("li", ({ $active }) => ({
  padding: "10px",
  cursor: "pointer",
  background: $active ? "#f0f0f0" : "#fff",
  ":hover": {
    background: "#f0f0f0",
  },
}));

const AuthModal = () => {
  const { firebaseUser, mongoUser, refreshUser } = useContext(UserContext);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(genderOptions[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSubmit = async () => {
    if (!firebaseUser) return;

    const userData = {
      uid: firebaseUser.uid,
      phone: phoneNumber,
      uni: "University of California, San Diego",
      email: firebaseUser.email || "",
      name: firebaseUser.displayName || "",
      photoURL: firebaseUser.photoURL || "",
      gender: gender.label,
    };

    try {
      await createUser(await firebaseUser.getIdToken(), userData);

      await refreshUser();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  if (!firebaseUser || mongoUser) {
    return;
  }

  return (
    <Overlay>
      <Card
        overrides={{
          Root: {
            style: {
              width: "400px",
              overflow: "visible", // Prevent clipping of dropdown
            },
          },
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Block display="flex" flexDirection="column" gap="20px">
            <h2 style={{ marginTop: 0 }}>Please complete your profile</h2>

            <FormControl label="Phone Number">
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </FormControl>

            <FormControl label="Gender">
              <DropdownContainer>
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "10px",
                    cursor: "pointer",
                    background: "#fff",
                  }}
                  onClick={() => setDropdownOpen((open) => !open)}
                  tabIndex={0}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 100)}
                >
                  {gender.label}
                </div>
                {dropdownOpen && (
                  <DropdownMenu>
                    {genderOptions.map((option) => (
                      <DropdownItem
                        key={option.id}
                        $active={option.id === gender.id}
                        onClick={() => {
                          setGender(option);
                          setDropdownOpen(false);
                        }}
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                )}
              </DropdownContainer>
            </FormControl>

            <Block display="flex" justifyContent="flex-end" gap="10px">
              <Button type="button" kind="secondary">
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </Block>
          </Block>
        </form>
      </Card>
    </Overlay>
  );
};

export default AuthModal;
