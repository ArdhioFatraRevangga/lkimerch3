import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
// Pastikan path import prisma ini sesuai dengan letak file prisma.ts kamu
import { prisma } from "@/app/lib/prisma";

export default function TambahKatalog() {
  
  // Ini adalah fungsi ajaib (Server Action) yang akan berjalan di belakang layar
  // untuk menyimpan foto ke folder public/uploads dan menyimpan teks ke MySQL
  async function saveProduct(formData: FormData) {
    "use server";
    
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = Number(formData.get("price"));
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;

    let imageUrl = "";

    // 1. Proses upload gambar ke folder lokal
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Bersihkan nama file dari spasi agar rapi
      const cleanFileName = image.name.replace(/\s+/g, '-');
      const fileName = `${Date.now()}-${cleanFileName}`;
      const filepath = path.join(process.cwd(), "public/uploads", fileName);
      
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${fileName}`; // Path yang akan disimpan ke database
    }

    // 2. Simpan semua data ke MySQL
    await prisma.product.create({
      data: {
        name,
        category,
        price,
        stock: 1, // Default stok 1
        description,
        imageUrl,
      },
    });

    // 3. Kembalikan ke halaman daftar katalog setelah sukses
    redirect("/admin/katalog");
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/katalog" className="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-md transition shadow-sm">
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Tambah Produk Baru</h2>
          <p className="text-gray-500 text-sm mt-1">Masukkan detail produk untuk ditambahkan ke dalam katalog toko.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* FORM DIMULAI DI SINI (memanggil fungsi saveProduct saat disubmit) */}
        <form action={saveProduct}>
          <div className="p-6 md:p-8 space-y-6">
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nama Produk <span className="text-red-500">*</span></label>
              <input type="text" name="name" placeholder="Misal: T-Shirt Bunny Grey" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none transition" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Kategori <span className="text-red-500">*</span></label>
                <select name="category" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none transition bg-white" required>
                  <option value="">Pilih Kategori</option>
                  <option value="tshirt">T-Shirt</option>
                  <option value="jersey">Jersey</option>
                  <option value="band">T-Shirt Band</option>
                  <option value="jacket">Jacket</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Harga (Rp) <span className="text-red-500">*</span></label>
                <input type="number" name="price" placeholder="150000" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none transition" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Produk</label>
              <textarea name="description" rows={4} placeholder="Jelaskan detail bahan, ukuran, dan keunggulan produk..." className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none transition"></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Foto Produk Utama <span className="text-red-500">*</span></label>
              {/* Input tipe file betulan */}
              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                className="w-full px-4 py-3 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 transition" 
                required 
              />
              <p className="text-xs text-gray-500 mt-2">Format PNG, JPG, JPEG maksimal 2MB.</p>
            </div>

          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
            <Link href="/admin/katalog" className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md font-bold text-sm transition shadow-sm">Batal</Link>
            {/* Tombol Submit */}
            <button type="submit" className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white rounded-md font-bold text-sm transition shadow-sm">
              Simpan & Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}