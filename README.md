# Embudo — Sistemas para mayoristas de autopartes

Landing de conversión (estilo VSL) para mayoristas de autopartes. Oferta: importador masivo de catálogos de proveedores, acoplado al ERP/sistema que el cliente ya tiene. Districen como caso de prueba. Sin build ni dependencias: HTML + CSS + JS estáticos.

## Estructura

```
index.html    Landing completa
gracias.html  Página post-reserva (dispara la conversión "Schedule" del Pixel)
styles.css    Estilos
script.js     Configuración (WhatsApp, Cal.com, Meta Pixel) y lógica mínima
assets/       Logo, capturas y video de Districen, favicon
```

## Configurar

Editá el objeto `CONFIG` al inicio de [script.js](script.js):

| Clave             | Qué es                                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `whatsapp`        | Número sin `+` ni espacios. Botón de la sección "Agendá", flotante y página de gracias.                                |
| `whatsappMessage` | Mensaje precargado.                                                                                                    |
| `calLink`         | Parte del link de Cal.com después de `cal.com/`. Ej: `droppitec/videollamada-diagnostico`. Vacío → solo WhatsApp.      |
| `thankYouUrl`     | A dónde redirige después de reservar. Por defecto `gracias.html`.                                                      |
| `metaPixelId`     | ID del Meta Pixel. Vacío → no se carga nada.                                                                           |

### Cal.com

`calLink` tiene que apuntar a un **tipo de evento** reservable (el que muestra el calendario con horarios), no a un "Evento" único con botón "Register". En Cal.com: *Event Types → New* → copiar el link que queda como `cal.com/usuario/slug`.

Recomendado en la configuración del evento:
- Duración 30 min, ubicación Google Meet.
- *Booking questions*: 2-3 preguntas de calificación (¿cuántos clientes mayoristas manejás?, ¿cómo tomás pedidos hoy?).
- *Workflows*: recordatorio por email 24 h y 1 h antes.

### Meta Pixel — eventos que dispara la página

| Evento     | Cuándo                                          | Para qué                                          |
| ---------- | ----------------------------------------------- | ------------------------------------------------- |
| `PageView` | Al cargar cualquier página                      | Audiencias de retargeting.                        |
| `Contact`  | Click en cualquier botón de WhatsApp            | Conversión secundaria.                            |
| `Schedule` | Al llegar a `gracias.html` (después de reservar) | **Conversión principal.** Optimizar la campaña por este evento. |

### Oferta piloto

La sección `#piloto` promete **2 semanas / 3 proveedores con catálogo cargado / devolución del dinero**. Si el plazo real cambia, actualizar ahí y en el paso 03 de "Cómo trabajamos".

### Video de ventas (VSL)

En `index.html`, dentro de `<div class="vsl-wrap">`, reemplazá el `<video>` por el embed de tu VSL (iframe de YouTube/Vimeo/Vturb). Hoy está el video de portada de Districen como placeholder.

## Ver en local

Abrí `index.html` en el navegador, o servilo con `npx serve .` (el embed de Cal.com necesita HTTP, no `file://`).

## Deploy

Es estático: Vercel, Netlify, Cloudflare Pages o GitHub Pages sirven la carpeta tal cual, sin configuración. Recomendado: subdominio tipo `autopartes.droppitec.com`.
