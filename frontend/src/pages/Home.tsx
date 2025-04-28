import Card from "@/components/PostCard";
import FilterBar from "@/components/FilterBar";
import CreatePostModal from "@/components/CreatePostModal";

const Home: React.FC = () => {
  const onSubmit = (filters) => {
    console.log("Filters submitted:", filters);
  };

  return (
    <div>
      <FilterBar onSubmit={onSubmit} />
      <CreatePostModal />
      <Card />
    </div>
  );
};

export default Home;
