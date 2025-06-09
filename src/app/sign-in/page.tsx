'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

export default function AdminSignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi sederhana atau simulasikan login berhasil
    if (username && password) {
      router.push('/dashboard');
    } else {
      alert('Silakan isi Username dan Password');
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div className="max-w-5xl mx-auto w-full px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-10">Sign In Admin</h1>

        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row items-center gap-10">
          <form onSubmit={handleSubmit} className="flex-1 w-full max-w-md space-y-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">USERNAME</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Isi Username Anda"
                  className="bg-transparent w-full outline-none text-gray-800"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">PASSWORD</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Isi Password Anda"
                  className="bg-transparent w-full outline-none text-gray-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition"
            >
              Sign In
            </button>
          </form>

          <div className="block flex-1">
            <img
              src="/img/img1.jpg"
              alt="Login Illustration"
              className="w-full max-w-sm mx-auto"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
