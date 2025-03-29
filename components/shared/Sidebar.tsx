import { Compass, FileText, LayoutDashboard, PenLine } from "lucide-react";
import { SidebarRoutes } from "./sidebar-routes";

export default function Sidebar() {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div>
        <h1 className="text-2xl font-mono font-semibold px-12 pt-5">
          AI-Blogs
        </h1>
      </div>
      <div className="h-full flex flex-col justify-center gap-y-6">
        <SidebarRoutes
          icon={<LayoutDashboard className="size-4" />}
          label="Dashboard"
          href="/dashboard"
        />
        <SidebarRoutes
          icon={<Compass className="size-5" />}
          label="Explore"
          href="/explore"
        />
        <SidebarRoutes
          icon={<PenLine className="size-5" />}
          label="Write"
          href="/write"
        />
        <SidebarRoutes
          icon={<FileText className="size-5" />}
          label="Your Blogs"
          href="/blogs"
        />
      </div>
    </div>
  );
}
