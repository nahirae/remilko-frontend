"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Remilko<span className="text-orange-500">.</span></h1>
      <div className="flex items-center gap-6">
        <Link href="#">Home</Link>
        <Link href="#">Recipes</Link>
        <Link href="#">Contact</Link>
        <Link href="#">About us</Link>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-700 hover:text-blue-500">Log in</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Sign Up
        </button>
      </div>
    </nav>
  );
}
