import type { Metadata } from "next";

// Sección privada: fuera de buscadores. No se enlaza desde el menú y no hay sitemap.
// No agregar esta ruta a robots.txt: eso la haría pública.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function MembresiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
