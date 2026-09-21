import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Solicitar evaluación técnica — Red Borincana",
  description:
    "Solicita una evaluación técnica independiente de tu propuesta solar antes de comprometerte con la compra.",
};

export default function SolicitarEvaluacion() {
  return (
    <>
      <Header />

      <div className="page-hero">
        <div className="kicker">Solicitud formal</div>
        <h1>Solicita tu evaluación técnica independiente</h1>
        <p>
          Este es el siguiente paso si ya tienes una propuesta solar y quieres una revisión técnica independiente
          antes de comprometerte. El servicio tiene un costo de $450, que puede integrarse a tu financiamiento — no
          se paga por adelantado.
        </p>
      </div>

      <section className="evaluacion-embed">
        <div className="wrap">
          <div className="evaluacion-embed-card">
            <iframe
              src="https://red-borincana.mse.uwestudio.akcelita.com/anonymous/1/workflow/solar-technical-evaluation/new?step=step_1&embed=1"
              style={{ width: "100%", minHeight: 800, border: 0 }}
              title="Formulario de solicitud de evaluación técnica"
            />
          </div>
        </div>
      </section>

      <Footer
        ctaHeading="¿Tienes preguntas antes de enviar tu solicitud?"
        ctaSubtext="Escríbenos directamente y te orientamos."
        ctaHref="mailto:redborincana@fundacionborincana.org"
        ctaLabel="Escribir a Red Borincana →"
      />
    </>
  );
}
