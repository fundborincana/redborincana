import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntakeForm from "@/components/IntakeForm";

export const metadata: Metadata = {
  title: "Instaladores — Red Borincana",
  description:
    "Únete a la red de instaladores solares evaluados de Red Borincana en Puerto Rico y conecta con clientes orientados a través de una revisión técnica independiente.",
};

export default function Instaladores() {
  return (
    <>
      <Header />

      <div className="page-hero">
        <div className="kicker">Red de instaladores</div>
        <h1>Súmate a la red de instaladores evaluados de Red Borincana</h1>
        <p>
          Conectamos a personas y cooperativas puertorriqueñas con instaladores confiables. Ser parte de la red
          significa acceso a clientes que ya recibieron orientación y una revisión técnica independiente antes de
          llegar a ti.
        </p>
      </div>

      <section className="audiencias" id="beneficios">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">Por qué unirte</div>
            <h2>Lo que ganas al ser parte de la red</h2>
            <p>Red Borincana no compite con instaladores — trabajamos para que lleguen mejor preparados a ti.</p>
          </div>
          <div className="aud-grid">
            <div className="aud-card">
              <div className="tag">Clientes orientados</div>
              <h3>Menos tiempo educando, más tiempo cerrando</h3>
              <p>Los clientes que te llegan ya entienden lo básico de energía solar y ya pasaron por una conversación inicial con nuestro equipo.</p>
            </div>
            <div className="aud-card">
              <div className="tag">Financiamiento conectado</div>
              <h3>Acceso al ecosistema de cooperativas</h3>
              <p>Trabajamos junto a cooperativas puertorriqueñas para que el financiamiento avance en paralelo con tu propuesta, no como un obstáculo aparte.</p>
            </div>
            <div className="aud-card">
              <div className="tag">Próximamente</div>
              <h3>Visibilidad en un directorio público</h3>
              <p>Estamos construyendo un directorio público de instaladores evaluados. Los primeros en unirse a la red serán los primeros en aparecer.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="basico" id="criterios">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">Qué buscamos</div>
            <h2>Criterios generales de evaluación</h2>
            <p>Esta es una guía inicial — el equipo de Fundación Borincana confirma los criterios finales durante el proceso de solicitud.</p>
          </div>
          <div className="req-list">
            {[
              ["Licencia y permisos vigentes", "Licencia de contratista y permisos activos para operar en Puerto Rico."],
              ["Seguro de responsabilidad civil", "Cobertura activa que proteja al cliente ante daños durante la instalación."],
              ["Historial verificable", "Proyectos residenciales anteriores que podamos confirmar, con referencias reales."],
              ["Cumplimiento técnico", "Instalaciones conformes al código eléctrico de Puerto Rico y estándares de la industria."],
              ["Transparencia con el cliente", "Disposición a que tus propuestas pasen por una revisión técnica independiente antes de firmarse."],
            ].map(([title, body]) => (
              <div className="req-item" key={title}>
                <span className="check">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4.5 4.5L19 7" /></svg>
                </span>
                <p>
                  <strong>{title}.</strong> {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="proceso" id="proceso-instalador">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">Cómo aplicar</div>
            <h2>El proceso de solicitud</h2>
            <p>Cuatro pasos, desde que nos escribes hasta que apareces en la red.</p>
          </div>
          <div className="proceso-grid count-4">
            {[
              ["Envías tu información", "Completas el formulario con los datos básicos de tu compañía."],
              ["Revisamos tu perfil", "Confirmamos licencia, seguro e historial de proyectos."],
              ["Conversamos contigo", "Una llamada breve para conocer tu equipo y forma de trabajar."],
              ["Te sumas a la red", "Empiezas a recibir clientes orientados por Red Borincana."],
            ].map(([title, body], i) => (
              <div className="proceso-step" key={title}>
                <div className="num">{i + 1}</div>
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="intake" id="intake">
        <div className="wrap">
          <div className="intake-inner">
            <div className="intake-grid">
              <div className="intake-copy">
                <h2>Solicita ser parte de la red</h2>
                <p>Cuéntanos sobre tu compañía. Este es un primer contacto — no una solicitud formal ni un compromiso.</p>
                <ul>
                  <li>Respuesta en 2–3 días hábiles.</li>
                  <li>Puede que te pidamos licencia, seguro y referencias más adelante.</li>
                  <li>Tus datos se usan únicamente para evaluar tu solicitud.</li>
                </ul>
              </div>
              <IntakeForm defaultInterest="Soy instalador" />
            </div>
          </div>
        </div>
      </section>

      <Footer
        ctaHeading="¿Tienes preguntas antes de aplicar?"
        ctaSubtext="Escríbenos directamente y te orientamos."
        ctaHref="mailto:redborincana@fundacionborincana.org"
        ctaLabel="Escribir a Red Borincana →"
      />
    </>
  );
}
