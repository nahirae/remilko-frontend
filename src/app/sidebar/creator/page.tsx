import React from 'react';
import StatsCard from './components/StatsCard';
import ActivityList from './components/ActivityList';
import CreatorTable from './components/CreatorTable';

export default function CreatorPage() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <StatsCard />
      <ActivityList />
      <CreatorTable />
    </main>
  );
}
