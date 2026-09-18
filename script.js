// ─── Configuración ────────────────────────────────
// Cambiá estos valores y listo. No hace falta tocar el HTML.
const CONFIG = {
  // Número de WhatsApp sin "+" ni espacios.
  whatsapp: '5493512273833',
  whatsappMessage:
    'Hola Droppitec, soy mayorista de autopartes y quiero agendar una videollamada.',

  // Cal.com: la parte del link después de "cal.com/". Ej: "droppitec/videollamada-diagnostico".
  // Tiene que ser un TIPO DE EVENTO reservable (el que muestra el calendario con horarios),
  // no un "Evento" único con botón "Register".
  // Si queda vacío, se muestra el botón de WhatsApp en la sección "Agendá".
  calLink: 'victor-bouza-hjtba8/videollamada-diagnostico',

  // Página a la que se redirige después de agendar. Ahí se dispara el evento "Schedule" del Pixel.
  thankYouUrl: 'gracias.html',

  // Meta Pixel ID (número largo que aparece en Events Manager). Vacío = no se carga nada.
  metaPixelId: '',
};

// ─── Meta Pixel ───────────────────────────────────
// Carga el Pixel solo si hay ID. Dispara PageView en todas las páginas.
// Los eventos de conversión se disparan más abajo (Contact) y en gracias.html (Schedule).
if (CONFIG.metaPixelId) {
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  fbq('init', CONFIG.metaPixelId);
  fbq('track', 'PageView');
}

// Helper: dispara un evento del Pixel si está cargado. No rompe nada si no lo está.
function track(event, params) {
  if (window.fbq) fbq('track', event, params || {});
}

// ─── WhatsApp ─────────────────────────────────────
const waHref = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
document.querySelectorAll('#wa-link, .wa-float, .js-wa').forEach((a) => {
  a.href = waHref;
  a.addEventListener('click', () => track('Contact', { content_name: 'whatsapp' }));
});

// ─── Calendario (Cal.com) ─────────────────────────
const calEmbed = document.getElementById('cal-embed');
const calFallback = document.getElementById('cal-fallback');

if (calEmbed && CONFIG.calLink) {
  // Snippet oficial de embed de Cal.com.
  /* eslint-disable */
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal; let ar = arguments;
      if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true; }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, 'https://app.cal.com/embed/embed.js', 'init');
  /* eslint-enable */

  Cal('init', { origin: 'https://cal.com' });
  Cal('inline', {
    elementOrSelector: '#cal-embed',
    calLink: CONFIG.calLink,
    layout: 'month_view',
    config: { theme: 'dark' },
  });
  Cal('ui', {
    theme: 'dark',
    styles: { branding: { brandColor: '#4b66f7' } },
    hideEventTypeDetails: false,
  });
  // Al confirmar la reserva, vamos a la página de gracias (ahí se dispara "Schedule").
  Cal('on', {
    action: 'bookingSuccessful',
    callback: () => { window.location.href = CONFIG.thankYouUrl; },
  });

  calEmbed.classList.add('is-active');
  calFallback.classList.add('is-hidden');
}

// ─── Año en el footer ─────────────────────────────
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
