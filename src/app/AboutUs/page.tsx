import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";

export default function AboutUs(){
    return(
        <div className="min-h-screen bg-white text-black">
            <Navbar />
            <h1 className="text-4xl font-bold mb-10 mt-10 text-center">Tentang Kami</h1>
            <div className="relative flex-grow">
                <img
                src="/asset/aboutus.png"
                alt="About Us Illustration"
                className="w-full h-auto object-cover"
                />
                <div className="absolute top-1/2 right-0 transform -translate-x-20 -translate-y-1/2">
                    <div className="bg-white rounded-xl shadow-[0_5px_25px_rgba(0,0,0,0.11)] p-6 max-w-lg mx-auto p-7">
                        <p className="text-3xl font-bold text-black mb-4 text-center">
                            Setiap orang bisa menjadi koki di dapur mereka sendiri
                        </p>
                        <p className="text-gray-700 text-sm text-left mb-7">
                            Resep kami adalah kumpulan ide kreatif dari komunitas kuliner kami, dan resep
                            kami mencerminkan komitmen kami untuk menginspirasi, mendidik, dan
                            memberdayakan Anda melalui pengalaman bersantap yang lezat dan menyenangkan.
                        </p>
                    </div>
                </div>
            </div>  

            <Footer/>
        </div>
    )
};