export function registerPWA() {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('[PWA] Service Worker geregistreerd, scope:', reg.scope);
      })
      .catch((err) => {
        console.error('[PWA] Registratie van Service Worker mislukt:', err);
      });
  });
}
