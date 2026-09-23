import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserDashboard } from "@/components/dashboard/user-dashboard";
import { verifySessionToken } from "@/lib/auth/session";

export default async function UserDashboardPage() {
  const token = (await cookies()).get("cos_session")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    await verifySessionToken(token);
  } catch {
    redirect("/login");
  }

  return <UserDashboard />;
}
