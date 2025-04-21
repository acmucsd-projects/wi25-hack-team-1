import Card from "@/components/PostCard";
import FilterBar from "@/components/FilterBar";

const Home: React.FC = () => {
  const onSubmit = (filters) => {
    console.log("Filters submitted:", filters);
  };

  return (
    <div>
      <FilterBar onSubmit={onSubmit} />
      <Card />
    </div>
  );
};

export default Home;
