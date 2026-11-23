import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM_EMAIL = "Red Borincana <noreply@redborincana.org>";

// Solo sale el correo de confirmación a quien llenó el formulario. El aviso interno al equipo
// ya no llega por correo: se publica en Teams y se crea la tarjeta en Planner (ver notifyTeams).
async function sendEmails(payload: { nombre: string; email: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured — skipping confirmation email");
    return;
  }

  const resend = new Resend(apiKey);

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

// Hora de Puerto Rico (UTC-4, sin cambio de horario): se trabaja con getUTC* sobre una fecha desplazada.
const PR_OFFSET_MS = 4 * 60 * 60 * 1000;

function two(n: number) {
  return String(n).padStart(2, "0");
}

// Número de caso de la web, con el mismo formato que los de WhatsApp (WA-aammdd-hhmmss).
function casoWeb(now: Date) {
  const d = new Date(now.getTime() - PR_OFFSET_MS);
  const aammdd = `${two(d.getUTCFullYear() % 100)}${two(d.getUTCMonth() + 1)}${two(d.getUTCDate())}`;
  const hhmmss = `${two(d.getUTCHours())}${two(d.getUTCMinutes())}${two(d.getUTCSeconds())}`;
  return `WEB-${aammdd}-${hhmmss}`;
}

// Dos días laborables después de hoy, a las 5:00 p. m. de Puerto Rico, en ISO UTC (no cuenta feriados).
function venceDosDiasLaborables(now: Date) {
  const d = new Date(now.getTime() - PR_OFFSET_MS);
  let vence = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 17, 0, 0));
  let sumados = 0;
  while (sumados < 2) {
    vence = new Date(vence.getTime() + 24 * 60 * 60 * 1000);
    const dia = vence.getUTCDay();
    if (dia !== 0 && dia !== 6) sumados++;
  }
  return new Date(vence.getTime() + PR_OFFSET_MS).toISOString();
}

// Igual que con WhatsApp: tarjeta en Planner solo para personas (clientes), no para cooperativas ni instaladores.
function creaTarjeta(payload: IntakePayload) {
  const interes = payload.interes.toLowerCase();
  const esCooperativa = interes.startsWith("soy una cooperativa") || payload.pagina.startsWith("/cooperativas");
  const esInstalador = interes.startsWith("soy instalador");
  return !esCooperativa && !esInstalador;
}

// Mismo objeto «tarea» que manda el asistente de WhatsApp, para que el flujo de Power Automate
// cree la tarjeta con los mismos pasos: crear, accion, caso, nota, titulo, descripcion, vence.
function buildTarea(payload: IntakePayload) {
  const now = new Date();
  const crear = creaTarjeta(payload);
  const caso = casoWeb(now);
  const filas: [string, string][] = [
    ["Nombre", payload.nombre],
    ["Teléfono", payload.telefono],
    ["Email", payload.email],
    ["Municipio", payload.municipio],
    ["Cooperativa", payload.coop],
    ["Tipo de interés", payload.interes],
    ["Caso", caso],
    ["Página", payload.pagina],
  ];
  const descripcion =
    filas
      .filter(([, valor]) => valor.trim())
      .map(([nombre, valor]) => `${nombre}: ${valor}`)
      .join("\n") + `\nComentario: ${payload.comentario.trim() || "—"}`;

  return {
    crear,
    accion: crear ? "crear" : "ninguna",
    caso,
    nota: "",
    titulo: `Llamar a ${payload.nombre || "persona sin nombre"} · ${payload.telefono} [${caso}]`,
    descripcion,
    vence: venceDosDiasLaborables(now),
  };
}

// Aviso a un chat o canal de Teams (flujo «Workflows» de Teams que recibe una solicitud web y publica una tarjeta).
// Es opcional: sin TEAMS_WEBHOOK_URL no hace nada, y si Teams falla no afecta el formulario ni los demás avisos.
async function notifyTeams(payload: IntakePayload) {
  const url = process.env.TEAMS_WEBHOOK_URL;
  if (!url) return;

  const fact = (title: string, value: string) => ({ title, value: value.trim() || "—" });
  const card = {
    type: "message",
    // Los mismos datos, sueltos, para que el flujo de Teams pueda usarlos (por ejemplo, para crear una tarea en Planner):
    // en Power Automate se leen con triggerBody()?['datos']?['nombre'], ['telefono'], ['email'], etc.
    datos: {
      fecha: payload.fecha,
      nombre: payload.nombre,
      telefono: payload.telefono,
      email: payload.email,
      municipio: payload.municipio,
      coop: payload.coop,
      interes: payload.interes,
      comentario: payload.comentario,
      pagina: payload.pagina,
    },
    // Datos para crear la tarjeta en Planner (ver buildTarea).
    tarea: buildTarea(payload),
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
