"use strict";

/* =========================================================
   NEWITT MEDIA
   MASTER JAVASCRIPT
   Navigation + Lightbox + Back To Top
   Social Hub Animation
========================================================= */

(() => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menu =
        document.getElementById("main-menu");

    const menuButton =
        document.querySelector(".menu-toggle");

    const backTop =
        document.getElementById("backTop");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function setMenu(open) {

        if (!menu || !menuButton) {
            return;
        }

        menu.classList.toggle(
            "open",
            open
        );

        menuButton.setAttribute(
            "aria-expanded",
            String(open)
        );

        menuButton.setAttribute(
            "aria-label",
            open
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    }


    window.toggleMenu = () => {

        if (!menu) {
            return;
        }

        setMenu(
            !menu.classList.contains("open")
        );

    };


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                window.toggleMenu();

            }
        );

    }


    if (menu) {

        menu.querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        setMenu(false);

                    }
                );

            });

    }


    document.addEventListener(
        "click",
        event => {

            if (
                !menu ||
                !menuButton ||
                !menu.classList.contains("open")
            ) {
                return;
            }

            if (
                !menu.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                setMenu(false);

            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 800) {

                setMenu(false);

            }

        }
    );


    /* =====================================================
       INTERNAL SMOOTH LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const id =
                    link.getAttribute("href");

                if (
                    !id ||
                    id === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(id);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior:
                        window.matchMedia(
                            "(prefers-reduced-motion: reduce)"
                        ).matches
                            ? "auto"
                            : "smooth",
                    block:
                        "start"
                });

                setMenu(false);

            }
        );

    });


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    function closeLightbox() {

        const lightbox =
            document.getElementById(
                "lightbox"
            );

        const image =
            document.getElementById(
                "lightboxImage"
            );


        if (lightbox) {

            lightbox.classList.remove(
                "open"
            );

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        if (image) {

            image.removeAttribute(
                "src"
            );

            image.alt = "";

        }


        document.body.style.overflow =
            "";

    }


    document.querySelectorAll(
        ".gallery-link"
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const lightbox =
                    document.getElementById(
                        "lightbox"
                    );

                const image =
                    document.getElementById(
                        "lightboxImage"
                    );


                if (
                    !lightbox ||
                    !image
                ) {
                    return;
                }


                const source =
                    link.getAttribute(
                        "href"
                    );


                if (!source) {
                    return;
                }


                event.preventDefault();


                const thumbnail =
                    link.querySelector(
                        "img"
                    );


                image.src =
                    source;

                image.alt =
                    thumbnail?.alt ||
                    "Gallery image";


                lightbox.classList.add(
                    "open"
                );

                lightbox.setAttribute(
                    "aria-hidden",
                    "false"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    });


    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    const lightbox =
        document.getElementById(
            "lightbox"
        );


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                setMenu(false);

                closeLightbox();

            }

        }
    );


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    if (backTop) {

        const updateBackTop =
            () => {

                backTop.classList.toggle(
                    "show",
                    window.scrollY > 500
                );

            };


        window.addEventListener(
            "scroll",
            updateBackTop,
            {
                passive: true
            }
        );


        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top:
                        0,

                    behavior:
                        window.matchMedia(
                            "(prefers-reduced-motion: reduce)"
                        ).matches
                            ? "auto"
                            : "smooth"

                });

            }
        );


        updateBackTop();

    }


    /* =====================================================
       SOCIAL HUB
       SLOW SPOOKY PARANORMAL LOGO MOVEMENT
       CONTINUOUS LOOP
    ===================================================== */

    const paranormalLogo =
        document.querySelector(
            ".paranormal-social .social-logo-wrap img"
        );


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        paranormalLogo &&
        !reducedMotion
    ) {

        let rotation =
            0;

        let direction =
            1;

        let nextChange =
            performance.now() +
            2500;


        const animateParanormalLogo =
            now => {

                /*
                   Very slow movement.

                   The direction changes occasionally,
                   rather than constantly, creating the
                   slow unpredictable spooky movement.
                */

                if (
                    now >=
                    nextChange
                ) {

                    direction *=
                        -1;

                    nextChange =
                        now +
                        (
                            2200 +
                            Math.random() * 3000
                        );

                }


                rotation +=
                    direction *
                    0.018;


                if (
                    rotation > 5
                ) {

                    rotation =
                        5;

                    direction =
                        -1;

                }


                if (
                    rotation < -5
                ) {

                    rotation =
                        -5;

                    direction =
                        1;

                }


                paranormalLogo.style.transform =
                    `rotate(${rotation}deg)`;


                requestAnimationFrame(
                    animateParanormalLogo
                );

            };


        requestAnimationFrame(
            animateParanormalLogo
        );

    }


    /* =====================================================
       SOCIAL HUB
       SUBTLE AMBIENT LIGHT EFFECT
    ===================================================== */

    const socialHub =
        document.querySelector(
            ".social-hub"
        );


    if (
        socialHub &&
        !reducedMotion
    ) {

        let pulseTimer =
            null;


        const ambientPulse =
            () => {

                socialHub.classList.add(
                    "ambient-pulse"
                );


                window.setTimeout(
                    () => {

                        socialHub.classList.remove(
                            "ambient-pulse"
                        );

                    },
                    650
                );


                pulseTimer =
                    window.setTimeout(
                        ambientPulse,
                        7000 +
                        Math.random() * 9000
                    );

            };


        pulseTimer =
            window.setTimeout(
                ambientPulse,
                5000 +
                Math.random() * 5000
            );


        window.addEventListener(
            "pagehide",
            () => {

                if (pulseTimer) {

                    window.clearTimeout(
                        pulseTimer
                    );

                }

            }
        );

    }


    /* =====================================================
       IMAGE PERFORMANCE
    ===================================================== */

    document.querySelectorAll(
        "img"
    ).forEach(
        (image, index) => {

            image.decoding =
                "async";


            /*
               Do not override an intentional loading
               attribute already written into the HTML.
            */

            if (index === 0) {

                image.loading =
                    "eager";

                image.setAttribute(
                    "fetchpriority",
                    "high"
                );

            } else {

                if (
                    !image.hasAttribute(
                        "loading"
                    )
                ) {

                    image.loading =
                        "lazy";

                }

                /*
                   Gallery images that are deliberately
                   marked eager remain eager.
                */

                if (
                    image.loading !==
                    "eager"
                ) {

                    image.setAttribute(
                        "fetchpriority",
                        "low"
                    );

                }

            }

        }
    );


    /* =====================================================
       CLOSE MOBILE MENU WHEN ESCAPING
    ===================================================== */

    window.addEventListener(
        "orientationchange",
        () => {

            if (
                window.innerWidth >
                800
            ) {

                setMenu(false);

            }

        }
    );


})();
