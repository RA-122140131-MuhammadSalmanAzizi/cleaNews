import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

type Berita = {
  title: string;
  url: string;
  image: string;
  source: string;
  author: string;
  publishedAt: string;
  content: string;
};

function formatTanggalIndonesia(iso: string): string {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "Tanggal tidak valid";
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  return `${date.getDate()} ${bulan[date.getMonth()]} ${date.getFullYear()}`;
}

const sumberKategori = [
  { url: "https://tekno.kompas.com/", source: "kompasTekno" },
  { url: "https://otomotif.kompas.com/", source: "kompasOtomotif" },
  { url: "https://bola.kompas.com/", source: "kompasBola" },
];

export async function GET() {
  const hasil: Berita[] = [];

  try {
    for (const kategori of sumberKategori) {
      const res = await axios.get(kategori.url);
      const $ = cheerio.load(res.data);

      const links: string[] = [];

      $("a.article__link").each((_, el) => {
        const href = $(el).attr("href");
        if (href && href.startsWith("https://")) {
          links.push(href);
        }
      });

      const uniqueLinks = [...new Set(links)].slice(0, 2);

      for (const url of uniqueLinks) {
        try {
          const detail = await axios.get(url);
          const $$ = cheerio.load(detail.data);

          const title = $$("h1").text().trim();
          const image =
            $$("meta[property='og:image']").attr("content") ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png";

          const content = $$("div.read__content p").first().text().trim();
          const publishedISO = $$("meta[property='article:published_time']").attr("content");
          const formattedTanggal = formatTanggalIndonesia(publishedISO || "");

          // ✅ Final logic untuk ambil nama penulis
          let author = "";

          const creditEditor = $$(".credit-title-nameEditor").text().trim();
          if (creditEditor) {
            author = creditEditor;
          } else {
            const authorProfile = $$(".author__profile .author__name").text().trim();
            if (authorProfile) {
              author = authorProfile;
            } else {
              const authorOld = $$(".read__author__text a").text().trim();
              if (authorOld) {
                author = authorOld;
              }
            }
          }

          hasil.push({
            title,
            url,
            image,
            source: kategori.source,
            author,
            publishedAt: formattedTanggal,
            content,
          });
        } catch (err) {
          console.error("❌ Gagal ambil detail:", url);
        }
      }
    }

    return NextResponse.json(hasil);
  } catch (error) {
    console.error("❌ Gagal scraping Kompas:", error);
    return NextResponse.json({ error: "Scraping gagal" }, { status: 500 });
  }
}
