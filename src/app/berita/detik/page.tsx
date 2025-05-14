import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DetikClient from "./DetikClient";

export default async function DetikPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return <DetikClient />;
}
