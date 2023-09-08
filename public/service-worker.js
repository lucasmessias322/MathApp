// const cacheName = "tabuada-cache-v1"; // Update version when you change assets

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       return cache.addAll([
//         "/", // Add the paths to your assets
//         "/index.html",
//         // ...add other paths
//       ]);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames
//           .filter((name) => name !== cacheName)
//           .map((name) => caches.delete(name))
//       );
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       // If the resource is already cached, return it
//       if (response) {
//         return response;
//       }

//       // If the resource is not cached, try to fetch it
//       return fetch(event.request)
//         .then((networkResponse) => {
//           // Clone the response to use it for caching and for serving to the browser
//           const clonedResponse = networkResponse.clone();

//           // Open the cache and put the cloned response in it
//           caches.open(cacheName).then((cache) => {
//             cache.put(event.request, clonedResponse);
//           });

//           return networkResponse;
//         })
//         .catch(() => {
//           // If fetch fails and there's no cache, return a fallback response
//           return caches.match("/offline.html"); // Provide an offline fallback page
//         });
//     })
//   );
// });

const cacheName = "tabuada-cache-v2"; // Atualize a versão quando você alterar os ativos

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        "/", // Adicione os caminhos para seus ativos
        "/index.html",
        // ... adicione outros caminhos
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
      // Se o recurso já estiver em cache, retorne-o
      if (response) {
        return response;
      }

      // Se o recurso não estiver em cache e for um arquivo de áudio, tente buscá-lo
      if (event.request.url.includes(".mp3")) {
        return fetch(event.request)
          .then((networkResponse) => {
            // Clone a resposta para usá-la no cache e para servir ao navegador
            const clonedResponse = networkResponse.clone();

            // Abra o cache e coloque a resposta clonada nele
            caches.open(cacheName).then((cache) => {
              cache.put(event.request, clonedResponse);
            });

            return networkResponse;
          })
          .catch(() => {
            // Se a busca falhar e não houver cache, retorne uma resposta de fallback
            return caches.match("/offline.html"); // Forneça uma página de fallback offline
          });
      } else {
        // Para outros tipos de solicitações, retorne um fallback offline genérico
        return caches.match("/offline.html");
      }
    })
  );
});
