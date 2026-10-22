import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_PATH, INCLUDES, INCLUDES_NOTE, PLANS, TRIAL_MONTHS } from "./plans";

export const metadata: Metadata = {
  title: "Membresía de instaladores — Red Borincana",
  description: "Escoge tu plan de membresía como instalador de Red Borincana.",
};

export default function Membresia() {
  return (
    <>
      <Header />

      <div className="page-hero">
        <div className="kicker">Instaladores de la red</div>
        <h1>Escoge tu plan de membresía</h1>
        <p>
          Este es el paso final para formar parte de Red Borincana, después de firmar tu contrato. Los dos planes
          empiezan con {TRIAL_MONTHS} meses sin cargo.
        </p>
      </div>

      <section className="aud-section">
        <div className="wrap">
          <div className="aud-grid aud-grid-2">
            {Object.values(PLANS).map((plan) => (
              <div className="aud-card" key={plan.slug}>
                <div className="tag">Primeros {TRIAL_MONTHS} meses sin cargo</div>
                <h3>{plan.name}</h3>
                <p className="plan-price">
                  <strong>{plan.amount}</strong> {plan.per}
                </p>
                <p>
                  Hoy no pagas nada. Tu primer cargo de {plan.amount} ocurre cuando terminen los {TRIAL_MONTHS} meses, y
                  se repite {plan.repeats} hasta que canceles.
                </p>
                <a href={`${BASE_PATH}/${plan.slug}`}>Escoger plan {plan.slug} →</a>
              </div>
            ))}
          </div>

          <p className="membresia-compare">
            El plan anual equivale a $37.50 al mes. Pagando por mes el total es de $540 al año, así que el plan anual
            te ahorra $90 por año.
          </p>
        </div>
      </section>

      <section className="membresia-info membresia-info-end">
        <div className="wrap membresia-info-inner">
          <h2>Cómo funciona</h2>
          <ol>
            <li>
              <strong>Escoges tu plan</strong> y continúas a la siguiente pantalla, donde está el botón de PayPal.
            </li>
            <li>
              <strong>Autorizas la suscripción en PayPal.</strong> No se te cobra en ese momento.
            </li>
            <li>
              <strong>Pasados los {TRIAL_MONTHS} meses sin cargo</strong>, PayPal hace el primer cobro y lo repite
              automáticamente. Puedes cancelar antes y no se te cobra.
            </li>
          </ol>

          {INCLUDES.length > 0 && (
            <>
              <h2>Qué incluye tu membresía</h2>
              <ul>
                {INCLUDES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="membresia-note">{INCLUDES_NOTE}</p>
            </>
          )}

        </div>
      </section>

      <Footer
        ctaHeading="¿Dudas sobre tu membresía?"
        ctaSubtext="Escríbenos y te ayudamos antes de pagar."
        ctaHref="mailto:redborincana@fundacionborincana.org"
        ctaLabel="Escribir a Red Borincana →"
      />
    </>
  );
}
