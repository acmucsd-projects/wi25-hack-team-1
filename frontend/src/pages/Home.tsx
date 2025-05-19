import React, { useState, useEffect } from "react";
import Card from "@/components/PostCard";
import FilterBar from "@/components/FilterBar";
import CreatePostModal from "@/components/CreatePostModal";
import PopUp from "@/components/PopUp";
import { Post } from "@/types";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const onSubmit = (filters) => {
    console.log("Filters submitted:", filters);
  };

  const togglePopUp = () => {
    console.log("Toggle popup called");
    setIsPopUpOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/post`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = (await response.json()) as Post[];
        setPosts(
          data.map((post) => ({
            ...post,
            flightDay: new Date(post.flightDay),
            time: new Date(post.time),
          })),
        );
        console.log("Posts fetched:", data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <FilterBar onSubmit={onSubmit} />
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
      <CreatePostModal />
      {posts &&
        posts.map((post, idx) => (
          <Card
            key={post._id ?? idx} // fallback to index if _id is null/undefined
            location={post.airport}
            date={post.flightDay}
            time={post.time}
            numPeople={post.numPassengers}
            name={post.creator ? `${post.creator.name}` : "Unknown"}
          />
        ))}
    </div>
  );
};

export default Home;
