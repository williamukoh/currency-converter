const cacheName = "my-cache-v1"

self.addEventListener('install', function(event) {

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/about.html',
        '/assets/js/build.js',
        '/assets/css/build.min.css',
        '/assets/fonts/bliss/bliss-regular-webfont.eot',
        '/assets/fonts/bliss/bliss-regular-webfont.svg',
        '/assets/fonts/bliss/bliss-regular-webfont.ttf',
        '/assets/fonts/bliss/bliss-regular-webfont.woff'
      ]);
    })
  );

});

self.addEventListener('fetch', (event) => {

  if (event.request.method === 'GET') {

    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          return caches.open(cacheName).then((cache) => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
    );

  }

});
