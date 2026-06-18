const STATIC_CACHE = 'ep-static-v3';
const DYNAMIC_CACHE = 'ep-dynamic-v3';

const SHELL_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(SHELL_URLS)),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== STATIC_CACHE && k !== DYNAMIC_CACHE)
          .map((k) => caches.delete(k)),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Stale-while-revalidate for navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request).then((response) => {
          const cloned = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, cloned));
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      }),
    );
    return;
  }

  // Cache-first for static assets (JS, CSS, images, fonts)
  if (
    url.origin === self.location.origin &&
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?)$/)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((response) => {
        const cloned = response.clone();
        caches.open(STATIC_CACHE).then((cache) => cache.put(request, cloned));
        return response;
      })),
    );
    return;
  }

  // Network-first for API-like requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, cloned));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || new Response(JSON.stringify({ error: 'Offline' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }))),
    );
    return;
  }

  // Default: network-first with offline fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        const cloned = response.clone();
        caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, cloned));
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || new Response('Offline', { status: 503 }))),
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.payload;
    if (Array.isArray(urls)) {
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(urls));
    }
  }
});
