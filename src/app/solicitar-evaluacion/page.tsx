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
          <div className="evaluacion-intro">
            <h2>Así funciona tu solicitud</h2>
            <ol className="evaluacion-steps">
              <li>
                <span className="num">1</span>
                <strong>Llena el formulario</strong>
                Cuéntanos sobre ti, tu propiedad y tu consumo de energía. Si tienes a la mano tu factura de LUMA, te
                será más fácil.
              </li>
              <li>
                <span className="num">2</span>
                <strong>Te llamamos</strong>
                Alguien de Red Borincana se comunicará contigo por teléfono para aclarar la información y coordinar los
                próximos pasos. Escribe un número donde podamos llamarte.
              </li>
              <li>
                <span className="num">3</span>
                <strong>Te ayudamos con tu caso</strong>
                Te acompañamos durante el proceso de tu evaluación técnica independiente, y puedes hacernos todas tus
                preguntas.
              </li>
            </ol>
          </div>

          <div className="evaluacion-embed-card">
            <iframe
              src="https://dev.chackathon-1.mse.uwestudio.akcelita.com/anonymous/51/workflow/evaluacionsolar/new?step=submitReferralAnon&embed=1&lang=es"
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
