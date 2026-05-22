"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const resolveHref = (href: string) => {
    if (!href.startsWith("#")) return href;
    return pathname === "/" ? href : `/${href}`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-slate-900">
            GrowthForge Agency
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={resolveHref(item.href)}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href={resolveHref("#contact")}>
              <Button size="sm">Book a Free Strategy Call</Button>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="section-container py-4">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={resolveHref(item.href)}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-slate-700"
                >
                  {item.label}
                </Link>
              ))}
              <Link href={resolveHref("#contact")} onClick={() => setOpen(false)}>
                <Button className="mt-2 w-full">Book a Free Strategy Call</Button>
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
