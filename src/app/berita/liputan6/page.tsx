import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Liputan6Client from "./Liputan6Client";

export default async function Liputan6Page() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return <Liputan6Client />;
}
