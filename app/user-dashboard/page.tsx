import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { UserDashboard } from "@/components/dashboard/user-dashboard";
import { verifySessionToken } from "@/lib/auth/session";

export default async function UserDashboardPage() {
  const token = (await cookies()).get("cos_session")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const session = await verifySessionToken(token);
    const application = await prisma.registrationApplication.findFirst({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
      select: { applicationRef: true, status: true, paymentStatus: true },
    });

    return <UserDashboard application={application} />;
  } catch {
    redirect("/login");
  }
}
