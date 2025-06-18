'use client'
import { useState } from "react";

export default function CookingSteps(){
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const utensils = [
        "Wajan",
        "Spatula",
        "Piring",
        "Talenan",
        "Pisau",
        "Sendok",
    ];

    const ingredients = [
      "2 piring nasi putih",
      "100 gram acar kuning",
      "2 butir telur",
      "2 siung bawang putih",
      "3 siung bawang merah",
      "2 cabai merah, iris serong",
      "1 batang daun bawang, iris halus",
      "2 sdm kecap manis",
      "1 sdm kecap asin",
      "1 sdt saus tiram",
    ];
  
    const instructions = [
      "Panaskan margarin/minyak dalam wajan, Tumis bawang putih, bawang merah, dan cabai hingga harum.",
      "Dorong tumisan ke sisi wajan, tuang kocokan telur di bagian kosong. Orak-arik hingga setengah matang, lalu campur dengan bahan lain.",
      "Masukkan nasi, aduk rata. Tambahkan kecap manis, kecap asin, saus tiram, merica, dan garam. Aduk hingga warna merata.",
      "Tambahkan acar kuning (tiriskan airnya) dan daun bawang. Aduk cepat agar acar tetap renyah. Koreksi rasa.",
      "Hidangkan panas dengan telur mata sapi, kerupuk, dan pelengkap lainnya.",
    ];
  
    const toggleCheck = (item: string) => {
      setCheckedItems((prev) =>
        prev.includes(item)
          ? prev.filter((i) => i !== item)
          : [...prev, item]
      );
    };


    return(
        <div className="justify-between flex pt-10">
            <div className="w-full rounded-xl bg-[#C9D7DD] ml-10 p-7 mr-7">
                <h2 className="font-bold text-lg mb-2">Alat - alat :</h2>
                <div className="grid grid-cols-2 gap-2">
                    {utensils.map((item) => (
                        <label
                        key={item}
                        className="flex items-center space-x-2 cursor-pointer"
                        >
                        <input
                            type="checkbox"
                            checked={checkedItems.includes(item)}
                            onChange={() => toggleCheck(item)}
                            className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-[#608BC1] checked:border-transparent transition duration-200"
                        />
                        <span
                            className={`${
                            checkedItems.includes(item)
                                ? "line-through text-gray-400"
                                : "text-gray-800"
                            }`}
                        >
                            {item}
                        </span>
                        </label>
                    ))}
                </div>

                <h2 className="font-bold text-lg mb-2 mt-4">Bahan - bahan :</h2>
                <div className="grid grid-cols-2 gap-2">
                    {ingredients.map((item) => (
                        <label
                        key={item}
                        className="flex items-center space-x-2 cursor-pointer mb-2"
                        >
                        <input
                            type="checkbox"
                            checked={checkedItems.includes(item)}
                            onChange={() => toggleCheck(item)}
                            className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-[#608BC1] checked:border-transparent transition duration-200"
                        />
                        <span
                            className={`${
                            checkedItems.includes(item)
                                ? "line-through text-gray-400"
                                : "text-gray-800"
                            }`}
                        >
                            {item}
                        </span>
                        </label>
                    ))}
                </div>
                
                <h2 className="font-bold text-lg mb-2 mt-4">Instruksi Memasak :</h2>
                <ol className="space-y-3 text-gray-700">
                {instructions.map((step, i) => (
                    <li key={i} className="flex items-center space-x-3 mb-2">
                        <div className="bg-[#608BC1] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                            {i + 1}
                        </div>
                        <span>{step}</span>
                    </li>
                ))}
                </ol>
            </div>

            <div className="w-xl mr-10">
                <h2 className="font-bold text-xl mb-3">Resep Lain</h2>
                <div className="flex gap-3 mb-5">
                    <img src="/asset/img2.png" alt="food1" className="h-24 rounded-xl"/>
                    <span>
                        <p className="font-bold text-sm mb-3 mt-2">Bola - Bola Daging Ayam Krim Keju</p>
                        <p className="text-sm text-gray-600">By Najwah Kamila</p>
                    </span>
                </div>
                <div className="flex gap-3 mb-5">
                    <img src="/asset/img3.png" alt="food1" className="h-24 rounded-xl"/>
                    <span>
                        <p className="font-bold text-sm mb-3 mt-2">Bola - Bola Daging Ayam Krim Keju</p>
                        <p className="text-sm text-gray-600">By Najwah Kamila</p>
                    </span>
                </div>
                <div className="flex gap-3 mb-5">
                    <img src="/asset/img0.png" alt="food1" className="h-24 rounded-xl"/>
                    <span>
                        <p className="font-bold text-sm mb-3 mt-2">Bola - Bola Daging Ayam Krim Keju</p>
                        <p className="text-sm text-gray-600">By Najwah Kamila</p>
                    </span>
                </div>
            </div>
        </div>
    );
}