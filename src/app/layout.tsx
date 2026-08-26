import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Red Borincana — Financiamiento solar con respaldo técnico independiente",
  description:
    "Una red de recursos para ayudarte a tomar decisiones informadas sobre energía solar en Puerto Rico, con respaldo de una revisión técnica independiente. Una iniciativa de Fundación Borincana.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
