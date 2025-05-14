import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function BeritaPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="relative min-h-screen bg-white font-poppins">
      {/* Background Gradient Atas */}
      <div className="absolute top-0 left-0 w-full h-[260px] bg-gradient-to-br from-[#ffa8a8] to-[#ffd6a5] rounded-b-[50px] z-0" />

      {/* Header */}
      <div className="px-10 pt-6 relative z-10 flex justify-between items-center">
        <div>
          <h1 className="text-white text-3xl font-extrabold">cleaNews</h1>
          <p className="text-white text-xs italic mt-[-6px]">created by Salman</p>
        </div>
        <LogoutButton />
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 mt-10 mx-auto max-w-5xl w-11/12 bg-[#f9f9fb] rounded-[25px] p-10 shadow-[0_15px_30px_rgba(0,0,0,0.1)]">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          Halo, {session?.user?.name} 👋
        </h2>
        <p className="text-gray-700 mb-6">
          Selamat datang di cleaNews! Pilih kategori berita di bawah untuk mulai membaca.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          {["detik", "kompas", "liputan6"].map((portal) => (
            <a
              key={portal}
              href={`/berita/${portal}`}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition w-full text-center font-semibold text-gray-700 hover:text-purple-700"
            >
              {portal.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
