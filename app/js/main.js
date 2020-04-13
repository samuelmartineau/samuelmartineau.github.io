function scrollAnchors(e) {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
    e.preventDefault();
    var targetID = e.target.getAttribute('href');
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
    const checkIfDone = setInterval(function () {
        const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
        if (distanceToTop(targetAnchor) === 0 || atBottom) {
            targetAnchor.tabIndex = '-1';
            targetAnchor.focus();
            window.history.pushState('', '', targetID);
            clearInterval(checkIfDone);
        }
    }, 100);
}

document.getElementById('more').addEventListener('click', function (evt) {
    ga('send', 'event', { eventCategory: 'Learn More', eventAction: 'Click' });
    scrollAnchors(evt)
})

window.addEventListener('load', () => {
    setTimeout(() => {
        ga('send', 'event', { eventCategory: '30 seconds on page', eventAction: 'Read' })
    }, 3e4)
    let runned = false;

    window.addEventListener('scroll', function (e) {
        if (document.body.scrollTop >= 2e3 && true == runned) {
            ga("send", "event", { eventCategory: "Scrolled 2000px", eventAction: "Scroll" });
            runned = true;
        }
    });

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("/sw.js")
            .then(function () {
                // Success
            })
            .catch(function () {
                // Fail :(
            });
    }

    const $body = document.querySelector("body");

    // Disable animations/transitions until the page has loaded.
    $body.classList.add("is-loading");


    window.setTimeout(function () {
        $body.classList.remove("is-loading");
    }, 100);

    const images = document.querySelectorAll("img[data-js-lazy-image]");
    const config = {
        // If the image gets within 50px in the Y axis, start the download.
        rootMargin: "50px 0px",
        threshold: 0.01
    };
    let observer;
    function preloadImage(image) {
        image.src = image.dataset.src;
    }
    function onIntersection(entries) {
        // Loop through the entries
        entries.forEach(function (entry) {
            // Are we in viewport?
            if (entry.intersectionRatio > 0) {
                // Stop watching and load the image
                observer.unobserve(entry.target);
                preloadImage(entry.target);
            }
        });
    }

    if (!("IntersectionObserver" in window)) {
        [].forEach.call(images, preloadImage);
    } else {
        // It is supported, load the images
        observer = new IntersectionObserver(onIntersection, config);
        [].forEach.call(images, function (image) {
            observer.observe(image);
        });
    }
})