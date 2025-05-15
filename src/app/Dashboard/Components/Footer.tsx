import Link from "next/link";

export default function Footer() {
    return(
        <div className="bg-[#F7F7E9] p-8 mt-16 pt-12">
            <div className="grid grid-cols-2">
                <div className="pl-4">
                    <h1 className="text-xl pb-2 font-bold text-gray-900">Remilko<span className="text-orange-500">.</span></h1>
                    <p className="text-gray-600 mb-2">
                        Modal Receh Hasilnya Premium - Resep Jitu Anak Kost Masak itu Gampang! Yuk Eksplor Ribuan Resep Menarik di Remilko.
                    </p>
                </div>

                <div className="text-right pr-4">
                    <nav className="space-x-4 mb-2  mt-8">
                    <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Home</Link>
                    <Link href="/Recipe" className="text-gray-600 hover:text-gray-900">Recipes</Link>
                    <Link href="/Contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
                    <Link href="/AboutUs" className="text-gray-600 hover:text-gray-900">About us</Link>
                    </nav>
                </div>
            </div>
            
            
            <hr className="flex-grow border-gray-500 mt-10 ml-4 mr-4"/>
            <p className="text-gray-600 text-sm text-center pt-4">© 2025 Remilko. All Right Reserved</p>  
        </div>
    );
}