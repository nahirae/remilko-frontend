export default function CreatorInvite() {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-2">Kelola Konten Kreator</h3>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="input email pengguna"
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
        />
        <button className="bg-[#839ED1] text-white px-4 py-2 rounded-md hover:bg-[#6b89c1]">
          Kirim Undangan
        </button>
      </div>
    </div>
  );
}
