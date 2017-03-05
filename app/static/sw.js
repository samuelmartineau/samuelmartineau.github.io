var paths = [
  '/',
  '/style/app.min.css',
  '/js/app.min.js',
  '/index.html',
  '/images/banner.jpg',
  '/images/pic01.jpg',
  '/images/pic02.jpg',
  '/images/pic03.jpg',
  '/images/arrow.svg',
  '/images/project/beerpongtournament.png',
  '/images/project/giveittome.png',
  '/images/project/gulp.png',
  '/images/project/me.png',
  '/images/project/merrycrosstmas.png'
];

caches.open('offline-v1').then(function(cache) {
  return cache.addAll(paths);
})
