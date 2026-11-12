"use client";

import { useEffect, useState } from "react";

const EMBED_ORIGIN = "https://casos.redborincana.org";
const EMBED_SRC = `${EMBED_ORIGIN}/solicitud?embed=1`;

// El formulario avisa su alto con postMessage cada vez que cambia (por ejemplo al pasar de
// paso), para que la página lo muestre completo sin una barra de desplazamiento interna.
export default function EvaluacionEmbed() {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== EMBED_ORIGIN || !e.data || e.data.type !== "rb-solicitud-height") return;
      const h = Number(e.data.height);
      if (Number.isFinite(h) && h > 0) setHeight(h);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      id="rb-solicitud"
      src={EMBED_SRC}
      title="Solicitud de evaluación solar - Red Borincana"
      style={{ width: "100%", minHeight: 720, border: 0, ...(height ? { height } : {}) }}
      allow="geolocation"
      loading="lazy"
    />
  );
}
