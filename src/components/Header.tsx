"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/#porque-existe", label: "Por qué existimos" },
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#comprar", label: "Antes de comprar" },
  { href: "/#audiencias", label: "Para quién es" },
  { href: "/instaladores", label: "Instaladores" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#intake", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="utility-bar">
        <div className="wrap">
          <div className="util-left">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" style={{ verticalAlign: "-2px", marginRight: 5 }}>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 6.5 8 6 8-6" />
              </svg>
              redborincana@fundacionborincana.org
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" style={{ verticalAlign: "-2px", marginRight: 5 }}>
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
              </svg>
              Una iniciativa de Fundación Borincana
            </span>
          </div>
          <div className="util-right">
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.94-1.79-2.94-1.8 0-2.07 1.4-2.07 2.85V21h-4V9Z" /></svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M13.5 21v-7.5H16l.5-3.5h-3V7.8c0-1 .3-1.7 1.7-1.7H16.6V3.1C16.3 3 15.3 3 14.2 3c-2.4 0-4 1.5-4 4.2v2.8H7.5V13.5H10.2V21h3.3Z" /></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="nav">
        <Link href="/" className="brand">
          <Image
            src="/images/logo-red-borincana-full.png"
            alt="Red Borincana"
            width={994}
            height={605}
            className="brand-logo"
            priority
          />
        </Link>
        <nav className="links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <a href="/#intake" className="cta-btn">
            Solicitar información
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            )}
          </button>
        </div>
      </div>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="/#intake" className="cta-btn" onClick={() => setOpen(false)}>
          Solicitar información
        </a>
      </div>
    </header>
  );
}
