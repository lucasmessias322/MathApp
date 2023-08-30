self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("tabuada-cache").then((cache) => {
      return cache.addAll([
        "/", // Add the paths to your assets
        "/index.html",
        "/soundeffects",
        // ...add other paths
      ]);
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

      // If the resource is not cached, fetch it and cache it
      return fetch(event.request).then((response) => {
        // Clone the response to use it for caching and for serving to the browser
        const clonedResponse = response.clone();

        // Open a cache and put the cloned response in it
        caches.open("tabuada-cache").then((cache) => {
          cache.put(event.request, clonedResponse);
        });

        return response;
      });
    })
  );
});
