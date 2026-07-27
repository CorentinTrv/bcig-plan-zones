// Stratégie changée : réseau d'abord (network-first), pas cache d'abord.
// Tant qu'il y a du réseau, on prend toujours la dernière version en ligne ;
// le cache ne sert que de secours si le téléphone est hors-ligne.
// skipWaiting + clients.claim : la mise à jour s'applique dès le prochain
// chargement de la page, sans attendre une fermeture complète de l'appli.
var CACHE_NAME = "bcig-zones-v12";
var PRECACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    Promise.all([
      caches.keys().then(function (keys) {
        return Promise.all(
          keys.filter(function (k) { return k !== CACHE_NAME; })
            .map(function (k) { return caches.delete(k); })
        );
      }),
      self.clients.claim()
    ])
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request)
      .then(function (reponse) {
        var copie = reponse.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copie); });
        return reponse;
      })
      .catch(function () {
        return caches.match(event.request);
      })
  );
});
