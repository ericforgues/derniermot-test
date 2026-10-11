// Le service worker minimal qu'un navigateur exige avant de proposer l'installation du jeu.
//
// Il ne met rien en cache, volontairement. Le jeu a besoin du réseau de toute façon: c'est le
// serveur qui juge chaque essai et qui fait avancer les manches, et rien ne se joue hors ligne. Un
// cache ne gagnerait donc qu'un démarrage plus rapide, au prix d'une version figée sur l'écran de
// quelqu'un jusqu'à ce qu'il pense à vider ses données, ce que personne ne fait.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
// Un gestionnaire de `fetch` est la condition d'installabilité, pas un cache: celui-ci ne fait que
// laisser passer la navigation.
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') event.respondWith(fetch(event.request));
});
