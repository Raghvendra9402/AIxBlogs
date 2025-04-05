import MobileSidebar from "./mobile-sidebar";
import { NavbarRoutes } from "./navbar-router";

export default function Navbar() {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm sticky top-0">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
}
