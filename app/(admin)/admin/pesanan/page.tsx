export default function PesananAdmin() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Pesanan Masuk</h2>
          <p className="text-gray-500 text-sm mt-1">Pantau pesanan dari pelanggan LKI Merch.</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
            <tr>
              <th className="px-6 py-4 font-semibold">Order ID</th>
              <th className="px-6 py-4 font-semibold">Pelanggan</th>
              <th className="px-6 py-4 font-semibold">Total Bayar</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-mono font-medium">#LKI-001</td>
              <td className="px-6 py-4 font-bold">Ardhio Fatra</td>
              <td className="px-6 py-4 font-medium">Rp 300.000</td>
              <td className="px-6 py-4"><span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">Menunggu</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}