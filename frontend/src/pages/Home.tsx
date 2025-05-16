import Card from "@/components/PostCard";
import FilterBar from "@/components/FilterBar";
import CreatePostModal from "@/components/CreatePostModal";
import { useEffect, useState } from "react";
import { Post } from "@/types";
import { time } from "console";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const onSubmit = (filters) => {
    console.log("Filters submitted:", filters);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_BACKEND_URL}api/post`,
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
      <CreatePostModal />
      {posts &&
        posts.map((post, idx) => (
          <Card
            key={post._id ?? idx} // fallback to index if _id is null/undefined
            location={post.airport}
            date={post.flightDay}
            time={post.time}
            numPeople={post.numPassengers}
            name={
              post.creatorId
                ? `${post.creatorId.firstName ?? ""} ${post.creatorId.lastName ?? ""}`
                : "Unknown"
            }
          />
        ))}
    </div>
  );
};

export default Home;
