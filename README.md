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

## Emails de confirmación y aviso (Resend)

Cuando alguien envía el formulario, además de guardarse en Google Sheets, se envían dos correos vía
[Resend](https://resend.com):

- Un correo de **confirmación** a la persona que llenó el formulario.
- Un correo de **aviso** a `redborincana@fundacionborincana.org` con los detalles de la solicitud.

Si `RESEND_API_KEY` no está configurada, el formulario sigue funcionando normalmente (se guarda en el
Google Sheet) pero no se envía ningún correo — el error queda registrado en los logs del servidor, no se
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
