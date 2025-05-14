import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";

export default function KontenKreator(){
    return(
        <div className="min-h-screen bg-white">
            <Navbar/>
            <h2 className="text-3xl font-bold pl-10 pt-10 pb-5">Konten Kreator</h2>
            <div className="justify-center flex gap-10 mb-6">
                {[1, 2, 3].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-xl shadow-md overflow-hidden w-full max-w-[9.7cm]">
                    <div className="bg-[#c7a956] flex items-center gap-3 mb-1 mt-4 p-1 w-48 rounded-r-full">
                    <img src="/asset/profile.png" alt="Profile" className="w-8 h-8 rounded-full object-cover ml-4" />
                    <div>
                        <p className="font-semibold text-gray-50 text-sm ">Najwah Kamila</p>
                        <p className="text-xs text-gray-100">127 Resep</p>
                    </div>
                    </div>
                    <div className="flex justify-between p-3 text-left ">
                    <img src="/asset/img2.png" alt="Resep" className="w-38 h-24 object-cover rounded-lg" />
                    <div className=" w-40">
                        <h3 className="mt-2 mb-3 text-[16px] font-semibold">Bola - bola Daging Ayam Krim Keju</h3>
                        <button className="text-xs text-gray-500 mt-2.5 hover:underline">Lihat Semua Resep</button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            <div className="justify-center flex gap-10 mb-6">
                {[1, 2, 3].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-xl shadow-md overflow-hidden w-full max-w-[9.7cm]">
                    <div className="bg-[#c7a956] flex items-center gap-3 mb-1 mt-4 p-1 w-48 rounded-r-full">
                    <img src="/asset/profile.png" alt="Profile" className="w-8 h-8 rounded-full object-cover ml-4" />
                    <div>
                        <p className="font-semibold text-gray-50 text-sm ">Najwah Kamila</p>
                        <p className="text-xs text-gray-100">127 Resep</p>
                    </div>
                    </div>
                    <div className="flex justify-between p-3 text-left ">
                    <img src="/asset/img2.png" alt="Resep" className="w-38 h-24 object-cover rounded-lg" />
                    <div className=" w-40">
                        <h3 className="mt-2 mb-3 text-[16px] font-semibold">Bola - bola Daging Ayam Krim Keju</h3>
                        <button className="text-xs text-gray-500 mt-2.5 hover:underline">Lihat Semua Resep</button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            
            <Footer/>
        </div>
    );
}