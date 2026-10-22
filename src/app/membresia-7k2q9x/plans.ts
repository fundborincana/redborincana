// Ruta base de la sección privada de membresía. Es una URL sin enlaces en el sitio y
// con noindex; no es un control de acceso. Para "rotar" el enlace, renombra la carpeta
// src/app/membresia-7k2q9x y actualiza BASE_PATH.
export const BASE_PATH = "/membresia-7k2q9x";

// Client ID público de la app de PayPal (no es un secreto). Debe corresponder al mismo
// ambiente (sandbox o live) que los planes de abajo.
export const PAYPAL_CLIENT_ID =
  "ASHtiCYq8ENPJ8YZeN5ztgLNRaJP2RoBTU39sjw2vzzt3Eq5VktU9X9X1_xpPg9nuQk-XnAe6a_g-Hqt";

// Meses sin cargo al inicio de la suscripción. Debe coincidir con el periodo de prueba
// configurado en cada plan dentro de PayPal; si no, el texto de la página mentiría.
export const TRIAL_MONTHS = 2;

export type PlanSlug = "anual" | "mensual";

export type Plan = {
  slug: PlanSlug;
  name: string;
  amount: string; // "$450"
  per: string; // "al año"
  repeats: string; // "cada año"
  // ID del plan de suscripción en PayPal.
  paypalPlanId: string;
};

export const PLANS: Record<PlanSlug, Plan> = {
  anual: {
    slug: "anual",
    name: "Membresía anual",
    amount: "$450",
    per: "al año",
    repeats: "cada año",
    paypalPlanId: "P-5TU48967YF3133541NLJDTAI",
  },
  mensual: {
    slug: "mensual",
    name: "Membresía mensual",
    amount: "$45",
    per: "al mes",
    repeats: "cada mes",
    paypalPlanId: "P-2HR301437U997492GNLJDWVY",
  },
};

// Lo que incluye la membresía (Acuerdo de Participación, sección 2, y presentación del
// 13-oct-2026). Mientras esté vacío, la sección "Qué incluye" no se muestra.
export const INCLUDES: string[] = [
  "Casos de clientes de Red Borincana asignados por región y según tu capacidad, con un panel para ver su estatus.",
  "Una base de datos de tus documentos con código QR, para compartir tu expediente al instante.",
  "Avisos automáticos cuando se acerque el vencimiento de tus documentos.",
  "Participación en la red de seguros y garantías, escogiendo tu propia aseguradora.",
  "Descuento en el curso avanzado de Solar IT (ENACT).",
  "Cotizaciones directas con distribuidores y manufactureros de equipo.",
  "Información de equipos nuevos y promociones de manufactureros y distribuidores.",
  "Información y educación sobre incentivos y reglamentos para compañías de instalación solar.",
];

// Aclaración que se muestra debajo de la lista. El acuerdo dice que algunos beneficios se
// irán habilitando durante la fase piloto, y la tarifa por caso es aparte de la membresía.
export const INCLUDES_NOTE =
  "Algunos beneficios se van habilitando durante la fase piloto. La tarifa por caso cerrado es aparte de la membresía.";
