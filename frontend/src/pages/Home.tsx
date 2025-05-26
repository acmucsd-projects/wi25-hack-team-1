import React, { useState, useEffect } from "react";
import Card from "@/components/PostCard";
import FilterBar from "@/components/FilterBar";
import CreatePostModal from "@/components/CreatePostModal";
import { Post } from "@/types";
import { Button } from "baseui/button";

import styles from "./Home.module.css";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const onSubmit = (filters) => {
    console.log("Filters submitted:", filters);
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

      <Button
        onClick={() => setIsPostModalOpen(true)}
        overrides={{
          BaseButton: {
            style: {
              position: "fixed",
              bottom: "5rem",
              right: "5rem",
              borderRadius: "50%",
              width: "70px",
              height: "70px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            },
          },
        }}
      >
        Post
      </Button>

      <CreatePostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />

      <div className={styles.postsContainer}>
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
    </div>
  );
};

export default Home;
