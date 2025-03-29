"use client";
import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button onClick={() => signOut()} className="outline-none cursor-pointer">
      Log out
    </button>
  );
}
