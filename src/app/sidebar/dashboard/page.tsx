import StatsCard from "./components/StatsCard";
import CreatorInvite from "./components/CreatorInvite";
import RecipeCard from "./components/RecipeCard";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const stats = [
    { label: "Total Resep", value: 365 },
    { label: "Jumlah Recook", value: 127 },
  ];

  const verifikasiData = [
    {
      user: "Nadila",
      resep: "Nasi Goreng Acar",
      tanggal: "11 April 2023",
      foto: "/img/Nasi Goreng.jpeg",
      status: "Verified",
    },
    {
      user: "Meivika",
      resep: "Beef Teriyaki",
      tanggal: "23 April 2023",
      foto: "/img/Beef Teriyaki.jpeg",
      status: "Verified",
    },
    {
      user: "Rahmawati",
      resep: "Kebab",
      tanggal: "25 April 2023",
      foto: "/img/Kebab.jpeg",
      status: "Pending",
    },
    {
      user: "Meinadzz",
      resep: "Sandwich",
      tanggal: "29 Mei 2023",
      foto: "/img/Sandwich Barbeque.jpeg",
      status: "Verified",
    },
  ];

  const rekomendasi = [
    { title: "Salad Sayur", image: "/img/Salad Buah.jpeg" },
    { title: "Salad Buah", image: "/img/Salad Sayur.jpeg" },
  ];

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6 bg-gray-50">

        <h1 className="text-2xl font-bold mb-8">Welcome, Admin!</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {stats.map((item, index) => (
            <StatsCard key={index} label={item.label} value={item.value} />
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">Verifikasi Recook</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-gray-600">User</th>
                  <th className="py-3 px-4 text-gray-600">Resep</th>
                  <th className="py-3 px-4 text-gray-600">Tanggal</th>
                  <th className="py-3 px-4 text-gray-600">Foto</th>
                  <th className="py-3 px-4 text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {verifikasiData.map((data, index) => (
                  <tr
                    key={index}
                    className="transition-all duration-200 hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-3 px-4">{data.user}</td>
                    <td className="py-3 px-4">{data.resep}</td>
                    <td className="py-3 px-4">{data.tanggal}</td>
                    <td className="py-3 px-4">
                      <Image
                        src={data.foto}
                        alt={data.resep}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-4 py-2 rounded-full text-white text-xs font-semibold transition-all duration-200 ${
                          data.status === "Verified"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-yellow-400 hover:bg-yellow-500"
                        } cursor-pointer`}
                      >
                        {data.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <CreatorInvite />

        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">Rekomendasi Resep</h3>
          <div className="flex flex-wrap gap-6">
            {rekomendasi.map((item, index) => (
              <RecipeCard key={index} title={item.title} image={item.image} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
