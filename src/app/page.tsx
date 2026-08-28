import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntakeForm from "@/components/IntakeForm";

export default function Home() {
  return (
    <>
      <Header />

      <section className="hero">
        <div className="hero-inner">
          <div>
            <h1>
              Tu ruta hacia
              <span className="green">la energía solar</span>
            </h1>
            <p className="lead">
              Una red que te conecta con información confiable, orientación, financiamiento y proveedores
              cualificados para que puedas tomar decisiones informadas sobre tu proyecto solar.
            </p>
            <div className="hero-actions">
              <a href="#intake" className="cta-btn">
                Quiero más información
              </a>
              <a href="#como-funciona" className="cta-ghost">
                Ver cómo funciona
              </a>
            </div>
            <div className="hero-trust">
              <div className="item">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.3 2.3L16 10" /></svg>
                Revisión técnica independiente, sin conflicto de interés
              </div>
              <div className="item">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.3 2.3L16 10" /></svg>
                Conexión con recursos y opciones para avanzar
              </div>
              <div className="item">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.3 2.3L16 10" /></svg>
                Orientación clara durante cada etapa del proceso
              </div>
            </div>
          </div>
          <div className="hero-photo">
            <Image
              src="/images/foto-casa-solar.png"
              alt="Casa residencial en Puerto Rico con panales solares instalados en el techo"
              width={700}
              height={520}
              priority
            />
          </div>
        </div>
      </section>

      <section className="porque-existe" id="porque-existe">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">Por qué existimos</div>
            <h2>Confianza y desarrollo económico local</h2>
            <p>Invertir $20,000–$50,000 en un sistema solar es una decisión grande, y hoy no siempre es fácil saber en quién confiar.</p>
          </div>
          <div className="porque-grid">
            <div className="razon-card">
              <div className="num">1</div>
              <h3>Confianza técnica antes de decidir</h3>
              <p>
                Cada vez se conocen más casos de personas que firman contratos solares que no entienden, con
                propuestas sobredimensionadas o compañías que desaparecen cuando algo falla. Red Borincana existe
                para que tengas una revisión técnica independiente antes de comprometer tu dinero — no la vende
                quien te la instala.
              </p>
            </div>
            <div className="razon-card">
              <div className="num">2</div>
              <h3>Un ecosistema solar puertorriqueño</h3>
              <p>
                Cada proyecto financiado, instalado y mantenido por cooperativas, técnicos e instaladores
                puertorriqueños fortalece la economía local. Red Borincana conecta ese ecosistema —
                financiamiento, instalación y evaluación técnica — dentro de Puerto Rico.
              </p>
            </div>
          </div>
          <div className="story">
            <p>
              <span className="name">Ejemplo:</span> María recibe una propuesta solar de $35,000 y no está segura
              si es el tamaño correcto para su casa.
            </p>
            <p>
              A través de Red Borincana, comparte su propuesta con un equipo técnico independiente, que descubre
              que necesita un sistema más pequeño.
            </p>
            <p>María avanza con su cooperativa con un número correcto, un instalador puertorriqueño — y con confianza.</p>
          </div>
        </div>
      </section>

      <section className="basico" id="basico">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">Lo básico</div>
            <h2>¿Qué es un sistema solar residencial?</h2>
            <p>Antes de hablar del proceso de Red Borincana, esto es lo esencial que debes saber — sin importar con quién termines trabajando.</p>
          </div>
          <div className="comprar-grid">
            <div className="comprar-card">
              <h4>Medición neta</h4>
              <p>Tu sistema se conecta a la red de LUMA. El exceso de energía que generas de día se acredita, y puedes usarlo de noche.</p>
            </div>
            <div className="comprar-card">
              <h4>Con baterías</h4>
              <p>Además de conectarte a la red, almacenas energía para usarla durante apagones, sin depender de LUMA en ese momento.</p>
            </div>
            <div className="comprar-card">
              <h4>Fuera de la red</h4>
              <p>Sistema completamente independiente de LUMA. Es el más costoso y menos común de los tres.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="proceso" id="proceso">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">El proceso</div>
            <h2>Te acompañamos en cada paso</h2>
            <p>Este es el camino general para llevar energía solar a tu hogar o negocio — y en Red Borincana te apoyamos en todo el proceso, no solo en un paso suelto.</p>
          </div>
          <div className="proceso-grid">
            {[
              ["Evalúas tu consumo", "Te orientamos gratis, sin necesidad de tener la factura eléctrica a mano."],
              ["Recibes propuestas", "Revisamos cualquier propuesta de forma independiente antes de que decidas."],
              ["Consigues financiamiento", "Te conectamos con la cooperativa adecuada para tu situación."],
              ["Tramitas permisos", "Te explicamos qué esperar en cada paso, sin sorpresas."],
              ["Se instala el sistema", "Seguimos tu caso hasta que el sistema esté funcionando."],
            ].map(([title, body], i) => (
              <div className="proceso-step" key={title}>
                <div className="num">{i + 1}</div>
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <div className="proceso-nota">
            <b>No estás solo en esto.</b> Sin importar en qué paso te encuentres hoy, puedes empezar la conversación con nosotros.
          </div>
        </div>
      </section>

      <section className="como-funciona" id="como-funciona">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">Cómo funciona</div>
            <h2>Todo lo que necesitas, en un solo lugar</h2>
            <p>Desde que empiezas a explorar hasta que tu sistema está funcionando.</p>
          </div>
          <div className="icon-list">
            <div className="icon-item navy">
              <div className="badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M4 5.5C4 4.67 4.67 4 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5V5.5Z" /><path d="M20 5.5C20 4.67 19.33 4 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5V5.5Z" /></svg>
              </div>
              <div>
                <h4>Orientación y Educación</h4>
                <p>Información clara para entender tus opciones.</p>
              </div>
            </div>
            <div className="icon-item green">
              <div className="badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m20 20-4.35-4.35" /><path d="m7.5 10.5 2 2 4-4" /></svg>
              </div>
              <div>
                <h4>Análisis Independiente</h4>
                <p>Evaluamos tus necesidades energéticas y opciones solares.</p>
              </div>
            </div>
            <div className="icon-item navy">
              <div className="badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M3 10 12 4l9 6" /><path d="M5 10v9M9.5 10v9M14.5 10v9M19 10v9" /><path d="M3 21h18" /></svg>
              </div>
              <div>
                <h4>Financiamiento</h4>
                <p>Identificamos cooperativas y opciones de capital para tu proyecto.</p>
              </div>
            </div>
            <div className="icon-item green">
              <div className="badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2 2.5-2.5Z" /></svg>
              </div>
              <div>
                <h4>Instaladores Cualificados</h4>
                <p>Te conectamos con profesionales confiables en tu área.</p>
              </div>
            </div>
            <div className="icon-item navy">
              <div className="badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M12 3.5 5 6v6c0 4.5 3 7.5 7 8.5 4-1 7-4 7-8.5V6l-7-2.5Z" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
              <div>
                <h4>Seguros y Mantenimiento</h4>
                <p>Protege tu inversión y mantén tu sistema en óptimas condiciones.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="comprar" id="comprar">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">Antes de comprar</div>
            <h2>Lo que debes considerar antes de solicitar un sistema solar</h2>
            <p>Somos una iniciativa sin fines de lucro. No te vendemos nada — te ayudamos a hacer las preguntas correctas antes de firmar.</p>
          </div>
          <div className="comprar-grid">
            <div className="comprar-card"><h4>Dimensión del sistema</h4><p>¿El tamaño propuesto corresponde a tu consumo real, o es más grande (y más caro) de lo que necesitas?</p></div>
            <div className="comprar-card"><h4>Financiamiento</h4><p>¿Qué tasa, plazo y condiciones de prepago tiene la oferta? ¿Quién te la está financiando?</p></div>
            <div className="comprar-card"><h4>Instalador</h4><p>¿Está certificado? ¿Tiene historial verificable, seguro de responsabilidad y referencias reales?</p></div>
            <div className="comprar-card"><h4>Garantías</h4><p>¿Qué cubre la garantía, por cuánto tiempo, y quién responde si el sistema falla?</p></div>
            <div className="comprar-card"><h4>Mantenimiento</h4><p>¿Quién le da mantenimiento al sistema y con qué frecuencia? ¿Está incluido o es costo aparte?</p></div>
            <div className="comprar-card"><h4>Calendario de pagos</h4><p>¿Se te pide el 100% por adelantado, o hay un calendario razonable ligado a etapas de la instalación?</p></div>
          </div>
        </div>
      </section>

      <section className="audiencias" id="audiencias">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">Para quién es esto</div>
            <h2>Empecemos por donde tú estás</h2>
            <p>No necesitas ya tener una propuesta ni ser socio de una cooperativa para empezar — Red Borincana te orienta desde donde estés.</p>
          </div>
          <div className="aud-primary">
            <div>
              <div className="tag">Aún estoy explorando</div>
              <h3>No sé todavía por dónde empezar</h3>
              <p>Quiero entender qué es la energía solar, cuánto cuesta y cómo se financia — sin propuesta ni cooperativa todavía.</p>
            </div>
            <a href="#intake">Quiero orientación →</a>
          </div>
          <div className="aud-grid">
            <div className="aud-card">
              <div className="tag">Ya tengo una propuesta</div>
              <h3>Quiero una segunda opinión técnica</h3>
              <p>Tengo una propuesta de instalador o estoy en proceso con mi cooperativa y quiero una revisión independiente.</p>
              <a href="#intake">Solicitar evaluación →</a>
            </div>
            <div className="aud-card">
              <div className="tag">Soy cooperativa</div>
              <h3>Quiero ofrecer este servicio a mis socios</h3>
              <p>Buscamos aprobar financiamiento solar con más confianza, apoyándonos en una revisión técnica externa.</p>
              <a href="#intake">Conversemos →</a>
            </div>
            <div className="aud-card">
              <div className="tag">Soy instalador</div>
              <h3>Quiero ser considerado en la red</h3>
              <p>Somos una compañía de instalación en Puerto Rico y queremos formar parte de la red de instaladores evaluados de Red Borincana.</p>
              <a href="/instaladores">Conocer más →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">Preguntas frecuentes</div>
            <h2>Antes de escribirnos</h2>
            <p>Las dudas más comunes que hemos escuchado.</p>
          </div>
          <div className="faq-list">
            <details>
              <summary>¿Necesito ser socio de una cooperativa para usar Red Borincana?</summary>
              <p>No. Te orientamos primero a ti; la cooperativa entra después, como parte del camino de financiamiento — no como un requisito de entrada.</p>
            </details>
            <details>
              <summary>¿Necesito tener la factura eléctrica a mano?</summary>
              <p>No es obligatorio para empezar. Si hace falta más adelante, te ayudamos a conseguir esa información.</p>
            </details>
            <details>
              <summary>¿Qué pasa si no soy el dueño de la propiedad?</summary>
              <p>Podemos orientarte igual — hay caminos distintos según tu situación (dueño, heredero sin título, inquilino).</p>
            </details>
            <details>
              <summary>¿Qué pasa si ya tengo una propuesta de un instalador?</summary>
              <p>Perfecto — la revisamos de forma independiente antes de que decidas avanzar con el financiamiento.</p>
            </details>
            <details>
              <summary>¿Cuánto tarda el proceso?</summary>
              <p>Varía según tu caso, pero te mantenemos informado en cada paso.</p>
            </details>
            <details>
              <summary>¿Mi información se comparte con la cooperativa?</summary>
              <p>Solo cuando tú decides avanzar con el financiamiento — no antes.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="intake" id="intake">
        <div className="wrap">
          <div className="intake-inner">
            <div className="intake-grid">
              <div className="intake-copy">
                <h2>Cuéntanos un poco sobre ti</h2>
                <p>Este es un primer contacto, no una solicitud formal. Alguien de nuestro equipo se comunicará contigo para los próximos pasos.</p>
                <ul>
                  <li>Respuesta en 2–3 días hábiles.</li>
                  <li>No compartas documentos sensibles todavía — solo información básica.</li>
                  <li>Tus datos se usan únicamente para dar seguimiento a tu solicitud.</li>
                </ul>
              </div>
              <IntakeForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
