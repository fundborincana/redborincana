import { NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFICATION_EMAIL = "redborincana@fundacionborincana.org";
const FROM_EMAIL = "Red Borincana <noreply@redborincana.org>";

async function sendEmails(payload: {
  nombre: string;
  telefono: string;
  email: string;
  coop: string;
  municipio: string;
  interes: string;
  comentario: string;
  pagina: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured — skipping confirmation/notification emails");
    return;
  }

  const resend = new Resend(apiKey);

  const detailsHtml = `
    <p><strong>Nombre:</strong> ${payload.nombre}</p>
    <p><strong>Teléfono:</strong> ${payload.telefono}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Cooperativa:</strong> ${payload.coop || "—"}</p>
    <p><strong>Municipio:</strong> ${payload.municipio}</p>
    <p><strong>Tipo de interés:</strong> ${payload.interes || "—"}</p>
    <p><strong>Comentario:</strong> ${payload.comentario || "—"}</p>
    <p><strong>Página:</strong> ${payload.pagina || "—"}</p>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `Nueva solicitud: ${payload.nombre}`,
      html: detailsHtml,
    });
  } catch (err) {
    console.error("Failed to send internal notification email", err);
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: payload.email,
      subject: "Recibimos tu solicitud — Red Borincana",
      html: `
        <p>Hola ${payload.nombre},</p>
        <p>Gracias por escribirnos. Alguien de nuestro equipo se comunicará contigo en 2–3 días hábiles.</p>
        <p>— Red Borincana, una iniciativa de Fundación Borincana</p>
      `,
    });
  } catch (err) {
    console.error("Failed to send confirmation email", err);
  }
}

type IntakePayload = {
  fecha: string;
  nombre: string;
  telefono: string;
  email: string;
  coop: string;
  municipio: string;
  interes: string;
  comentario: string;
  pagina: string;
};

// Aviso a un chat o canal de Teams (flujo «Workflows» de Teams que recibe una solicitud web y publica una tarjeta).
// Es opcional: sin TEAMS_WEBHOOK_URL no hace nada, y si Teams falla no afecta el formulario ni los demás avisos.
async function notifyTeams(payload: IntakePayload) {
  const url = process.env.TEAMS_WEBHOOK_URL;
  if (!url) return;

  const fact = (title: string, value: string) => ({ title, value: value.trim() || "—" });
  const card = {
    type: "message",
    attachments: [
      {
        contentType: "application/vnd.microsoft.card.adaptive",
        contentUrl: null,
        content: {
          $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
          type: "AdaptiveCard",
          version: "1.4",
          body: [
            { type: "TextBlock", size: "Medium", weight: "Bolder", wrap: true, text: "Nueva solicitud desde la página web" },
            {
              type: "FactSet",
              facts: [
                fact("Nombre", payload.nombre),
                fact("Teléfono", payload.telefono),
                fact("Email", payload.email),
                fact("Municipio", payload.municipio),
                fact("Cooperativa", payload.coop),
                fact("Tipo de interés", payload.interes),
                fact("Comentario", payload.comentario),
                fact("Página", payload.pagina),
              ],
            },
          ],
        },
      },
    ],
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
      signal: controller.signal,
    });
    if (!res.ok) console.error("Teams webhook responded with", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("Failed to notify Teams", err);
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("GOOGLE_SHEET_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { ok: false, error: "El formulario todavía no está conectado a un destino. Contacta al equipo técnico." },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => null);
  if (
    !body ||
    typeof body.nombre !== "string" ||
    !body.nombre.trim() ||
    typeof body.telefono !== "string" ||
    !body.telefono.trim() ||
    typeof body.email !== "string" ||
    !body.email.trim() ||
    typeof body.municipio !== "string" ||
    !body.municipio.trim()
  ) {
    return NextResponse.json({ ok: false, error: "Faltan campos requeridos." }, { status: 400 });
  }

  const payload = {
    fecha: new Date().toISOString(),
    nombre: String(body.nombre).slice(0, 200),
    telefono: String(body.telefono).slice(0, 50),
    email: String(body.email).slice(0, 200),
    coop: String(body.coop ?? "").slice(0, 200),
    municipio: String(body.municipio).slice(0, 200),
    interes: String(body.interes ?? "").slice(0, 200),
    comentario: String(body.comentario ?? "").slice(0, 2000),
    pagina: String(body.pagina ?? "").slice(0, 200),
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Google Sheet webhook responded with", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: "No se pudo guardar la solicitud. Intenta de nuevo." }, { status: 502 });
    }

    // Los correos y el aviso a Teams salen a la vez; ninguno puede hacer fallar el formulario (ya se guardó en la hoja)
    await Promise.allSettled([sendEmails(payload), notifyTeams(payload)]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to reach Google Sheet webhook", err);
    return NextResponse.json({ ok: false, error: "No se pudo guardar la solicitud. Intenta de nuevo." }, { status: 502 });
  }
}
