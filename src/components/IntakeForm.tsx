"use client";

import { useState, type FormEvent } from "react";

const INTEREST_OPTIONS = [
  "Aún estoy explorando, no tengo propuesta todavía",
  "Soy socio buscando evaluación de mi propuesta solar",
  "Soy una cooperativa interesada en el servicio",
  "Soy instalador",
  "Otro",
];

export default function IntakeForm({
  defaultInterest,
}: {
  defaultInterest?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // TODO: conectar al sistema de manejo de flujos de trabajo del cliente (embed o vía MCP)
    // una vez tengan definido el endpoint/formulario de destino.
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="form-success">
        <h3>¡Gracias por escribirnos!</h3>
        <p>Alguien de nuestro equipo se comunicará contigo en 2–3 días hábiles.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="nombre">Nombre completo</label>
        <input id="nombre" name="nombre" type="text" placeholder="Nombre y apellido" required />
      </div>
      <div className="field">
        <label htmlFor="coop">Cooperativa (si aplica)</label>
        <input id="coop" name="coop" type="text" placeholder="Nombre de tu cooperativa, o 'no sé' / 'no afiliado'" />
      </div>
      <div className="field">
        <label htmlFor="municipio">Municipio</label>
        <input id="municipio" name="municipio" type="text" placeholder="Tu municipio" required />
      </div>
      <div className="field">
        <label htmlFor="interes">Tipo de interés</label>
        <select id="interes" name="interes" defaultValue={defaultInterest ?? INTEREST_OPTIONS[0]}>
          {INTEREST_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="comentario">Cuéntanos más (opcional)</label>
        <textarea id="comentario" name="comentario" placeholder="Cualquier detalle adicional..." />
      </div>
      <button type="submit" className="submit-btn" disabled={submitting}>
        {submitting ? "Enviando..." : "Enviar solicitud"}
      </button>
      <p className="form-note">Al enviar, aceptas que te contactemos sobre tu solicitud.</p>
    </form>
  );
}
