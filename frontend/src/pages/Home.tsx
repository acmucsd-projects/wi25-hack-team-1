import React, { useState } from "react";
import Card from "@/components/PostCard";
import FilterBar from "@/components/FilterBar";
import CreatePostModal from "@/components/CreatePostModal";
import PopUp from "@/components/PopUp";

const Home: React.FC = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const onSubmit = (filters) => {
    console.log("Filters submitted:", filters);
  };

  const togglePopUp = () => {
    console.log("Toggle popup called");
    setIsPopUpOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Filter Bar */}
      <FilterBar onSubmit={onSubmit} />

      {/* Modal to Create Post */}
      <CreatePostModal />

      {/* Post Card */}
      <Card />

      {/* Button to open the popup (centered) */}
      <button
        onClick={togglePopUp}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          cursor: "pointer",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Enter Details
      </button>

      {/* Render the PopUp component with required props */}
      <PopUp isOpen={isPopUpOpen} togglePopup={togglePopUp} />
    </div>
  );
};

export default Home;