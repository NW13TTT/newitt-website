/* =========================================================
   NEWITT MEDIA
   MASTER JAVASCRIPT
========================================================= */

(function () {
    "use strict";


    /* =====================================================
       DOM READY
    ====================================================== */

    document.addEventListener("DOMContentLoaded", function () {

        initialiseMobileMenu();
        initialiseSmoothLinks();
        initialiseBackToTop();
        initialiseLightbox();
        initialiseImagePerformance();
        initialiseCinematicIntro();
        initialiseSocialEffects();

    });


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    function initialiseMobileMenu() {

        const menuToggle =
            document.querySelector(".menu-toggle");

        const navLinks =
            document.querySelector(".nav-links");

        if (!menuToggle || !navLinks) {
            return;
        }


        function closeMenu() {

            navLinks.classList.remove(
                "open",
                "active",
                "menu-open"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }


        function openMenu() {

            navLinks.classList.add("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        }


        menuToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    menuToggle.getAttribute(
                        "aria-expanded"
                    ) === "true";

                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }

            }
        );


        navLinks.addEventListener(
            "click",
            function (event) {

                const link =
                    event.target.closest("a");

                if (!link) {
                    return;
                }

                closeMenu();

            }
        );


        document.addEventListener(
            "click",
            function (event) {

                if (
                    navLinks.classList.contains("open") &&
                    !navLinks.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {

                    closeMenu();

                }

            }
        );


        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 700) {
                    closeMenu();
                }

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {
                    closeMenu();
                }

            }
        );

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ====================================================== */

    function initialiseSmoothLinks() {

        const links =
            document.querySelectorAll(
                'a[href^="#"]'
            );

        links.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );

                        if (
                            !targetId ||
                            targetId === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                targetId
                            );

                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        const header =
                            document.querySelector(
                                ".site-header"
                            );

                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        const targetTop =
                            target.getBoundingClientRect().top +
                            window.scrollY -
                            headerHeight -
                            12;


                        window.scrollTo({

                            top: Math.max(
                                0,
                                targetTop
                            ),

                            behavior:
                                window.matchMedia(
                                    "(prefers-reduced-motion: reduce)"
                                ).matches
                                    ? "auto"
                                    : "smooth"

                        });

                    }
                );

            }
        );

    }


    /* =====================================================
       BACK TO TOP
    ====================================================== */

    function initialiseBackToTop() {

        const backToTop =
            document.querySelector(
                "#back-to-top"
            );

        if (!backToTop) {
            return;
        }


        function updateBackToTop() {

            if (window.scrollY > 420) {

                backToTop.classList.add(
                    "visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateBackToTop,
            {
                passive: true
            }
        );


        updateBackToTop();


        backToTop.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                window.scrollTo({

                    top: 0,

                    behavior:
                        window.matchMedia(
                            "(prefers-reduced-motion: reduce)"
                        ).matches
                            ? "auto"
                            : "smooth"

                });

            }
        );

    }


    /* =====================================================
       LIGHTBOX
    ====================================================== */

    function initialiseLightbox() {

        const galleryItems =
            document.querySelectorAll(
                "[data-lightbox]"
            );

        if (!galleryItems.length) {
            return;
        }


        let lightbox =
            document.querySelector(
                "#lightbox"
            );


        if (!lightbox) {

            lightbox =
                document.createElement(
                    "div"
                );

            lightbox.id =
                "lightbox";

            lightbox.className =
                "lightbox";

            lightbox.setAttribute(
                "role",
                "dialog"
            );

            lightbox.setAttribute(
                "aria-modal",
                "true"
            );

            lightbox.setAttribute(
                "aria-label",
                "Image viewer"
            );


            lightbox.innerHTML = `

                <button
                    type="button"
                    class="lightbox-close"
                    id="lightbox-close"
                    aria-label="Close image viewer"
                >
                    ×
                </button>

                <img
                    id="lightbox-image"
                    src=""
                    alt=""
                >

            `;


            document.body.appendChild(
                lightbox
            );

        }


        const lightboxImage =
            lightbox.querySelector(
                "#lightbox-image"
            );

        const closeButton =
            lightbox.querySelector(
                "#lightbox-close"
            );


        let previousOverflow = "";


        function openLightbox(
            imageSource,
            imageAlt
        ) {

            if (!imageSource) {
                return;
            }


            lightboxImage.src =
                imageSource;

            lightboxImage.alt =
                imageAlt || "";


            previousOverflow =
                document.body.style.overflow;


            document.body.style.overflow =
                "hidden";


            lightbox.classList.add(
                "active"
            );


            closeButton.focus();

        }


        function closeLightbox() {

            lightbox.classList.remove(
                "active"
            );


            document.body.style.overflow =
                previousOverflow;


            window.setTimeout(
                function () {

                    if (
                        !lightbox.classList.contains(
                            "active"
                        )
                    ) {

                        lightboxImage.src = "";

                        lightboxImage.alt = "";

                    }

                },
                250
            );

        }


        galleryItems.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        const image =
                            item.querySelector(
                                "img"
                            );


                        const source =
                            item.getAttribute(
                                "data-image"
                            ) ||
                            (
                                image
                                    ? image.currentSrc ||
                                      image.src
                                    : ""
                            );


                        const alt =
                            image
                                ? image.alt
                                : "";


                        openLightbox(
                            source,
                            alt
                        );

                    }
                );

            }
        );


        closeButton.addEventListener(
            "click",
            closeLightbox
        );


        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    lightbox.classList.contains(
                        "active"
                    )
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       IMAGE PERFORMANCE
    ====================================================== */

    function initialiseImagePerformance() {

        const images =
            document.querySelectorAll(
                "img"
            );


        images.forEach(
            function (image) {

                if (
                    !image.hasAttribute(
                        "decoding"
                    )
                ) {

                    image.setAttribute(
                        "decoding",
                        "async"
                    );

                }


                const isLogo =
                    image.classList.contains(
                        "intro-logo"
                    ) ||
                    image.classList.contains(
                        "hero-logo"
                    ) ||
                    image.classList.contains(
                        "page-logo"
                    ) ||
                    image.classList.contains(
                        "footer-logo"
                    );


                if (
                    !isLogo &&
                    !image.hasAttribute(
                        "loading"
                    )
                ) {

                    image.setAttribute(
                        "loading",
                        "lazy"
                    );

                }

            }
        );

    }


    /* =====================================================
       CINEMATIC INTRO
       
       FIRST VISIT ONLY
    ====================================================== */

    function initialiseCinematicIntro() {

        const intro =
            document.querySelector(
                "#site-intro"
            );

        if (!intro) {
            return;
        }


        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        /*
         * This flag remembers that the visitor has
         * already experienced the NEWITT Media intro.
         *
         * The intro therefore:
         *
         * FIRST VISIT:
         * Plays normally.
         *
         * REFRESH:
         * Does not play again.
         *
         * MOVING BETWEEN PAGES:
         * Does not play again.
         *
         * CLOSING AND REOPENING BROWSER:
         * Does not play again.
         *
         * CLEARING WEBSITE DATA:
         * Allows it to play again.
         */

        const introKey =
            "newittMediaCinematicIntroSeen";


        let alreadySeen = false;


        try {

            alreadySeen =
                localStorage.getItem(
                    introKey
                ) === "true";

        } catch (error) {

            alreadySeen = false;

        }


        /*
         * Visitor has already seen the intro.
         * Remove it immediately.
         */

        if (alreadySeen) {

            intro.remove();

            return;

        }


        /*
         * Mark the intro as seen immediately.
         *
         * This prevents another page load from
         * triggering the cinematic sequence again.
         */

        try {

            localStorage.setItem(
                introKey,
                "true"
            );

        } catch (error) {

            /*
             * Some browsers/private browsing modes
             * may restrict storage.
             *
             * The intro will still complete normally.
             */

        }


        /*
         * Five seconds gives the cinematic sequence
         * enough time to breathe without making the
         * visitor wait unnecessarily.
         */

        const duration =
            reducedMotion
                ? 900
                : 5000;


        window.setTimeout(
            function () {

                intro.classList.add(
                    "intro-hidden"
                );


                window.setTimeout(
                    function () {

                        intro.remove();

                    },
                    reducedMotion
                        ? 50
                        : 750
                );

            },
            duration
        );

    }


    /* =====================================================
       SOCIAL MEDIA HUB ATMOSPHERE
    ====================================================== */

    function initialiseSocialEffects() {

        const socialHub =
            document.querySelector(
                ".social-hub"
            );

        if (!socialHub) {
            return;
        }


        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (reducedMotion) {
            return;
        }


        const skyline =
            socialHub.querySelector(
                ".social-lightning"
            );


        const paranormal =
            socialHub.querySelector(
                ".social-paranormal-glow"
            );


        let lastTime = 0;


        function animate(
            timestamp
        ) {

            if (
                timestamp - lastTime <
                50
            ) {

                window.requestAnimationFrame(
                    animate
                );

                return;

            }


            lastTime =
                timestamp;


            const time =
                timestamp / 1000;


            /*
             * Skyline electrical atmosphere
             */

            if (skyline) {

                const pulse =
                    0.45 +
                    Math.sin(
                        time * 1.7
                    ) *
                    0.12;


                skyline.style.opacity =
                    pulse.toFixed(3);

            }


            /*
             * Paranormal atmosphere
             */

            if (paranormal) {

                const pulse =
                    0.38 +
                    Math.sin(
                        time * 1.15 +
                        1.5
                    ) *
                    0.18;


                paranormal.style.opacity =
                    pulse.toFixed(3);

            }


            window.requestAnimationFrame(
                animate
            );

        }


        window.requestAnimationFrame(
            animate
        );

    }


    /* =====================================================
       PUBLIC TOGGLE FUNCTION
       
       Kept for compatibility with existing HTML.
    ====================================================== */

    window.toggleMenu =
        function () {

            const menuToggle =
                document.querySelector(
                    ".menu-toggle"
                );


            if (!menuToggle) {
                return;
            }


            menuToggle.click();

        };


})();
