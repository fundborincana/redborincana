import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Membresía recibida — Red Borincana",
};

export default function Gracias() {
  return (
    <>
      <Header />

      <div className="page-hero">
        <div className="kicker">Membresía</div>
        <h1>Gracias, recibimos tu pago</h1>
        <p>
          PayPal te enviará un recibo por correo. El equipo de Red Borincana confirmará tu membresía y se comunicará
          contigo con los próximos pasos.
        </p>
      </div>

      <Footer
        ctaHeading="¿Alguna pregunta?"
        ctaSubtext="Escríbenos y te ayudamos."
        ctaHref="mailto:redborincana@fundacionborincana.org"
        ctaLabel="Escribir a Red Borincana →"
      />
    </>
  );
}
