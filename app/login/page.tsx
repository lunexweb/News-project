"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DEMO_EMAIL, DEMO_PASSWORD, loginDemo } from "@/utils/auth";

export default function LoginPage() {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = loginDemo(email, password);
    if (!ok) {
      setError("Invalid demo credentials");
      return;
    }
    router.push("/admin");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Demo Login</h1>
      <form onSubmit={onSubmit} className="max-w-md bg-white p-6 rounded-xl border border-black/10 shadow-sm space-y-3">
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cfn-red/50"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cfn-red/50"
          />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button type="submit" className="px-4 py-2 rounded bg-cfn-red text-white font-semibold w-full">Login</button>
        <p className="text-xs text-gray-600">Use demo credentials: {DEMO_EMAIL} / {DEMO_PASSWORD}</p>
      </form>
    </div>
  );
}

