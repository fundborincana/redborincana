import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <Image
          src="/images/logo-fundacion-borincana.png"
          alt="Fundación Borincana"
          width={140}
          height={40}
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
      <div className="footer-grid">
        <div>
          <h4>Red Borincana</h4>
          <p>
            Una iniciativa de Fundación Borincana, con respaldo de un equipo técnico independiente, para conectar a
            personas, cooperativas e instaladores puertorriqueños alrededor del financiamiento solar responsable.
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
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Fundación Borincana · Red Borincana</span>
        <span>San Juan, Puerto Rico</span>
      </div>
    </footer>
  );
}
