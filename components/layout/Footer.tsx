import Link from "next/link";

const footerLinks = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Work", href: "/work" }
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="section-container py-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-lg font-semibold text-slate-900">GrowthForge Agency</p>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Practical digital execution across marketing, websites, automation, and
              security-conscious systems.
            </p>
          </div>
          <nav className="flex flex-wrap gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} GrowthForge Agency. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
