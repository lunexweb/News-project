"use client";
import Link from "next/link";
import { useState } from "react";
import CFNLogo from "./CFNLogo";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-cfn-white border-b-2 border-cfn-black shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={()=>setOpen(false)}>
            <CFNLogo />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/news" className="text-cfn-black hover:text-cfn-red font-semibold transition-colors">NEWS</Link>
            <Link href="/stats" className="text-cfn-black hover:text-cfn-red font-semibold transition-colors">STATS</Link>
            <Link href="/highlights" className="text-cfn-black hover:text-cfn-red font-semibold transition-colors">HIGHLIGHTS</Link>
            <Link href="/about" className="text-cfn-black hover:text-cfn-red font-semibold transition-colors">ABOUT</Link>
            <Link href="/contact" className="text-cfn-black hover:text-cfn-red font-semibold transition-colors">CONTACT</Link>
            <Link href="/login" className="bg-cfn-red text-cfn-white px-4 py-2 rounded hover:bg-opacity-90 font-semibold transition-colors">LOGIN</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-cfn-black" aria-label="Open menu" aria-expanded={open} onClick={()=>setOpen(!open)}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-black/10 bg-white">
          <div className="container mx-auto px-4 py-3 grid gap-2">
            <Link href="/news" className="py-2 font-semibold" onClick={()=>setOpen(false)}>NEWS</Link>
            <Link href="/stats" className="py-2 font-semibold" onClick={()=>setOpen(false)}>STATS</Link>
            <Link href="/highlights" className="py-2 font-semibold" onClick={()=>setOpen(false)}>HIGHLIGHTS</Link>
            <Link href="/about" className="py-2 font-semibold" onClick={()=>setOpen(false)}>ABOUT</Link>
            <Link href="/contact" className="py-2 font-semibold" onClick={()=>setOpen(false)}>CONTACT</Link>
            <Link href="/login" className="mt-2 bg-cfn-red text-white text-center px-4 py-2 rounded font-semibold" onClick={()=>setOpen(false)}>LOGIN</Link>
          </div>
        </div>
      )}
    </header>
  );
}

