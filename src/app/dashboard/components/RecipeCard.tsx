"use client";
import { Timer, Bookmark, BookmarkCheck, Flame, Utensils } from "lucide-react";
import { useState } from "react";

type Props = {
    title: string;
    image: string;
    user: string;
    profile: string;
  };
  
export default function RecipeCard({ title, image, user, profile }: Props) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden w-full max-w-[9.7cm] p-4">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-xl" />
      <div className="p-4">
        <h3 className="font-semibold text-lg pb-3">{title}</h3>      

        <div className="flex items-center justify-between mt-2 text-gray-700 text-sm gap-2">
          <div className="flex gap-1.5">
            <Timer className="w-4 h-4"/>
            <span>30 Minutes</span>
          </div>
          <div className="flex gap-2">
            <Utensils className="w-4 h-4"/>
            <span>Makan Siang</span>
          </div>
          <div className="flex gap-2">
            <Flame className="w-4 h-4"/>
            <span>210 Cals</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">★</span>
            <span className="text-gray-700">(4.7)</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <img src={profile} alt={user} className="w-8 h-8 rounded-full object-cover"/>
            <span className="font-medium">{user}</span>
          </div>

          <button 
          onClick={toggleBookmark}
          className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-200">
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-orange-500"/>
            ) : (
              <Bookmark className="w-5 h-5 text-gray-600"/>
            )}
          </button>
        </div>
      </div>
    </div> 
  );
}
