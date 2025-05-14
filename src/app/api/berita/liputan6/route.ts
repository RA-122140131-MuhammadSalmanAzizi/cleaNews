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

function formatTanggalIndonesia(raw: string): string {
  const parts = raw.match(/\d{1,2} \w+ \d{4}/);
  return parts ? parts[0] : "Tanggal tidak tersedia";
}

const sumberKategori = [
  { url: "https://www.liputan6.com/tekno", source: "liputan6Tekno" },
  { url: "https://www.liputan6.com/global", source: "liputan6Global" },
  { url: "https://www.liputan6.com/bola", source: "liputan6Bola" },
];

export async function GET() {
  const hasil: Berita[] = [];

  try {
    for (const kategori of sumberKategori) {
      const res = await axios.get(kategori.url);
      const $ = cheerio.load(res.data);

      const links: string[] = [];

      $("article a").each((_, el) => {
        const href = $(el).attr("href");
        if (href && href.startsWith("https://www.liputan6.com/") && !href.includes("#")) {
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

          const content =
            $$(".article-content-body__item-page p").first().text().trim() ||
            "Konten tidak tersedia.";

          const rawDate = $$(".read-page-box__author__datetime").text().trim();
          const formattedTanggal = formatTanggalIndonesia(rawDate);

          const author = $$(".read-page-box__author__name").text().trim() || "Liputan6.com";

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
    console.error("❌ Gagal scraping Liputan6:", error);
    return NextResponse.json({ error: "Scraping gagal" }, { status: 500 });
  }
}
