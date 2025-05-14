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

const sumberKategori = [
  { url: "https://inet.detik.com/", source: "detikINET" },
  { url: "https://finance.detik.com/", source: "detikFinance" },
  { url: "https://health.detik.com/", source: "detikHealth" },
];

function formatTanggalIndonesia(iso: string): string {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "Tanggal tidak valid";
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  return `${date.getDate()} ${bulan[date.getMonth()]} ${date.getFullYear()}`;
}

export async function GET() {
  const hasil: Berita[] = [];

  try {
    for (const kategori of sumberKategori) {
      const res = await axios.get(kategori.url);
      const $ = cheerio.load(res.data);

      const links: string[] = [];

      $("article a").each((_, el) => {
        const href = $(el).attr("href");
        if (href && href.includes("detik.com") && !href.includes("#")) {
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
            $$("figure img").attr("src") ||
            $$("meta[property='og:image']").attr("content") ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png";

          const content = $$(".detail__body-text p").first().text().trim();

          const isoRaw = $$("meta[property='article:published_time']").attr("content");
          const isoDate = isoRaw && !isNaN(new Date(isoRaw).getTime())
            ? isoRaw
            : new Date().toISOString();

          const formattedTanggal = formatTanggalIndonesia(isoDate);

          const rawAuthor =
            $$('[class*="author"]').text().trim() ||
            $$("meta[name='author']").attr("content") ||
            "Unknown";

          const author = rawAuthor.replace(/-?\s*detik\w+/i, "").trim();

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
          console.error(`❌ Gagal scrap ${url}`);
        }
      }
    }

    return NextResponse.json(hasil);
  } catch (error) {
    console.error("❌ Gagal scraping:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}
