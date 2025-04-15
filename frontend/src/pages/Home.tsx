import React from 'react';
import Card from '@/components/PostCard';
import FilterBar from '@/components/FilterBar';


const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <FilterBar />
      <Card/>
    </div>
  );
};

export default Home;