var cacheStorageKey = "samuel-martineau-v1";
var cacheList = [
    "/",
    "/index.html",
    "/style/app.min.css",
    "/js/app.min.js",
    "/images/banner.jpg",
    "/images/pic01.jpg",
    "/images/pic02.jpg",
    "/images/pic03.jpg",
    "/images/arrow.svg",
    "/images/projects/beerpongtournament.png",
    "/images/projects/giveittome.png",
    "/images/projects/gulp.png",
    "/images/projects/website.png",
    "/images/projects/merrycrosstmas.png",
    "/images/samuelmartineau.jpg"
];

self.addEventListener("install", function(e) {
    console.log("Cache event!");
    e.waitUntil(
        caches
            .open(cacheStorageKey)
            .then(function(cache) {
                console.log("Adding to Cache:", cacheList);
                return cache.addAll(cacheList);
            })
            .then(function() {
                console.log("Skip waiting!");
                return self.skipWaiting();
            })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
