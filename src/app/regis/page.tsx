'use client'
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";

export default function SignUp(){
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Username:", name);
        console.log("Email:", email);
        console.log("Password:", password);
        // Simulasi redirect setelah "registrasi"
        router.push('/sidebar/dashboard');
    };

    return(
        <div className="min-h-screen flex flex-col bg-white text-black">
            <h1 className="text-4xl font-bold mb-5 mt-10 text-center">Sign Up</h1>
            <div className="flex-grow flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-[0_5px_25px_rgba(0,0,0,0.11)] p-8 max-w-4xl w-full flex">
                
                <div className="w-1/2 flex items-center justify-center">
                    <div className="text-center">
                    <img
                        src="/img/img1.jpg"
                        alt="Recipe Illustration"
                        className="mx-auto mb-4"
                    />
                    </div>
                </div>

                <div className="w-1/2 p-4">
                    <form className="space-y-4 p-7" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Isi Username Anda"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Isi Email Anda"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Isi Password Anda"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex space-x-4 mt-10">
                        <button
                        type="submit"
                        className="w-1/2 bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 text-center"
                        >
                            Sign Up
                        </button>
                        
                        <Link
                        href="/sign-in"
                        className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-lg text-center hover:bg-gray-300"
                        >
                            Sign In
                        </Link>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    );
}
