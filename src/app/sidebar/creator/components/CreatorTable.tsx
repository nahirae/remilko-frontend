'use client';
import React from 'react';

const creators = [
  { name: 'Nadila', email: 'example@gmail.com', status: 'Accept' },
  { name: 'Meivika', email: 'example@gmail.com', status: 'Pending' },
  { name: 'Rahmawati', email: 'example@gmail.com', status: 'Accept' },
  { name: 'Meinadzz', email: 'example@gmail.com', status: 'Accept' },
];

export default function CreatorTable() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Creator Invitations</h2>

      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Masukkan email untuk undangan"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 active:scale-95 transition cursor-pointer shadow"
        >
          Kirim Undangan
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 uppercase text-xs tracking-wider">
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {creators.map((creator, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 transition ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-4 py-3 font-medium text-gray-800">{creator.name}</td>
                <td className="px-4 py-3 text-gray-600">{creator.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold transition duration-200 cursor-pointer hover:brightness-95 active:scale-95 ${
                      creator.status === 'Accept'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {creator.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
