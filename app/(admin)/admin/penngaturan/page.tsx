export default function PengaturanAdmin() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Pengaturan Toko</h2>
        <p className="text-gray-500 text-sm mt-1">Atur tautan sosial media dan WhatsApp.</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nomor WhatsApp</label>
            <input type="text" defaultValue="8133300078" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Link Instagram</label>
            <input type="text" defaultValue="https://instagram.com/lkimerch" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none transition" />
          </div>
        </div>
        <button className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white rounded-md font-bold text-sm transition">Simpan Perubahan</button>
      </div>
    </div>
  );
}