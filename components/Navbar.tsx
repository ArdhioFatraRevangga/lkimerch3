"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full bg-white text-black border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* Logo Kiri */}
        <Link href="/" className="flex items-center gap-2">
          <div className="leading-none flex flex-col justify-center">
            <span className="text-xl md:text-2xl font-black tracking-tighter" style={{ fontFamily: 'impact, sans-serif' }}>
              LEGACY
            </span>
          </div>
        </Link>

        {/* Menu Tengah (Desktop) */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className={`text-sm font-bold uppercase tracking-widest transition-colors ${isActive('/') ? 'text-black' : 'text-gray-400 hover:text-black'}`}>
            Home
          </Link>
          <Link href="/shop" className={`text-sm font-bold uppercase tracking-widest transition-colors ${isActive('/shop') ? 'text-black' : 'text-gray-400 hover:text-black'}`}>
            Shop
          </Link>
          <Link href="/about" className={`text-sm font-bold uppercase tracking-widest transition-colors ${isActive('/about') ? 'text-black' : 'text-gray-400 hover:text-black'}`}>
            About
          </Link>
          <Link href="/contact" className={`text-sm font-bold uppercase tracking-widest transition-colors ${isActive('/contact') ? 'text-black' : 'text-gray-400 hover:text-black'}`}>
            Contact
          </Link>
        </div>

        {/* Ikon Kanan */}
        <div className="flex items-center gap-4">
          <button aria-label="Search" className="hover:opacity-60 transition">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <button aria-label="Cart" className="hover:opacity-60 transition relative">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </button>
          
          {/* Tombol Hamburger Mobile */}
          <button 
            className="md:hidden ml-2 hover:opacity-60 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Menu (Mobile) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 py-4 px-6 flex flex-col gap-4 shadow-lg">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className={`text-sm font-bold uppercase tracking-widest ${isActive('/') ? 'text-black' : 'text-gray-500'}`}>Home</Link>
          <Link href="/shop" onClick={() => setIsMenuOpen(false)} className={`text-sm font-bold uppercase tracking-widest ${isActive('/shop') ? 'text-black' : 'text-gray-500'}`}>Shop</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className={`text-sm font-bold uppercase tracking-widest ${isActive('/about') ? 'text-black' : 'text-gray-500'}`}>About</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className={`text-sm font-bold uppercase tracking-widest ${isActive('/contact') ? 'text-black' : 'text-gray-500'}`}>Contact</Link>
        </div>
      )}
    </nav>
  );
}