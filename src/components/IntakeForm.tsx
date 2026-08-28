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
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.get("nombre"),
          telefono: data.get("telefono"),
          email: data.get("email"),
          coop: data.get("coop"),
          municipio: data.get("municipio"),
          interes: data.get("interes"),
          comentario: data.get("comentario"),
          pagina: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      const json = await res.json().catch(() => ({ ok: false }));

      if (!res.ok || !json.ok) {
        setError(json.error || "No se pudo enviar la solicitud. Intenta de nuevo.");
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch {
      setError("No se pudo enviar la solicitud. Revisa tu conexión e intenta de nuevo.");
      setSubmitting(false);
    }
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
        <label htmlFor="telefono">Teléfono</label>
        <input id="telefono" name="telefono" type="tel" placeholder="787-000-0000" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="tu@correo.com" required />
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
        <label htmlFor="coop">Cooperativa (si ya es socio de una)</label>
        <input id="coop" name="coop" type="text" placeholder="Nombre de tu cooperativa, o 'no sé' / 'no afiliado'" />
      </div>
      <div className="field">
        <label htmlFor="comentario">Cuéntanos más (opcional)</label>
        <textarea id="comentario" name="comentario" placeholder="Cualquier detalle adicional..." />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="submit-btn" disabled={submitting}>
        {submitting ? "Enviando..." : "Enviar solicitud"}
      </button>
      <p className="form-note">Al enviar, aceptas que te contactemos sobre tu solicitud.</p>
    </form>
  );
}
