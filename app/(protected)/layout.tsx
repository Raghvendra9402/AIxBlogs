import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/Sidebar";
import React from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div>
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <div className="h-full md:pl-56">{children}</div>
    </div>
  );
}
