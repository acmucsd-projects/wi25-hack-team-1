import React, { useState, useEffect, useContext } from "react";
import Card from "@/components/PostCard";
import FilterBar from "@/components/FilterBar";
import CreatePostModal from "@/components/CreatePostModal";

import { Post } from "@/types";
import { Button } from "baseui/button";

import styles from "./Home.module.css";
import { UserContext } from "@/contexts/UserContext";

const Home: React.FC = () => {
  const { firebaseUser } = useContext(UserContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const onSubmit = async (filters: {
    date: Date | Date[] | (Date | null | undefined)[] | null | undefined;
    timeSort: "asc" | "desc";
    destination: string[];
    gender: string[];
  }) => {
    console.log("Filters submitted:", filters);

    try {
      let url = `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/post`;
      let query = "";

      // Destination (only one selection)
      if (filters.destination.length > 0) {
        const selectedDestination = filters.destination[0]; // Now the ID, like "SAN" or "LAX"
        query += `airport=${encodeURIComponent(selectedDestination)}`;
      }

      // Gender (optional, can be multiple)
      if (filters.gender.length > 0) {
        const genderQuery = filters.gender
          .map((g: string) => `gender=${encodeURIComponent(g)}`)
          .join("&");
        query += query ? `&${genderQuery}` : genderQuery;
      }

      // Date
      if (Array.isArray(filters.date) && filters.date[0] instanceof Date) {
        const isoDate = filters.date[0].toISOString().split("T")[0];
        query += query ? `&date=${isoDate}` : `date=${isoDate}`;
      }

      // Sort by time
      if (filters.timeSort) {
        query += query
          ? `&sort=${filters.timeSort}`
          : `sort=${filters.timeSort}`;
      }

      // Finalize full URL
      if (query) {
        url += `?${query}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch filtered posts");
      }
      const data = await response.json();
      setPosts(
        data.map((post: Post) => ({
          ...post,
          flightDay: new Date(post.flightDay),
          time: new Date(post.time),
        })),
      );
    } catch (err) {
      console.error("Error fetching filtered posts:", err);
    }
  };

  useEffect(() => {
    console.log(firebaseUser);
  }, [firebaseUser]);

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
        onClick={() => {
          if (!firebaseUser) {
            alert("Please log in to create a post.");
            return;
          }

          setIsPostModalOpen(true);
        }}
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
              name={firebaseUser ? `${post.creator.name}` : "Anonymous"}
              email={post.creator?.email}
              isAuthenticated={!!firebaseUser}
              gender={
                (post.creatorGender ?? "Other") as "Male" | "Female" | "Other"
              }
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
