const cacheName = "tabuada-cache-v10"; // Atualize a versão ao alterar os ativos

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return fetch("/api/getAllUrls") // Endpoint para obter todas as URLs do seu aplicativo
        .then((response) => response.json())
        .then((urls) => cache.addAll(urls))
        .catch((error) => console.error("Error fetching URLs:", error));
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
    fetch(event.request)
      .then((networkResponse) => {
        // Se houver uma resposta da rede, atualize o cache e retorne a resposta da rede
        if (networkResponse.status === 200) {
          const clonedResponse = networkResponse.clone();
          caches.open(cacheName).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Se não houver resposta da rede, tente servir a partir do cache
        return caches.match(event.request).then((cacheResponse) => {
          if (cacheResponse && cacheResponse.status === 200) {
            return cacheResponse;
          } else {
            // Se não encontrado no cache ou não for uma resposta bem-sucedida, retorne uma resposta de fallback
            return caches.match("/offline.html"); // Forneça uma página de fallback offline
          }
        });
      })
  );
});
