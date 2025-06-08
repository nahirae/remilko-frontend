'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../dashboard/components/Navbar';
import Footer from '../dashboard/components/Footer';
import { SquarePen } from 'lucide-react';
import { getProfile, putProfile, updateProfile, logout } from '@/lib/auth';

interface FormData {
  username: string;
  name: string;
  email: string;
}

export default function Profile() {
  const router = useRouter();
  const [msg, setMsg] = useState('');
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const user = await putProfile();
        console.log('Fetched user:', user); // Debug
        setFormData({
          username: user.name,
          name: user.name,
          email: user.email,
        });
      } catch (err: any) {
        console.error('Fetch profile error:', err);
        if (err.response?.status === 401) {
          router.push('/login');
        } else {
          setMsg('Gagal mengambil profil. Silakan coba lagi.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    setMsg('');
    try {
      await logout();
      setMsg('Berhasil Logout!');
      router.push('/login');
    } catch (err: any) {
      console.error('Logout error:', err);
      setMsg('Gagal logout. Silakan coba lagi.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editable) return;

    try {
      const updatedUser = await updateProfile({
        name: formData.username,
        email: formData.email,
      });
      setFormData({
        username: updatedUser.name,
        name: updatedUser.name,
        email: updatedUser.email,
      });
      setEditable(false);
      setMsg('Profil berhasil diperbarui!');
    } catch (err: any) {
      console.error('Update profile error:', err);
      setMsg('Gagal memperbarui profil. Silakan coba lagi.');
    }
  };

  const toggleEdit = () => {
    setEditable(!editable);
    if (editable) {
      setMsg('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-black">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-black">
      <Navbar />
      <h1 className="text-4xl font-bold mb-5 mt-10 text-center">Profile</h1>
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-[0_5px_25px_rgba(0,0,0,0.11)] p-8 max-w-4xl w-full flex">
          <div className="w-1/2 relative flex items-center justify-center">
            <div className="text-center">
              <img
                src="/asset/profile.png"
                alt="Profile Illustration"
                className="mx-auto mb-4 w-64 rounded-full border"
              />
              <button
                onClick={toggleEdit}
                className="absolute bottom-36 right-28 bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-gray-100"
              >
                <SquarePen className="w-5 h-5 text-gray-700" />
              </button>
              <p className="font-bold mt-4">{formData.name}</p>
              <p className="text-sm text-gray-700 mb-6">@{formData.username}</p>
              <button
                onClick={handleLogout}
                className="w-full p-2 bg-red-800 text-white py-2 rounded-lg hover:bg-red-600 text-center"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="w-1/2 p-4">
            <form onSubmit={handleSubmit} className="space-y-4 p-7">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">USERNAME</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!editable}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NAMA</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editable}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editable}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
              {editable && (
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 text-center"
                >
                  Simpan Perubahan
                </button>
              )}
              <div className="flex space-x-4 mt-10">
                <Link href="/recook" className="w-1/2 bg-[#608BC1] text-white py-2 rounded-lg hover:bg-[#6282a9] text-center">
                  Recook Saya
                </Link>
                <Link href="/bookmark" className="w-1/2 bg-[#608BC1] text-white py-2 rounded-lg text-center hover:bg-[#6282a9]">
                  Bookmark
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {msg && (
        <p className={`text-center mt-4 ${msg.includes('Gagal') ? 'text-red-500' : 'text-green-500'}`}>
          {msg}
        </p>
      )}
      <Footer />
    </div>
  );
}