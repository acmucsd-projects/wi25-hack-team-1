import React from 'react';
import Card from '@/components/PostCard';
import FilterBar from '@/components/FilterBar';


const Home: React.FC = () => {
  return (
    <div>
      <FilterBar />
      <Card/>
    </div>
  );
};

export default Home;