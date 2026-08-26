import Image from "next/image";

export default function Footer({
  ctaHeading = "Toma decisiones con información.",
  ctaSubtext = "Encuentra opciones que funcionen para ti.",
  ctaHref = "/#intake",
  ctaLabel = "Comenzar →",
}: {
  ctaHeading?: string;
  ctaSubtext?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <footer>
      <div className="footer-cta wrap">
        <div>
          <h3>{ctaHeading}</h3>
          <p>{ctaSubtext}</p>
        </div>
        <a href={ctaHref} className="cta-btn">
          {ctaLabel}
        </a>
      </div>

      <div className="footer-top wrap">
        <Image
          src="/images/logo-red-borincana-full.png"
          alt="Red Borincana"
          width={994}
          height={605}
          style={{ height: 52, width: "auto", filter: "brightness(0) invert(1)" }}
        />
      </div>
      <div className="footer-grid wrap">
        <div>
          <p>
            Conectamos a personas, cooperativas e instaladores puertorriqueños alrededor del financiamiento solar
            responsable, con respaldo de un equipo técnico independiente.
          </p>
        </div>
        <div>
          <h4>Enlaces</h4>
          <a href="/#porque-existe">Por qué existimos</a>
          <a href="/#como-funciona">Cómo funciona</a>
          <a href="/#comprar">Antes de comprar</a>
          <a href="/#audiencias">Para quién es</a>
          <a href="/instaladores">Instaladores</a>
          <a href="/#faq">Preguntas frecuentes</a>
        </div>
        <div>
          <h4>Contacto</h4>
          <a href="mailto:redborincana@fundacionborincana.org">redborincana@fundacionborincana.org</a>
          <a href="/#intake">Formulario de contacto</a>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <span>© {new Date().getFullYear()} Fundación Borincana · Red Borincana</span>
        <Image
          src="/images/logo-fundacion-borincana-transparent.png"
          alt="Una iniciativa de Fundación Borincana"
          width={1634}
          height={166}
          style={{ height: 16, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.75 }}
        />
        <span>San Juan, Puerto Rico</span>
      </div>
    </footer>
  );
}
