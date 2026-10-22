import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PayPalSubscribeButton from "@/components/PayPalSubscribeButton";
import {
  BASE_PATH,
  INCLUDES,
  INCLUDES_NOTE,
  PAYPAL_CLIENT_ID,
  PLANS,
  TRIAL_MONTHS,
  type PlanSlug,
} from "../plans";

export function generateStaticParams() {
  return Object.keys(PLANS).map((plan) => ({ plan }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ plan: string }> }): Promise<Metadata> {
  const { plan } = await params;
  const found = PLANS[plan as PlanSlug];
  return { title: `${found?.name ?? "Membresía"} — Red Borincana` };
}

export default async function PlanPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan: slug } = await params;
  const plan = PLANS[slug as PlanSlug];
  if (!plan) notFound();

  return (
    <>
      <Header />

      <div className="page-hero">
        <div className="kicker">{plan.name}</div>
        <h1>
          {plan.amount} {plan.per}
        </h1>
        <p>
          Los primeros {TRIAL_MONTHS} meses son sin cargo. Hoy no pagas nada: tu primer cargo de {plan.amount} ocurre
          al terminar esos {TRIAL_MONTHS} meses.
        </p>
      </div>

      <section className="membresia-info">
        <div className="wrap membresia-info-inner">
          <h2>Qué va a pasar</h2>
          <ol>
            <li>
              <strong>Hoy:</strong> autorizas la suscripción en PayPal. No se te cobra en este momento.
            </li>
            <li>
              <strong>Durante {TRIAL_MONTHS} meses:</strong> no hay ningún cargo.
            </li>
            <li>
              <strong>Al terminar los {TRIAL_MONTHS} meses:</strong> PayPal cobra {plan.amount} y lo repite{" "}
              {plan.repeats} hasta que canceles.
            </li>
          </ol>
          <p>
            Puedes cancelar cuando quieras desde tu cuenta de PayPal, en la sección de pagos automáticos. Si cancelas
            antes de que terminen los {TRIAL_MONTHS} meses, no se te cobra.
          </p>

          {INCLUDES.length > 0 && (
            <>
              <h2>Qué incluye</h2>
              <ul>
                {INCLUDES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="membresia-note">{INCLUDES_NOTE}</p>
            </>
          )}

          <h2>Cómo pagar</h2>
          <p>Verás tres botones. Escoge el que te sirva:</p>
          <ul>
            <li>
              <strong>PayPal (amarillo):</strong> inicias sesión con el correo y la contraseña de tu cuenta de PayPal y
              confirmas la suscripción.
            </li>
            <li>
              <strong>Débito o crédito (negro):</strong> pagas con tu tarjeta. PayPal te pedirá crear una cuenta de
              PayPal gratuita con tu correo, o iniciar sesión si ya tienes una. Tu tarjeta queda guardada en esa cuenta
              para los cobros automáticos.
            </li>
            <li>
              <strong>PayPal Credit (azul):</strong> solo si ya tienes la línea de crédito de PayPal.
            </li>
          </ul>
          <p className="membresia-note">
            La ventana de PayPal puede aparecer en inglés. &quot;Create Account &amp; Subscribe&quot; significa
            &quot;Crear cuenta y suscribirse&quot;; &quot;Log In&quot; significa &quot;Iniciar sesión&quot;.
          </p>
        </div>
      </section>

      <section className="evaluacion-embed">
        <div className="wrap">
          <div className="evaluacion-embed-card">
            <PayPalSubscribeButton
              clientId={PAYPAL_CLIENT_ID}
              planId={plan.paypalPlanId}
              successHref={`${BASE_PATH}/gracias`}
            />
            <p className="membresia-note">
              Pagas de forma segura con PayPal; Red Borincana no ve ni guarda los datos de tu tarjeta.
            </p>
            <p className="membresia-note">
              <a href={BASE_PATH}>← Cambiar de plan</a>
            </p>
          </div>
        </div>
      </section>

      <Footer
        ctaHeading="¿Dudas antes de pagar?"
        ctaSubtext="Escríbenos y te orientamos."
        ctaHref="mailto:redborincana@fundacionborincana.org"
        ctaLabel="Escribir a Red Borincana →"
      />
    </>
  );
}
