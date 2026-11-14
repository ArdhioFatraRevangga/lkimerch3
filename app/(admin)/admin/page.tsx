export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Dashboard LKI</h1>
      <p className="text-gray-500 text-sm mb-8">Ringkasan aktivitas toko dan performa penjualan.</p>

      {/* Grid Statistik Singkat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Total Produk</p>
          <h3 className="text-3xl font-black">24 <span className="text-sm font-medium text-gray-400 normal-case">Item</span></h3>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Pesanan Baru</p>
          <h3 className="text-3xl font-black">12 <span className="text-sm font-medium text-gray-400 normal-case">Menunggu</span></h3>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Pendapatan (Bulan Ini)</p>
          <h3 className="text-3xl font-black text-green-600">Rp 15.4<span className="text-lg">jt</span></h3>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
           <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
        </div>
        <h3 className="font-bold text-lg mb-1">Selamat datang di Panel Admin</h3>
        <p className="text-gray-500 text-sm max-w-md">
          Pilih menu di sebelah kiri untuk mulai mengelola katalog produk atau melihat pesanan yang masuk.
        </p>
      </div>
    </div>
  );
}