import Sidebar from "./components/sidebar/SideBar";
import Footer from "@/components/Footer";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten utama + Footer */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
