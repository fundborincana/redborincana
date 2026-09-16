"use client";

import { useState, type FormEvent } from "react";

const OFRECE_OPTIONS = ["Sí", "No, pero nos interesa", "Estamos en proceso de definirlo"];

export default function CooperativaForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const comentario = [
      `¿Ya ofrecen préstamos solares?: ${data.get("ofreceHoy")}`,
      data.get("socios") ? `Cantidad aprox. de socios: ${data.get("socios")}` : null,
      data.get("comentario") ? String(data.get("comentario")) : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.get("nombreContacto"),
          telefono: data.get("telefono"),
          email: data.get("email"),
          coop: data.get("nombreCoop"),
          municipio: data.get("municipio"),
          interes: "Soy una cooperativa interesada en el servicio",
          comentario,
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
        <label htmlFor="nombreCoop">Nombre de la cooperativa</label>
        <input id="nombreCoop" name="nombreCoop" type="text" placeholder="Nombre de la cooperativa" required />
      </div>
      <div className="field">
        <label htmlFor="nombreContacto">Nombre y cargo de la persona de contacto</label>
        <input
          id="nombreContacto"
          name="nombreContacto"
          type="text"
          placeholder="Ej. María Rivera, Directora de Finanzas"
          required
        />
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
        <label htmlFor="municipio">Municipio(s) o región donde operan</label>
        <input id="municipio" name="municipio" type="text" placeholder="Ej. Adjuntas, Utuado, Jayuya" required />
      </div>
      <div className="field">
        <label>¿Ya ofrecen préstamos solares hoy?</label>
        <div className="radio-group">
          {OFRECE_OPTIONS.map((option) => (
            <label className="radio-option" key={option}>
              <input type="radio" name="ofreceHoy" value={option} required />
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className="field">
        <label htmlFor="socios">Cantidad aproximada de socios (opcional)</label>
        <input id="socios" name="socios" type="text" placeholder="Ej. 500, o un rango aproximado" />
      </div>
      <div className="field">
        <label htmlFor="comentario">Cuéntanos más (opcional)</label>
        <textarea id="comentario" name="comentario" placeholder="Política actual, dudas, lo que sea útil..." />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="submit-btn" disabled={submitting}>
        {submitting ? "Enviando..." : "Enviar"}
      </button>
      <p className="form-note">Al enviar, aceptas que te contactemos sobre tu solicitud.</p>
    </form>
  );
}
