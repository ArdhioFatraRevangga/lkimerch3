"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Jika sedang di halaman login, jangan tampilkan Sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Kiri */}
      <aside className="w-64 bg-black text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-black tracking-widest uppercase" style={{ fontFamily: 'impact, sans-serif' }}>
            LEGACY
          </h1>
          <p className="text-xs text-gray-400 tracking-widest mt-1">ADMIN PANEL</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className={`block px-4 py-3 rounded-md transition text-sm ${pathname === '/admin' ? 'bg-white/10 border-l-4 border-white font-bold' : 'hover:bg-white/10 font-medium'}`}>
            Dashboard
          </Link>
          <Link href="/admin/katalog" className={`block px-4 py-3 rounded-md transition text-sm ${pathname?.includes('/katalog') ? 'bg-white/10 border-l-4 border-white font-bold' : 'hover:bg-white/10 font-medium'}`}>
            Katalog Produk
          </Link>
          <Link href="/admin/pesanan" className={`block px-4 py-3 rounded-md transition text-sm ${pathname?.includes('/pesanan') ? 'bg-white/10 border-l-4 border-white font-bold' : 'hover:bg-white/10 font-medium'}`}>
            Pesanan Masuk
          </Link>
          <Link href="/admin/pengaturan" className={`block px-4 py-3 rounded-md transition text-sm ${pathname?.includes('/pengaturan') ? 'bg-white/10 border-l-4 border-white font-bold' : 'hover:bg-white/10 font-medium'}`}>
            Pengaturan
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-bold transition">
            Logout
          </button>
        </div>
      </aside>

      {/* Konten Utama Kanan */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar Mobile */}
        <header className="bg-white border-b border-gray-200 p-4 md:hidden flex justify-between items-center">
          <h1 className="text-xl font-black uppercase tracking-widest" style={{ fontFamily: 'impact, sans-serif' }}>LEGACY</h1>
          <button className="p-2 bg-black text-white rounded-md text-xs font-bold">Menu</button>
        </header>

        {/* Area Konten Dinamis */}
        <div className="flex-1 overflow-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}