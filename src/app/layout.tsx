import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Red Borincana — Tu Ruta Solar",
  description:
    "Una red de recursos para ayudarte a tomar decisiones informadas sobre energía solar en Puerto Rico, con respaldo de una revisión técnica independiente. Una iniciativa de Fundación Borincana.",
  // Verificación del dominio redborincana.org en Meta Business (WhatsApp Business).
  // Debe quedar en el <head> servido por el servidor; no moverla a un script.
  other: {
    "facebook-domain-verification": "33zl33ljg1z2bh9qenzg3lc0d8vuax",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={poppins.variable}>
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
