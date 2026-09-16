import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CooperativaForm from "@/components/CooperativaForm";

export const metadata: Metadata = {
  title: "Cooperativas — Red Borincana",
  description:
    "Suma a tu cooperativa a la red de Red Borincana y ofrece a tus socios financiamiento solar respaldado por una evaluación técnica independiente.",
};

export default function Cooperativas() {
  return (
    <>
      <Header />

      <div className="page-hero">
        <div className="kicker">Red de cooperativas</div>
        <h1>Ayuda a más socios de tu cooperativa a llegar a la energía solar — con confianza</h1>
        <p>
          Te damos la evaluación técnica independiente que no tienes que construir internamente, para que puedas
          aprobar financiamiento solar con más seguridad y menos riesgo.
        </p>
        <a href="#intake" className="cta-btn">
          Conversemos →
        </a>
      </div>

      <section className="audiencias" id="beneficios">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">Por qué participar</div>
            <h2>Lo que gana tu cooperativa al participar</h2>
            <p>Así se ve trabajar con Red Borincana desde el lado de tu cooperativa.</p>
          </div>
          <div className="aud-grid">
            <div className="aud-card">
              <div className="tag">Evaluación técnica</div>
              <h3>Evaluación técnica independiente</h3>
              <p>Cada caso llega con una revisión técnica independiente ya hecha, sin conflicto de interés con el instalador.</p>
            </div>
            <div className="aud-card">
              <div className="tag">Casos orientados</div>
              <h3>Casos orientados, no en blanco</h3>
              <p>Cada caso llega con contacto, objetivos energéticos y, cuando aplica, informe técnico. Menos tiempo educando, más tiempo aprobando.</p>
            </div>
            <div className="aud-card">
              <div className="tag">Próximamente</div>
              <h3>Portal de casos en línea</h3>
              <p>Pronto tu oficial designado podrá ver sus casos y su estatus en línea. Hoy lo hacemos de forma manual mientras afinamos el proceso.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="basico" id="como-trabajamos">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">Qué necesitamos alinear</div>
            <h2>Cómo trabajamos contigo</h2>
            <p>No necesitas llegar con todo resuelto. Esto es lo que sí necesitamos alinear contigo para empezar:</p>
          </div>
          <div className="req-list">
            {[
              [
                "Una política de préstamo solar",
                "Si ya tienes una, la usamos como base. Si no, te ayudamos a crearla, con términos que bajen la mensualidad de tus socios.",
              ],
              [
                "Un oficial de contacto designado",
                "La persona que recibe los casos y coordina el flujo con nosotros.",
              ],
              [
                "Criterios claros de originación",
                "Puntuación de crédito mínima, financiamiento máximo, y si cubres baterías o solo el sistema fotovoltaico.",
              ],
              [
                "Una fase piloto manual antes del flujo en línea",
                "Afinamos juntos el proceso antes de automatizarlo.",
              ],
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

      <section className="proceso" id="proceso-cooperativa">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">Cómo funciona</div>
            <h2>Cómo funciona el proceso</h2>
            <p>Así se ve el camino, desde la primera conversación hasta el cierre.</p>
          </div>
          <div className="proceso-grid count-4">
            {[
              [
                "Conversamos contigo",
                "Entendemos tu política de préstamos actual (o te ayudamos a definir una) y tus criterios de originación.",
              ],
              [
                "Recibes casos ya orientados",
                "La persona interesada ya completó nuestro formulario inicial y, cuando aplica, ya tiene una evaluación técnica independiente de nuestro equipo técnico.",
              ],
              [
                "Tu equipo revisa y aprueba con más contexto",
                "Partes del informe técnico, no de una propuesta sin revisar de un instalador.",
              ],
              [
                "Acompañamos el cierre",
                "Conectamos al solicitante con instaladores evaluados por Red Borincana y, cuando aplica, con opciones de seguro para el equipo.",
              ],
            ].map(([title, body], i) => (
              <div className="proceso-step" key={title}>
                <div className="num">{i + 1}</div>
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <div className="proceso-nota">
            <a href="#intake" className="cta-btn">
              Quiero que mi cooperativa sea parte de la red →
            </a>
          </div>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">Preguntas frecuentes</div>
            <h2>Antes de sumarte</h2>
            <p>Las dudas más comunes de cooperativas interesadas.</p>
          </div>
          <div className="faq-list">
            <details>
              <summary>¿Necesitamos ya tener una política de préstamo solar para empezar?</summary>
              <p>No. Podemos ayudarte a construir una desde cero, basándonos en lo que ya ha funcionado con otras cooperativas.</p>
            </details>
            <details>
              <summary>¿Qué pasa con la información de nuestros socios?</summary>
              <p>
                La compartimos únicamente contigo como cooperativa y con los instaladores que tú apruebes para cada
                caso — no se hace pública ni se comparte con terceros sin tu conocimiento.
              </p>
            </details>
            <details>
              <summary>¿Esto tiene algún costo para la cooperativa?</summary>
              <p>No. El servicio no tiene costo para la cooperativa.</p>
            </details>
            <details>
              <summary>¿Tienes otras preguntas antes de sumarte?</summary>
              <p>
                Escríbenos a <a href="mailto:redborincana@fundacionborincana.org">redborincana@fundacionborincana.org</a> —
                mismo correo de contacto general del sitio.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="intake" id="intake">
        <div className="wrap">
          <div className="intake-inner">
            <div className="intake-grid">
              <div className="intake-copy">
                <h2>Cuéntanos sobre tu cooperativa</h2>
                <p>Este es un primer contacto — no una solicitud formal ni un compromiso.</p>
                <ul>
                  <li>Respuesta en 2–3 días hábiles.</li>
                  <li>No necesitas llegar con todo resuelto para empezar la conversación.</li>
                  <li>Tus datos se usan únicamente para evaluar tu solicitud.</li>
                </ul>
              </div>
              <CooperativaForm />
            </div>
          </div>
        </div>
      </section>

      <Footer
        ctaHeading="¿Tienes preguntas antes de sumarte?"
        ctaSubtext="Escríbenos directamente y te orientamos."
        ctaHref="mailto:redborincana@fundacionborincana.org"
        ctaLabel="Escribir a Red Borincana →"
      />
    </>
  );
}
