// const cacheName = "tabuada-cache-v8"; // Update version when you change assets

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
//     // Check if the user is online
//     fetch(event.request)
//       .then((networkResponse) => {
//         // If there's a network response, update the cache and return the network response
//         const clonedResponse = networkResponse.clone();
//         caches.open(cacheName).then((cache) => {
//           cache.put(event.request, clonedResponse);
//         });
//         return networkResponse;
//       })
//       .catch(() => {
//         // If there's no network response, try to serve from cache
//         return caches.match(event.request).then((cacheResponse) => {
//           if (cacheResponse) {
//             return cacheResponse;
//           } else {
//             // If not found in cache, return a fallback response
//             return caches.match("/offline.html"); // Provide an offline fallback page
//           }
//         });
//       })
//   );
// });

// // self.addEventListener("fetch", (event) => {
// //   event.respondWith(
// //     caches.match(event.request).then((response) => {
// //       // If the resource is already cached, return it
// //       if (response) {
// //         return response;
// //       }

// //       // If the resource is not cached, try to fetch it
// //       return fetch(event.request)
// //         .then((networkResponse) => {
// //           // Clone the response to use it for caching and for serving to the browser
// //           const clonedResponse = networkResponse.clone();

// //           // Open the cache and put the cloned response in it
// //           caches.open(cacheName).then((cache) => {
// //             cache.put(event.request, clonedResponse);
// //           });

// //           return networkResponse;
// //         })
// //         .catch(() => {
// //           // If fetch fails and there's no cache, return a fallback response
// //           return caches.match("/offline.html"); // Provide an offline fallback page
// //         });
// //     })
// //   );
// // });
