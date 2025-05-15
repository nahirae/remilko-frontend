"use client";
import Navbar from "../Dashboard/Components/Navbar";
import Footer from "../Dashboard/Components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { SquarePen } from "lucide-react";

export default function Profile() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    username: "hiraetna",
    name: "Naya Nasywa",
    email: "naya@example.com",
  });

  const handleLogout = async () => {
    setMsg("");
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.removeItem("token");
      setMsg("Berhasil Logout!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      console.error("Error logout: ", err.response?.data || err.message);
      setMsg("Gagal logout. Silakan coba lagi.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = () => {
    setEditable(!editable);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
            <form className="space-y-4 p-7">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  USERNAME
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NAMA
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editable}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div className="flex space-x-4 mt-10">
                <Link
                  href="/Recook"
                  className="w-1/2 bg-[#608BC1] text-white py-2 rounded-lg hover:bg-[#6282a9] text-center"
                >
                  Recook Saya
                </Link>
                <Link
                  href="/Bookmark"
                  className="w-1/2 bg-[#608BC1] text-white py-2 rounded-lg text-center hover:bg-[#6282a9]"
                >
                  Bookmark
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
