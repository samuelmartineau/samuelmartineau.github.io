/*
	Spectral by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("/sw.js")
            .then(function() {
                // Success
            })
            .catch(function() {
                // Fail :(
            });
    }

    skel.breakpoints({
        xlarge: "(max-width: 1680px)",
        large: "(max-width: 1280px)",
        medium: "(max-width: 980px)",
        small: "(max-width: 736px)",
        xsmall: "(max-width: 480px)"
    });

    $(function() {
        var $window = $(window),
            $body = $("body"),
            $wrapper = $("#page-wrapper"),
            $banner = $("#banner"),
            $header = $("#header");

        // Disable animations/transitions until the page has loaded.
        $body.addClass("is-loading");

        $window.on("load", function() {
            window.setTimeout(function() {
                $body.removeClass("is-loading");
            }, 100);
        });

        // Mobile?
        if (skel.vars.mobile) $body.addClass("is-mobile");
        else
            skel.on("-medium !medium", function() {
                $body.removeClass("is-mobile");
            }).on("+medium", function() {
                $body.addClass("is-mobile");
            });

        // Fix: Placeholder polyfill.
        $("form").placeholder();

        // Prioritize "important" elements on medium.
        skel.on("+medium -medium", function() {
            $.prioritize(
                ".important\\28 medium\\29",
                skel.breakpoint("medium").active
            );
        });

        // Scrolly.
        $(".scrolly").scrolly({
            speed: 1500,
            offset: $header.outerHeight()
        });

        // Header.
        if (skel.vars.IEVersion < 9) $header.removeClass("alt");

        if ($banner.length > 0 && $header.hasClass("alt")) {
            $window.on("resize", function() {
                $window.trigger("scroll");
            });

            $banner.scrollex({
                bottom: $header.outerHeight() + 1,
                terminate: function() {
                    $header.removeClass("alt");
                },
                enter: function() {
                    $header.addClass("alt");
                },
                leave: function() {
                    $header.removeClass("alt");
                }
            });
        }

        new IsoGrid(document.querySelector(".isolayer--deco4"), {
            perspective: 3000,
            transform:
                "translate3d(-50px,-150px,0) scale3d(0.8,0.8,1) rotateY(45deg) rotateZ(-10deg)",
            stackItemsAnimation: {
                properties: function(pos) {
                    return {
                        rotateX: (pos + 1) * -15
                    };
                },
                options: function(pos, itemstotal) {
                    return {
                        type: dynamics.spring,
                        delay: (itemstotal - pos - 1) * 30
                    };
                }
            },
            onGridLoaded: function() {
                classie.add(document.body, "grid-loaded");
            }
        });
    });

    const images = document.querySelectorAll("img[data-js-lazy-image]");
    const config = {
        // If the image gets within 50px in the Y axis, start the download.
        rootMargin: "50px 0px",
        threshold: 0.01
    };
    function preloadImage(image) {
        image.src = image.dataset.src;
    }
    function onIntersection(entries) {
        // Loop through the entries
        entries.forEach(function(entry) {
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
        [].forEach.call(images, function(image) {
            observer.observe(image);
        });
    }
})(jQuery);
