import { ThumbsUp, Share2 } from "lucide-react";
import Link from "next/link";

export default function PreviewRecook(){
    return(
        <div className="min-h-screen bg-white" >
            <hr className="bg-blue-900 w-3xl border-none rounded h-1 ml-10 mt-10" />
            <h2 className="ml-10 mt-5 font-bold text-2xl mb-5">Recook</h2>
            <Link 
            href='/TambahRecook'
            className="px-6 py-3 bg-blue-900 text-white rounded-xl ml-10 mt-7"
            >
                Bagikan Hasil Recookmu
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 ">
                {[1, 2].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-xl shadow-md p-4">
                    <div className="flex items-center gap-3 mb-2">
                    <img src="/asset/profile.png" alt="User" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                        <p className="font-semibold text-sm">Nasi Goreng Acar</p>
                        <p className="text-xs text-gray-500">Naya Nasywa</p>
                    </div>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                    </div>

                    <p className="text-sm text-gray-700 mt-2">
                    “Saya sebagai penggemar pasta, dan resep pasta ini benar-benar mahakarya kuliner dan telah membawa saya terhadap olahan noodle ke tingkat benar-benar baru.”
                    </p>

                    <img src="/asset/img6.png" alt="Recook" className="w-full h-48 object-cover mt-2 rounded-xl" />

                    <div className="flex text-sm text-gray-600 mt-3">
                    <span className="flex cursor-pointer items-center gap-1"> <ThumbsUp className="w-5 h-5" /> 1</span>
                    <span className="flex gap-1 cursor-pointer ml-7"> <Share2 className="w-5 h-5"/> Share</span>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}