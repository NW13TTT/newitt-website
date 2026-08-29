/* =========================================================
   NEWITT MEDIA
   MASTER JAVASCRIPT
   FINAL PROFESSIONAL BUILD
   VERSION: 29 AUGUST 2026

   FUNCTIONS:
   1. First-visit cinematic intro
   2. Mobile navigation
   3. Back-to-top button
   4. Smooth anchor scrolling
   5. Lightbox support
   6. Safe iframe / embed handling
   7. Accessibility improvements
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       DOM READY
    ===================================================== */

    document.addEventListener("DOMContentLoaded", function () {

        initFirstVisitIntro();

        initMobileNavigation();

        initBackToTop();

        initSmoothScrolling();

        initLightbox();

        initExternalLinks();

    });


    /* =====================================================
       FIRST-VISIT CINEMATIC INTRO

       The intro appears only the first time a visitor
       arrives at NEWITT Media.

       Once completed, a localStorage flag is saved.

       If storage is unavailable, the intro still works
       normally for that visit.
    ===================================================== */

    function initFirstVisitIntro() {

        const intro = document.getElementById("site-intro");

        if (!intro) {
            return;
        }


        const INTRO_STORAGE_KEY = "newittMediaIntroSeen";

        let introAlreadySeen = false;


        /*
         * Safely check localStorage.
         *
         * Some browsers / privacy settings can prevent
         * storage access, so this must never break the site.
         */

        try {

            introAlreadySeen =
                window.localStorage.getItem(
                    INTRO_STORAGE_KEY
                ) === "true";

        } catch (error) {

            introAlreadySeen = false;

        }


        /*
         * Returning visitor:
         * remove the intro immediately.
         */

        if (introAlreadySeen) {

            intro.classList.add("intro-hidden");

            intro.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "intro-active"
            );

            return;
        }


        /*
         * First visit:
         * keep the intro visible.
         */

        document.body.classList.add(
            "intro-active"
        );


        /*
         * Prevent scrolling while the cinematic intro
         * is playing.
         */

        document.documentElement.style.overflow =
            "hidden";

        document.body.style.overflow =
            "hidden";


        /*
         * Mark the intro as seen immediately.

         * This means that if the visitor refreshes after
         * seeing the intro, it will not replay.
         */

        try {

            window.localStorage.setItem(
                INTRO_STORAGE_KEY,
                "true"
            );

        } catch (error) {

            /*
             * Storage unavailable.
             * Nothing else needs to happen.
             */

        }


        /*
         * Give the animation enough time to establish
         * the NEWITT Media brand before disappearing.
         */

        const INTRO_DURATION = 5200;


        window.setTimeout(function () {

            closeIntro();

        }, INTRO_DURATION);


        /*
         * Allow the user to skip the intro by tapping it.
         * Useful on mobile.
         */

        intro.addEventListener(
            "click",
            closeIntro
        );


        /*
         * Also allow Escape to skip it.
         */

        document.addEventListener(
            "keydown",
            function handleIntroEscape(event) {

                if (event.key === "Escape") {

                    closeIntro();

                    document.removeEventListener(
                        "keydown",
                        handleIntroEscape
                    );

                }

            }
        );


        function closeIntro() {

            if (
                intro.classList.contains(
                    "intro-hidden"
                )
            ) {
                return;
            }


            intro.classList.add(
                "intro-hidden"
            );


            intro.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "intro-active"
            );


            /*
             * Restore normal scrolling after the
             * fade-out has completed.
             */

            window.setTimeout(function () {

                document.documentElement.style.overflow =
                    "";

                document.body.style.overflow =
                    "";

                intro.style.display =
                    "none";

            }, 950);

        }

    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    function initMobileNavigation() {

        const menuToggle =
            document.querySelector(
                ".menu-toggle"
            );

        const navLinks =
            document.querySelector(
                ".nav-links"
            );


        if (
            !menuToggle ||
            !navLinks
        ) {
            return;
        }


        menuToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    navLinks.classList.contains(
                        "open"
                    );


                navLinks.classList.toggle(
                    "open",
                    !isOpen
                );


                navLinks.classList.toggle(
                    "active",
                    !isOpen
                );


                navLinks.classList.toggle(
                    "menu-open",
                    !isOpen
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );


                menuToggle.setAttribute(
                    "aria-label",
                    !isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );

            }
        );


        /*
         * Close mobile menu when a navigation link
         * is selected.
         */

        const links =
            navLinks.querySelectorAll(
                "a"
            );


        links.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

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
            );

        });


        /*
         * Close the menu if the visitor taps outside it.
         */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !navLinks.contains(
                        event.target
                    ) &&
                    !menuToggle.contains(
                        event.target
                    )
                ) {

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

            }
        );


        /*
         * Close the mobile menu when resizing back
         * to desktop.
         */

        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth > 700
                ) {

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

            }
        );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function initBackToTop() {

        const backToTop =
            document.getElementById(
                "back-to-top"
            );


        if (!backToTop) {
            return;
        }


        function updateBackToTop() {

            if (
                window.scrollY >
                450
            ) {

                backToTop.classList.add(
                    "visible"
                );

                backToTop.classList.add(
                    "show"
                );

                backToTop.classList.add(
                    "is-visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );

                backToTop.classList.remove(
                    "show"
                );

                backToTop.classList.remove(
                    "is-visible"
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

    }


    /* =====================================================
       SMOOTH INTERNAL SCROLLING
    ===================================================== */

    function initSmoothScrolling() {

        const anchors =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        anchors.forEach(function (anchor) {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        anchor.getAttribute(
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


                    target.scrollIntoView({
                        behavior:
                            "smooth",
                        block:
                            "start"
                    });


                    /*
                     * Update URL without causing
                     * another page jump.
                     */

                    try {

                        window.history.replaceState(
                            null,
                            "",
                            targetId
                        );

                    } catch (error) {

                        /*
                         * Ignore history errors.
                         */

                    }

                }
            );

        });

    }


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    function initLightbox() {

        const lightbox =
            document.getElementById(
                "lightbox"
            );


        const lightboxImage =
            document.getElementById(
                "lightbox-image"
            ) ||
            (
                lightbox
                    ? lightbox.querySelector("img")
                    : null
            );


        const closeButton =
            document.getElementById(
                "lightbox-close"
            ) ||
            (
                lightbox
                    ? lightbox.querySelector(
                        ".lightbox-close"
                    )
                    : null
            );


        /*
         * Some pages may not contain a lightbox.
         * That is completely fine.
         */

        if (!lightbox) {
            return;
        }


        /*
         * Gallery images.

         * Supports:
         * .gallery-item
         * .gallery-item img
         * [data-lightbox]
         */

        const galleryItems =
            document.querySelectorAll(
                ".gallery-item, [data-lightbox]"
            );


        galleryItems.forEach(function (item) {

            item.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    let source =
                        item.getAttribute(
                            "data-lightbox"
                        );


                    if (!source) {

                        const image =
                            item.querySelector(
                                "img"
                            );


                        if (image) {

                            source =
                                image.getAttribute(
                                    "src"
                                );

                        }

                    }


                    if (
                        !source ||
                        !lightboxImage
                    ) {
                        return;
                    }


                    lightboxImage.src =
                        source;


                    const imageAlt =
                        item.querySelector(
                            "img"
                        );


                    if (imageAlt) {

                        lightboxImage.alt =
                            imageAlt.alt || "";

                    }


                    lightbox.classList.add(
                        "active"
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


        function closeLightbox() {

            lightbox.classList.remove(
                "active"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow =
                "";


            if (lightboxImage) {

                /*
                 * Clear the image after closing.
                 * This prevents unnecessary memory use.
                 */

                window.setTimeout(
                    function () {

                        if (
                            !lightbox.classList.contains(
                                "active"
                            )
                        ) {

                            lightboxImage.removeAttribute(
                                "src"
                            );

                        }

                    },
                    250
                );

            }

        }


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    closeLightbox();

                }
            );

        }


        /*
         * Clicking the dark background closes
         * the lightbox.
         */

        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );


        /*
         * Escape closes the lightbox.
         */

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
       EXTERNAL LINKS
    ===================================================== */

    function initExternalLinks() {

        const links =
            document.querySelectorAll(
                'a[href^="http://"], a[href^="https://"]'
            );


        links.forEach(function (link) {

            const url =
                link.getAttribute(
                    "href"
                );


            if (!url) {
                return;
            }


            /*
             * Keep NEWITT Media internal links in the
             * current window.

             * External social/media links open safely
             * in a new tab.
             */

            try {

                const linkUrl =
                    new URL(
                        url,
                        window.location.href
                    );


                if (
                    linkUrl.hostname !==
                    window.location.hostname
                ) {

                    link.target =
                        "_blank";


                    link.rel =
                        "noopener noreferrer";

                }

            } catch (error) {

                /*
                 * Ignore malformed URLs.
                 */

            }

        });

    }


})();
