const cacheName = "tabuada-cache-v4"; // Update version when you change assets

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        "/", // Add the paths to your assets
        "/index.html",
        // ...add other paths
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== cacheName)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If the resource is already cached, return it
      if (response) {
        return response;
      }

      // If the resource is not cached, try to fetch it
      return fetch(event.request)
        .then((networkResponse) => {
          // Clone the response to use it for caching and for serving to the browser
          const clonedResponse = networkResponse.clone();

          // Open the cache and put the cloned response in it
          caches.open(cacheName).then((cache) => {
            cache.put(event.request, clonedResponse);
          });

          return networkResponse;
        })
        .catch(() => {
          // If fetch fails and there's no cache, return a fallback response
          return caches.match("/offline.html"); // Provide an offline fallback page
        });
    })
  );
});
