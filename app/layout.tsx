import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsTicker from "@/components/NewsTicker";

export const metadata: Metadata = {
  title: {
    default: "CFN - Current Football News",
    template: "%s | CFN",
  },
  description: "Stay updated with the latest football news, stats, and highlights from around the world",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cfn.local"),
  openGraph: {
    title: "CFN - Current Football News",
    description: "Fast, accurate football news, stats, and highlights.",
    siteName: "CFN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CFN - Current Football News",
    description: "Fast, accurate football news, stats, and highlights.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <NewsTicker />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

