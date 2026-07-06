import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar role="ADMIN" />
      <div style={{ flex: 1, marginLeft: '250px' }}>
        <Header user={session.user} />
        <main className="main-content" style={{ marginLeft: 0 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
