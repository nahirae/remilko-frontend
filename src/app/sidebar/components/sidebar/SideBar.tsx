"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", href: "/sidebar/dashboard" },
  { label: "Kelola Konten Kreator", href: "/sidebar/creator" },
  { label: "Tinjau Recook", href: "/sidebar/tinjau-recook" },
  { label: "Rekomendasi", href: "/sidebar/rekomendasi" },
  { label: "Profil", href: "/profil" },
  { label: "Kontak Kami", href: "/kontak-kami" },
  { label: "About Us", href: "/tentang-kami" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[#FAF9F2] p-6 shadow-lg sticky top-0 self-start">
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "px-4 py-2 rounded hover:bg-orange-200 transition-colors font-medium",
              pathname === item.href && "bg-orange-300"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
