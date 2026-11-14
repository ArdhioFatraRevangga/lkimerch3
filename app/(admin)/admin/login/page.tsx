"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginAdmin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Username dan Password khusus admin LKI
    if (username === "admin" && password === "lki123") {
      document.cookie = "admin_token=rahasia-lki; path=/"; // Beri tiket masuk
      router.push("/admin"); // Arahkan ke dashboard
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-black p-8 text-center">
          <h1 className="text-4xl text-white font-black tracking-widest uppercase mb-1" style={{ fontFamily: 'impact, sans-serif' }}>
            LEGACY
          </h1>
          <p className="text-gray-400 text-xs tracking-widest uppercase">Admin Portal</p>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Masuk ke Dashboard</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-md border border-red-100 text-center">
              Username atau Password salah!
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan username" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none transition" required />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-black focus:border-black outline-none transition" required />
            </div>

            <button type="submit" className="w-full py-3 bg-black hover:bg-gray-800 text-white rounded-md font-bold text-sm transition shadow-md mt-2">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}