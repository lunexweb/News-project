import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    { name: "Instagram", href: "#" },
    { name: "TikTok", href: "#" },
    { name: "X", href: "#" },
    { name: "YouTube", href: "#" },
  ];

  return (
    <footer className="bg-cfn-dark text-cfn-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="border-t border-cfn-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-sm font-semibold hover:text-cfn-red transition-colors uppercase"
              >
                {social.name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-6 text-sm text-cfn-white/70">
            © 2024 CFN - Current Football News. All rights reserved.
            <span className="mx-2">•</span>
            <a
              href="https://www.lunexweb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-cfn-red"
            >
              Built by Lunexweb
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

