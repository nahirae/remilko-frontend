'use client'
import Footer from "../dashboard/components/Footer";
import Navbar from "../dashboard/components/Navbar";
import Link from "next/link";

export default function Login(){
    return(
        <div className="flex-grow flex items-center justify-center p-4">
            <Navbar />
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl w-full flex">
            
            <div className="w-1/2 flex items-center justify-center">
                <div className="text-center">
                <img
                    src="/asset/SignUp.png"
                    alt="Recipe Illustration"
                    className="mx-auto mb-4"
                />
                </div>
            </div>

            <div className="w-1/2 p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                        type="text"
                        placeholder="Isi Username Anda"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                        type="password"
                        placeholder="Isi Password Anda"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <button
                        type="submit"
                        className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                        Sign Up
                        </button>
                        <Link
                        href="/SignUp"
                        className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-lg text-center hover:bg-gray-300"
                        >
                        Sign In
                        </Link>
                    </div>
                </form>
                
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500">Atau</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                    <div className="flex justify-center space-x-4">
                    <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
                        <img src="https://via.placeholder.com/24?text=F" alt="Facebook" />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
                        <img src="https://via.placeholder.com/24?text=G" alt="Google" />
                    </button>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    );
}