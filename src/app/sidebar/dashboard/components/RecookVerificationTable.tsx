"use client";
import Image from "next/image";

type VerifikasiData = {
  user: string;
  resep: string;
  tanggal: string;
  foto: string;
  status: "Verified" | "Pending";
};

export default function RecookVerification({ data }: { data: VerifikasiData[] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow mb-10">
      <h2 className="text-xl font-semibold mb-4">Verifikasi Recook</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-[#f8f8f8] p-3 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.foto}
                alt={item.resep}
                width={60}
                height={60}
                className="rounded-md object-cover"
              />
              <div>
                <p className="font-semibold">{item.resep}</p>
                <p className="text-sm text-gray-500">
                  {item.user} • {item.tanggal}
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-white text-xs ${
                item.status === "Verified" ? "bg-green-500" : "bg-yellow-400"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
