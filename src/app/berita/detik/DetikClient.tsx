"use client";

import { useEffect, useState } from "react";

type Berita = {
  title: string;
  url: string;
  image: string;
  source: string;
  author: string;
  publishedAt: string;
  content: string;
};

export default function DetikClient() {
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/berita/detik")
      .then((res) => res.json())
      .then((data) => {
        setBerita(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* Background hijau */}
      <div className="absolute top-0 left-0 w-full h-[260px] bg-gradient-to-br from-green-200 to-green-400 rounded-b-[50px] z-0" />

      {/* Header */}
      <div className="px-10 pt-6 relative z-10 flex justify-between items-center">
        <div>
          <h1 className="text-white text-3xl font-extrabold">cleaNews</h1>
          <p className="text-white text-xs italic mt-[-6px]">created by Salman</p>
        </div>
        <a
          href="/berita"
          className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-50 transition"
        >
          ⬅ Kembali ke Beranda
        </a>
      </div>

      {/* Konten */}
      <div className="relative z-10 mt-10 px-8 pb-10">
        <div className="bg-[#f9f9fb] p-6 rounded-xl shadow-md mb-8 text-center">
          <h2 className="text-2xl font-bold text-green-700">Berita dari detik.com</h2>
          <p className="text-sm text-gray-600 mt-1">
            Menampilkan berita terbaru Detik dari kategori detikINET, detikFinance, dan detikHealth
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 flex flex-col items-center justify-center text-center text-gray-500 mt-32">
              <div className="w-8 h-8 mb-2 border-4 border-green-300 border-t-green-600 rounded-full animate-spin" />
              <p>Sabar boyy lagi memuat berita dari detik.com...</p>
            </div>
          ) : (
            berita.map((item, i) => (
              <div key={i} className="bg-[#f9f9fb] shadow p-6 rounded-xl">
                <img
                  src={
                    item.image ||
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
                  }
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-bold text-lg text-green-700 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-1">
                  {item.source} | {item.publishedAt} | {item.author}
                </p>
                <p className="text-sm text-gray-700 mb-2">{item.content}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline text-sm font-medium"
                >
                  Baca selengkapnya →
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
