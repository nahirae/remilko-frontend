'use client';
import React from 'react';

const activities = [
  { name: 'Mengunggah Resep Soto Ayam', time: '10 Menit', avatar: '/img/unknown.jpeg' },
  { name: 'Mengunggah Resep Nasi Goreng Acar', time: '25 Menit', avatar: '/img/unknown2.jpeg' },
  { name: 'Mengunggah Resep Creamy Pasta dan Daging Ayam', time: '1 jam yang lalu', avatar: '/img/unknown2.jpeg' },
];

export default function ActivityList() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Aktivitas Pengguna</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index} className="flex items-center justify-between border-b py-2">
            <div className="flex items-center gap-2">
              <img src={activity.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
              <span>{activity.name}</span>
            </div>
            <span className="text-green-600 text-sm">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
