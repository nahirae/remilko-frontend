import Link from "next/link";

export default function Footer() {
    return(
        <div className="bg-cream-100 p-4 text-center">
            <div className="text-orange-500 font-bold mb-2">Remilko.</div>
            <p className="text-gray-600 mb-2">
            Modal Receh Hasilnya Premium - Resep Jitu Anak Kost Masak itu Gampang! Yuk Eksplor Ribuan Resep Menarik di Remilko.
            </p>

            <nav className="space-x-4 mb-2">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link href="/recipes" className="text-gray-600 hover:text-gray-900">Recipes</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About us</Link>
            </nav>

            <div className="flex justify-center space-x-4 mb-2">
            <a href="#" className="text-gray-600 hover:text-gray-900">f</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">t</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">i</a>
            </div>
            
            <p className="text-gray-500 text-sm">© 2025 Remilko. All Right Reserved</p>  
        </div>
    );
}