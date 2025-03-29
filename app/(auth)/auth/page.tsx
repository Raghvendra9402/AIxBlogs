"use client";
import Login from "@/components/shared/Login";
import Signup from "@/components/shared/Signup";
import { useAuthModalStore } from "@/lib/authModalState";

export default function Authentication() {
  const { isOpen, type } = useAuthModalStore();
  if (!isOpen) return null;

  return (
    <div className="h-screen flex items-center justify-center">
      {type === "login" ? <Login /> : <Signup />}
    </div>
  );
}
