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

    await sendEmails(payload);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to reach Google Sheet webhook", err);
    return NextResponse.json({ ok: false, error: "No se pudo guardar la solicitud. Intenta de nuevo." }, { status: 502 });
  }
}
