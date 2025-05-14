'use client'
import Navbar from "@/app/dashboard/components/Navbar";
import Footer from "@/app/dashboard/components/Footer";
import CookingSteps from "./CookingSteps";
import PreviewRecook from "./PreviewRecook";
import Comentar from "./Comentar";
import { Timer, Utensils, Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";

export default function ReceiptInformation(){

    const [isBookmarked, setIsBookmarked] = useState(false);
    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    return(
        <div className="min-h-screen bg-white text-gray-800">
            <Navbar/>
            <p className="text-3xl font-bold pl-10 pt-10 pb-5">Nasi Goreng Acar</p>
            <div className="flex items-center justify-between mt-2 text-gray-700 w-xl pl-5 text-sm gap-2">
                <div className="flex gap-2.5">
                    <img src="/asset/profile.png" alt="Profile" className="w-8 h-8 rounded-full object-cover ml-4" />    
                        <span>
                            <p className="font-bold text-xs pb-1">Renjana Braga</p>
                            <p className="text-xs">15 Maret 2025</p>
                        </span>
                </div>
                
                <div className="flex gap-2.5">
                    <Timer/>
                    <span>
                        <p className="text-xs font-bold pb-1">persiapan</p>
                        <p className="text-xs">15 Menit</p>
                    </span>
                </div>

                <div className="flex gap-2.5">
                    <Timer/>
                    <span>
                        <p className="text-xs font-bold pb-1">waktu masak</p>
                        <p className="text-xs">15 Menit</p>
                    </span>
                </div>
                <div className="flex gap-2.5">
                    <Utensils className="h-5 w-5"/>
                    <span>
                        <p className="text-xs pt-1">Makan Siang</p>
                    </span>
                </div>
            </div>

            <div className="justify-items-end rounded-full mr-10">
                <button 
                onClick={toggleBookmark}
                className="flex items-center justify-center rounded-full w-10 h-10 bg-[#C9D7DD]">
                    {isBookmarked ? (
                        <BookmarkCheck className="w-5 h-5 text-orange-600"/>
                        ) : (
                        <Bookmark className="w-5 h-5 text-gray-600"/>
                    )}
            </button>
            </div>

            <div className="flex justify-between pt-5 ">
                <img
                className="rounded-xl w-[700px] pl-10"
                src="/asset/img6.png" alt="nasi goreng acar"
                />
                <div className="rounded-xl bg-[#C9D7DD] p-7 ml-8 mr-10 w-full">
                    <p className="font-bold text-xl mb-5">Informasi Nutrisi</p>
                    <div className="flex justify-between">
                        <p>Kalori</p>
                        <p className="font-bold">219.9 kcal</p>
                    </div>
                    <hr className="text-gray-400 mb-5 mt-1" />
                    <div className="flex justify-between">
                        <p>Total Lemak</p>
                        <p className="font-bold">10.7 g</p>
                    </div>
                    <hr className="text-gray-400 mb-5 mt-1" />
                    <div className="flex justify-between">
                        <p>Protein</p>
                        <p className="font-bold">7.9 g</p>
                    </div>
                    <hr className="text-gray-400 mb-4 mt-1" />
                    <div className="flex justify-between">
                        <p>Karbohidrat</p>
                        <p className="font-bold">22.3 g</p>
                    </div>
                    <hr className="text-gray-400 mb-4 mt-1" />
                </div>
            </div>
            <p className="p-10 text-gray-600">Hidangan ini adalah variasi nasi goreng yang menggabungkan cita rasa gurih, pedas, dan sedikit 
                asam segar dari acar (sayuran yang diasamkan). Hidangan ini memiliki tekstur yang 
                unik berkat tambahan acar yang renyah, serta rasa yang kaya berpadu dengan bumbu 
                nasi goreng klasik seperti bawang, kecap, dan rempah-rempah. Cocok disajikan dengan 
                telur mata sapi, kerupuk, atau ayam goreng.
            </p>

            <CookingSteps/>
            <PreviewRecook/>
            <Comentar/>
            <Footer/>
        </div>
    );
}