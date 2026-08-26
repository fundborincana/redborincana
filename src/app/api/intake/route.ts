import { NextResponse } from "next/server";

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
  if (!body || typeof body.nombre !== "string" || !body.nombre.trim() || typeof body.municipio !== "string" || !body.municipio.trim()) {
    return NextResponse.json({ ok: false, error: "Faltan campos requeridos." }, { status: 400 });
  }

  const payload = {
    fecha: new Date().toISOString(),
    nombre: String(body.nombre).slice(0, 200),
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to reach Google Sheet webhook", err);
    return NextResponse.json({ ok: false, error: "No se pudo guardar la solicitud. Intenta de nuevo." }, { status: 502 });
  }
}
