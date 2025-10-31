"use client";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/auth";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => { logout(); router.push("/"); }}
      className="px-3 py-2 rounded bg-black text-white hover:bg-cfn-red"
    >
      Logout
    </button>
  );
}
