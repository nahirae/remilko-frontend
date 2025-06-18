import Navbar from "../Dashboard/Components/Navbar";
import Footer from "../Dashboard/Components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white flex flex-col text-black">
      <Navbar />
      <h2 className="mt-10 mb-10 font-bold text-4xl text-center">Kontak Kami</h2>
      <div className="flex flex-col md:flex-row justify-center items-start gap-10 px-10">
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src="/asset/kontak.png"
            alt="kontak"
            className="rounded-xl h-[300px] object-cover"
          />
        </div>

        <form className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              NAMA
            </label>
            <input
              type="text"
              placeholder="Nama Anda..."
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              ALAMAT EMAIL
            </label>
            <input
              type="email"
              placeholder="Alamat Email Anda..."
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              SUBJEK
            </label>
            <input
              type="text"
              placeholder="Subjek..."
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              PERTANYAAN
            </label>
            <input
              type="text"
              placeholder="Pertanyaan..."
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              PESAN
            </label>
            <textarea
              placeholder="Tulis Pesan Anda..."
              required
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="md:col-span-2 flex ">
            <button
              type="submit"
              className="bg-blue-900 text-white px-10 py-2 rounded-md hover:bg-blue-700"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
