import Navbar from "../../components/Navbar";// Pastikan path ini mengarah ke file Navbar kamu

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. NAVBAR GLOBAL */}
      <Navbar />
      
      {/* 2. KONTEN UTAMA HALAMAN (Home, About, dll akan masuk ke sini) */}
      <main className="flex-grow">
        {children}
      </main>

      {/* 3. FOOTER RAKSASA LKI */}
      <footer className="px-6 md:px-8 pt-16 pb-8 md:pb-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-8 bg-white text-black border-t border-gray-100">
        <div>
          <div className="inline-block text-center leading-none">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter" style={{ fontFamily: 'impact, sans-serif' }}>
              LEGACY
            </h1>
            <p className="text-xs md:text-sm font-bold tracking-widest uppercase border-t-2 border-black pt-1 mt-1">
              Keeps Inspiring
            </p>
          </div>
        </div>
        
        <div className="text-center md:text-right flex flex-col items-center md:items-end">
          <h3 className="text-2xl md:text-3xl font-black tracking-wide mb-1 md:mb-2">LKI Merchandise</h3>
          <p className="text-sm md:text-md text-gray-600 lowercase mb-4">find us</p>
          <div className="flex items-center gap-3 md:gap-4 text-sm font-medium">
            <a href="https://www.instagram.com/lkimerch" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition"><img src="/assets/ig-hitam.png" alt="Instagram" className="w-5 h-5 object-contain" /></a>
            <a href="https://wa.me/628133300078" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition"><img src="/assets/wa-hitam.png" alt="WhatsApp" className="w-5 h-5 object-contain" /></a>
            <a href="https://shopee.co.id" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition"><img src="/assets/shoope.png" alt="Shopee" className="w-5 h-5 object-contain" /></a>
            <a href="https://www.tiktok.com/@lki.merch" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition"><img src="/assets/tiktok.png" alt="TikTok" className="w-5 h-5 object-contain" /></a>
          </div>
        </div>
      </footer>

      {/* 4. KOTAK HITAM BAWAH */}
      <div className="bg-black text-white text-center py-4 flex flex-col items-center gap-1">
        <p className="text-xs md:text-sm tracking-widest text-gray-400">
          © 2026 LKI Merchandise
        </p>
        <p className="text-[10px] md:text-xs text-gray-500 tracking-wider">
          made with love by FTR
        </p>
      </div>
      
    </div>
  );
}