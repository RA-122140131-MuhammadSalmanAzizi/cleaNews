import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import KompasClient from "./KompasClient";

export default async function KompasPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return <KompasClient />;
}
