import Link from "next/link";
import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma";

export default async function KatalogAdmin() {
  // Mengambil semua data produk dari MySQL (diurutkan dari yang paling baru)
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Server Action untuk menghapus produk
  async function deleteProduct(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/katalog");
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Katalog Produk</h2>
          <p className="text-gray-500 text-sm mt-1">
            Kelola barang, harga, dan gambar katalog LKI Merch ({products.length} produk).
          </p>
        </div>
        <Link
          href="/admin/katalog/tambah"
          className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-md font-medium text-sm transition shadow-sm flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Upload Produk Baru
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Produk</th>
                <th className="px-6 py-4 font-semibold">Kategori</th>
                <th className="px-6 py-4 font-semibold">Harga</th>
                <th className="px-6 py-4 font-semibold">Stok</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    Belum ada produk di database. Silakan upload produk pertama!
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">{product.name}</span>
                        {product.description && (
                          <span className="text-xs text-gray-500 line-clamp-1 max-w-xs">
                            {product.description}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium uppercase">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Rp {product.price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-green-600 font-medium">
                      {product.stock > 0 ? `Tersedia (${product.stock})` : "Habis"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <form action={deleteProduct} className="inline">
                        <input type="hidden" name="id" value={product.id} />
                        <button
                          type="submit"
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Hapus
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}