import Image from "next/image";
import Link from "next/link";
import React from "react";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Community", href: "/Community" },
  { label: "FAQ", href: "/FAQ" },
  { label: "Support", href: "/Support" },
];

const Footer = () => {
  return (
    <footer className="bg-[var(--paper-raised)] text-[var(--ink)] border-t border-[var(--line)] mt-10">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col items-center gap-6">
        <div>
          <Image
            src="/Blogs4u.png"
            alt="Blog4U Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium font-sans">
          {FOOTER_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[var(--ink-soft)] hover:text-[var(--accent-teal)] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <hr className="w-full border-[var(--line)]" />

        <p className="text-sm text-[var(--ink-faint)] text-center font-sans">
          &copy; {new Date().getFullYear()}{" "}
          <Link href="/" className="hover:underline font-medium text-[var(--ink-soft)]">
            Blog4U&trade;
          </Link>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
