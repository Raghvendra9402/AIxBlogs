import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import Sidebar from "./Sidebar";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-6 hover:opacity-75 transition">
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetTitle className="sr-only">Toggle</SheetTitle>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
