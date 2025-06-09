'use client';
import React from 'react';

const stats = [
  { title: 'Bookmarks', count: 127 },
  { title: 'Draft Resep', count: 127 },
  { title: 'Pencarian Resep', count: 127 },
];

export default function StatsCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#FAF9F2] rounded-xl p-4 text-center shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
          <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
        </div>
      ))}
    </div>
  );
}
