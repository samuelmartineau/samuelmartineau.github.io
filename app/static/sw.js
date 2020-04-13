var cacheStorageKey = "samuel-martineau-v3";
var cacheList = [
    "/",
    "/index.html",
    "/style/app.min.css",
    "/js/app.min.js",
    "/images/banner.jpg",
    "/images/utc.jpg",
    "/images/law.jpg",
    "/images/marathon.jpg",
    "/images/arrow.svg",
    "/images/projects/beerpongtournament.jpg",
    "/images/projects/giveittome.jpg",
    "/images/projects/gulp.jpg",
    "/images/projects/website.jpg",
    "/images/projects/merrycrosstmas.jpg",
    "/images/samuelmartineau.jpg"
];

self.addEventListener("install", function (e) {
    console.log("Cache event!");
    e.waitUntil(
        caches
            .open(cacheStorageKey)
            .then(function (cache) {
                console.log("Adding to Cache:", cacheList);
                return cache.addAll(cacheList);
            })
            .then(function () {
                console.log("Skip waiting!");
                return self.skipWaiting();
            })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
