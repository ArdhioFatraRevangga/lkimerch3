"use client";
import { useState, useRef } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string | null;
  imageUrl: string;
};

export default function ShopHomeClient({ products }: { products: Product[] }) {
  // Filter produk dari database berdasarkan kategori
  const tshirtProducts = products.filter((p) => p.category === "tshirt");
  const jerseyProducts = products.filter((p) => p.category === "jersey");
  const bandProducts = products.filter((p) => p.category === "band");
  const jacketProducts = products.filter((p) => p.category === "jacket");

  // Daftar gambar untuk slider banner utama
  const slides = [
    "/assets/wa1.jpeg",
    "/assets/wa5.jpeg",
    "/assets/wa4.jpeg",
    "/assets/wa2.jpeg",
    "/assets/wa3.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Fitur Video ---
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // --- Fitur Slider Banner ---
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // --- Fitur Slider Produk (Horizontal Scroll) ---
  const tshirtRef = useRef<HTMLDivElement>(null);
  const jerseyRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const jacketRef = useRef<HTMLDivElement>(null);

  const slideProduct = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Helper untuk merender kartu produk per kategori
  const renderProductCards = (items: Product[]) => {
    if (items.length === 0) {
      return (
        <p className="text-xs md:text-sm text-gray-400 py-6">
          Belum ada produk di kategori ini.
        </p>
      );
    }

    return items.map((product) => (
      <div
        key={product.id}
        className="snap-start shrink-0 flex flex-col group w-[170px] md:w-[250px]"
      >
        <div className="aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm mb-2 md:mb-3">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="text-center">
          <h4 className="font-bold text-[11px] md:text-xs uppercase tracking-wide leading-tight">
            {product.name}
          </h4>
          <p className="text-[10px] md:text-xs text-gray-700 mt-1">
            Rp. {product.price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* CSS Global untuk menghilangkan scrollbar bawaan di semua slider */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 1. Video Banner */}
      <div className="w-full h-[300px] md:h-[650px] mb-4 relative overflow-hidden bg-gray-900 group">
        <video
          ref={videoRef}
          src="/assets/LKI MERCH VERSI ANGEL.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        <button
          onClick={togglePlay}
          className="absolute bottom-4 right-6 md:bottom-6 md:right-10 bg-black/40 hover:bg-black/80 text-white p-2 md:p-3 rounded-full transition-all z-10 opacity-70 group-hover:opacity-100 shadow-lg backdrop-blur-sm"
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? (
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Announcement Section */}
      <div className="px-6 md:px-8 mb-8 md:mb-18 max-w-2xl text-center md:text-left mx-auto md:mx-0">
        <h2 className="text-2xl md:text-2xl font-black mb-3 md:mb-6 font-serif tracking-widest uppercase">
          Announcement !!
        </h2>
        <p className="text-lg md:text-xl font-bold font-serif leading-snug">
          Belanja langsung melalui website resmi <br className="hidden md:block" />
          LKI Merch jauh lebih hemat & murah dibanding di Online Shop lain!
          <br className="hidden md:block" />
        </p>
      </div>

      {/* 2. Banner Slider */}
      <div className="w-full h-[250px] md:h-[600px] mb-8 md:mb-12 relative group overflow-hidden bg-gray-100">
        <div
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Banner LKI ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition opacity-75 group-hover:opacity-100 z-10"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition opacity-75 group-hover:opacity-100 z-10"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {slides.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => setCurrentIndex(slideIndex)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                currentIndex === slideIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* --- KATEGORI: T-Shirt --- */}
      <div className="flex justify-between items-end px-4 md:px-8 mb-4">
        <h3 className="text-lg md:text-xl font-black uppercase tracking-wide border-b-[3px] border-black inline-block pb-1">
          T-Shirt
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => slideProduct(tshirtRef, "left")}
            className="w-8 h-8 md:w-10 md:h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition shadow"
            aria-label="Geser Kiri"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => slideProduct(tshirtRef, "right")}
            className="w-8 h-8 md:w-10 md:h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition shadow"
            aria-label="Geser Kanan"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={tshirtRef}
        className="flex gap-3 md:gap-5 px-4 md:px-8 mb-6 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar"
      >
        {renderProductCards(tshirtProducts)}
      </div>

      {/* --- Judul Preview Jersey --- */}
      <div className="px-4 md:px-8 mb-4">
        <h3 className="text-lg md:text-xl font-black uppercase tracking-wide border-b-[3px] border-black inline-block pb-1">
          Preview Jersey
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 px-4 md:px-8 mb-8 md:mb-12">
        <div className="bg-gray-200 aspect-[4/3] overflow-hidden rounded-sm">
          <img src="/assets/wa1.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="bg-gray-200 aspect-[4/3] overflow-hidden rounded-sm">
          <img src="/assets/wa2.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
      </div>

      {/* --- KATEGORI: Jersey --- */}
      <div className="flex justify-between items-end px-4 md:px-8 mb-4">
        <h3 className="text-lg md:text-xl font-black uppercase tracking-wide border-b-[3px] border-black inline-block pb-1">
          Jersey
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => slideProduct(jerseyRef, "left")}
            className="w-8 h-8 md:w-10 md:h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition shadow"
            aria-label="Geser Kiri"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => slideProduct(jerseyRef, "right")}
            className="w-8 h-8 md:w-10 md:h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition shadow"
            aria-label="Geser Kanan"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={jerseyRef}
        className="flex gap-3 md:gap-5 px-4 md:px-8 mb-6 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar"
      >
        {renderProductCards(jerseyProducts)}
      </div>

      {/* --- Judul Preview T-shirt (band) --- */}
      <div className="px-4 md:px-8 mb-4">
        <h3 className="text-lg md:text-xl font-black uppercase tracking-wide border-b-[3px] border-black inline-block pb-1">
          Preview T-Shirt Band
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 px-4 md:px-8 mb-8 md:mb-12">
        <div className="bg-gray-200 aspect-[4/3] overflow-hidden rounded-sm">
          <img src="/assets/wa4.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="bg-gray-200 aspect-[4/3] overflow-hidden rounded-sm">
          <img src="/assets/wa5.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
      </div>

      {/* --- KATEGORI: T-Shirt Band / Jersey --- */}
      <div className="flex justify-between items-end px-4 md:px-8 mb-4">
        <h3 className="text-lg md:text-xl font-black uppercase tracking-wide border-b-[3px] border-black inline-block pb-1">
          T-Shirt Band / Jersey
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => slideProduct(bandRef, "left")}
            className="w-8 h-8 md:w-10 md:h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition shadow"
            aria-label="Geser Kiri"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => slideProduct(bandRef, "right")}
            className="w-8 h-8 md:w-10 md:h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition shadow"
            aria-label="Geser Kanan"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={bandRef}
        className="flex gap-3 md:gap-5 px-4 md:px-8 mb-6 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar"
      >
        {renderProductCards(bandProducts)}
      </div>

      {/* --- Judul Preview jacket --- */}
      <div className="px-4 md:px-8 mb-4">
        <h3 className="text-lg md:text-xl font-black uppercase tracking-wide border-b-[3px] border-black inline-block pb-1">
          Preview Jacket
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 px-4 md:px-8 mb-8 md:mb-12">
        <div className="bg-gray-200 aspect-[4/3] overflow-hidden rounded-sm">
          <img src="/assets/wa1.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="bg-gray-200 aspect-[4/3] overflow-hidden rounded-sm">
          <img src="/assets/wa2.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
      </div>

      {/* --- KATEGORI: Jacket --- */}
      <div className="flex justify-between items-end px-4 md:px-8 mb-4">
        <h3 className="text-lg md:text-xl font-black uppercase tracking-wide border-b-[3px] border-black inline-block pb-1">
          Jacket
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => slideProduct(jacketRef, "left")}
            className="w-8 h-8 md:w-10 md:h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition shadow"
            aria-label="Geser Kiri"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => slideProduct(jacketRef, "right")}
            className="w-8 h-8 md:w-10 md:h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition shadow"
            aria-label="Geser Kanan"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={jacketRef}
        className="flex gap-3 md:gap-5 px-4 md:px-8 mb-6 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar"
      >
        {renderProductCards(jacketProducts)}
      </div>

      {/* --- INSTAGRAM FEED SECTION --- */}
      <div className="px-4 md:px-8 mb-4 flex items-center gap-2">
        <img src="/assets/ig-hitam.png" alt="Instagram" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
        <h3 className="text-xl md:text-3xl font-serif font-black tracking-wide">LKI Merch</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 px-4 md:px-8 mb-16 md:mb-24">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-200 aspect-square"></div>
        ))}
      </div>
    </div>
  );
}