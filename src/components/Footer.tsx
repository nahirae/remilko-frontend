import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#FAF9F2] text-sm text-gray-600 px-6 py-8 border-t">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 md:flex-row justify-between">
        <div>
          <h2 className="text-xl font-semibold text-black italic mb-2">
            Remilko<span className="text-orange-500">.</span>
          </h2>
          <p>
            Modal Receh Hasilnya Premium - Resep Jitu Anak Kos! Masak Itu Gampang!
            Yuk Eksplor Ribuan Resep Menarik di Remilko.
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-4">
          <ul className="flex gap-6">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Recipes</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">About us</a></li>
          </ul>

          <div className="flex gap-4 text-xl">
            <a href="#" aria-label="Facebook" className="text-gray-700 hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-700 hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-700 hover:text-pink-500">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 border-t pt-4">
        © 2025 <span className="text-blue-600">Remilko</span>. All Right Reserved
      </div>
    </footer>
  );
}
