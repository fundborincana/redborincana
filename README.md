# Red Borincana

Sitio web de Red Borincana, una iniciativa de Fundación Borincana que conecta a personas, cooperativas e
instaladores puertorriqueños alrededor del financiamiento solar responsable.

Next.js (App Router) + TypeScript, sin librería de estilos externa (CSS plano en `src/app/globals.css`).

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

- `src/app/page.tsx` — homepage
- `src/app/instaladores/page.tsx` — página para instaladores que quieren unirse a la red
- `src/components/` — Header, Footer, IntakeForm (compartidos entre páginas)
- `src/app/api/intake/route.ts` — recibe el formulario de contacto y lo reenvía al destino configurado

## Formulario de contacto → Google Sheets (solución interina)

El formulario (`IntakeForm`) envía a `/api/intake`, que reenvía los datos a un Google Apps Script Web App
que los guarda en un Google Sheet. Esto es temporal, mientras se conecta el sistema de manejo de flujos de
trabajo real del cliente.

**Configuración (una vez, en la cuenta de Google del cliente):**

1. Crea un Google Sheet nuevo. En la primera fila, agrega estos encabezados:
   `Fecha | Nombre | Teléfono | Email | Cooperativa | Municipio | Interés | Comentario | Página`
2. Ve a **Extensiones → Apps Script**.
3. Borra el código de ejemplo y pega esto:

   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       data.fecha || new Date().toISOString(),
       data.nombre || "",
       data.telefono || "",
       data.email || "",
       data.coop || "",
       data.municipio || "",
       data.interes || "",
       data.comentario || "",
       data.pagina || "",
     ]);
     return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
       ContentService.MimeType.JSON
     );
   }
   ```

4. **Implementar → Nueva implementación → tipo: Aplicación web.**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
5. Autoriza los permisos cuando lo pida. Copia la URL de la aplicación web (termina en `/exec`).
6. Configura esa URL como variable de entorno `GOOGLE_SHEET_WEBHOOK_URL`:
   - Local: crea `.env.local` (no se sube a git) con `GOOGLE_SHEET_WEBHOOK_URL=<tu-url>` — usa `.env.example` como referencia.
   - Netlify: Site settings → Environment variables → agrega `GOOGLE_SHEET_WEBHOOK_URL`.

Sin esa variable configurada, el formulario muestra un error al enviar (no falla en silencio).

**Cuando se conecte el sistema definitivo del cliente:** reemplazar la lógica interna de
`src/app/api/intake/route.ts` — el formulario en el front-end no necesita cambiar.

## Email de confirmación (Resend)

Cuando alguien envía el formulario, además de guardarse en Google Sheets, se envía un correo de **confirmación** a la
persona que llenó el formulario, vía [Resend](https://resend.com).

El aviso interno al equipo **ya no llega por correo** a `redborincana@fundacionborincana.org`: se publica en Teams y se
crea una tarjeta en Planner (ver «Aviso a Teams» más abajo).

Si `RESEND_API_KEY` no está configurada, el formulario sigue funcionando normalmente (se guarda en el
Google Sheet) pero no se envía el correo — el error queda registrado en los logs del servidor, no se
le muestra al usuario.

**Configuración (una vez):**

1. Crea una cuenta en [resend.com](https://resend.com).
2. En **Domains → Add Domain**, agrega `redborincana.org`.
3. Agrega los registros DNS que te indique Resend (SPF/DKIM) en el proveedor de DNS del dominio (GoDaddy).
4. Espera a que el dominio quede verificado en Resend.
5. Crea una API key en Resend y configúrala como variable de entorno `RESEND_API_KEY`:
   - Local: en `.env.local` (no se sube a git) — usa `.env.example` como referencia.
   - Netlify: Site settings → Environment variables → agrega `RESEND_API_KEY`.

El remitente configurado en el código (`src/app/api/intake/route.ts`) es `noreply@redborincana.org` — si
se cambia el dominio verificado en Resend, hay que actualizar esa dirección también.

## Deploy

Configurado para Netlify (detecta Next.js automáticamente). Recuerda configurar `GOOGLE_SHEET_WEBHOOK_URL`
y `RESEND_API_KEY` en las variables de entorno del sitio antes de que el formulario funcione en producción.

## Aviso a Teams (chat o canal)

Cada solicitud nueva, además de guardarse en la hoja y de enviar los correos, puede publicarse como una tarjeta en un
chat o canal de Microsoft Teams. Es **opcional**: sin la variable `TEAMS_WEBHOOK_URL` no se hace nada, y si Teams falla
el formulario sigue funcionando (el error queda en los logs del servidor).

**Configuración (una vez, en Teams):**

1. Abre el chat o canal donde quieres recibir las solicitudes. La persona que crea el flujo debe ser miembro de ese chat.
2. En Teams, abre la aplicación **Workflows** (en el menú **···** del chat o canal, o en Aplicaciones → Workflows).
3. Busca la plantilla **«Send webhook alerts to a chat»** (o **«…to a channel»**, si es un canal; también puede
   llamarse «Post to a chat when a webhook request is received»).
4. Ponle un nombre (por ejemplo «Solicitudes de la web»), confirma las conexiones con tu cuenta y escoge el chat o canal.
5. Al terminar, Teams muestra una **URL**. Cópiala.
6. Configúrala como variable de entorno `TEAMS_WEBHOOK_URL`:
   - Local: en `.env.local` (no se sube a git).
   - Netlify: Site settings → Environment variables → agrega `TEAMS_WEBHOOK_URL`, y vuelve a desplegar el sitio.

**Notas:**
- La URL es secreta: quien la tenga puede publicar mensajes en ese chat. No se sube a git.
- El flujo se ejecuta con la cuenta de quien lo creó: si esa persona sale de la organización, el flujo deja de funcionar y hay que recrearlo.
- La tarjeta muestra nombre, teléfono, email, municipio, cooperativa, tipo de interés, comentario y página.

### Datos sueltos para el flujo de Teams (crear una tarea en Planner, etc.)

Además de la tarjeta, el envío a Teams trae un objeto `datos` con los campos por separado. En Power Automate se leen con
una expresión (botón `fx`), por ejemplo:

- Título de la tarea: `concat('Llamar a ', triggerBody()?['datos']?['nombre'])`
- Fecha límite (hoy + 3 días): `addDays(utcNow(), 3)`
- Campos disponibles: `fecha`, `nombre`, `telefono`, `email`, `municipio`, `coop`, `interes`, `comentario`, `pagina`.

### Tarjeta en Planner (objeto `tarea`)

El envío también trae un objeto `tarea`, con el **mismo formato que usa el asistente de WhatsApp**, para que un mismo
flujo de Power Automate cree la tarjeta en los dos casos:

| Campo | Contenido |
| --- | --- |
| `crear` | `true` para personas (clientes); `false` para cooperativas e instaladores, que solo avisan en Teams |
| `accion` | `crear` o `ninguna` |
| `caso` | Número de caso de la web, con el formato `WEB-aammdd-hhmmss` (hora de Puerto Rico) |
| `titulo` | `Llamar a {nombre} · {teléfono} [{caso}]` |
| `descripcion` | Los datos de la solicitud, uno por línea, y el comentario |
| `vence` | Dos días laborables después, a las 5:00 p. m. de Puerto Rico, en ISO UTC (no cuenta feriados) |
| `nota` | Vacío (se usa solo en WhatsApp para agregar notas a una tarjeta existente) |

En el flujo de Power Automate: una **Condición** con `triggerBody()?['tarea']?['crear']` igual a `true`. En la rama
**True**: Planner → **Crear una tarea** (grupo Red Borincana, plan RB Casos, cubo «Nuevos (Para llamar)», título
`triggerBody()?['tarea']?['titulo']`, fecha de entrega `triggerBody()?['tarea']?['vence']`, y el correo de la persona
asignada) y Planner → **Actualizar detalles de la tarea** (descripción `triggerBody()?['tarea']?['descripcion']`).
