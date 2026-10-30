// Datos de contacto de Red Borincana. Cada valor vacío oculta lo que depende de él
// (el teléfono del encabezado y del pie, y el botón de WhatsApp), así que nada se
// muestra a medias mientras falte un dato.

// Cómo se ve el número en pantalla, por ejemplo "(787) 555-0123".
export const PHONE_DISPLAY = "(939) 300-4718";

// Para el enlace de llamada (tel:), con código de país y solo dígitos, por ejemplo "+17875550123".
export const PHONE_TEL = "+19393004718";

// Para WhatsApp (wa.me): código de país y solo dígitos, sin "+", por ejemplo "17875550123".
export const WHATSAPP_NUMBER = "19393004718";

// Mensaje que ya aparece escrito cuando la persona abre el chat.
export const WHATSAPP_MESSAGE = "Hola, quisiera información sobre Red Borincana.";

export const whatsappHref = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : "";
