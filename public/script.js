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

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initFirstVisitIntro();

            initMobileNavigation();

            initBackToTop();

            initSmoothScrolling();

            initLightbox();

            initExternalLinks();

        }
    );


    /* =====================================================
       FIRST-VISIT CINEMATIC INTRO

       FINAL STABLE VERSION

       The intro:
       - Plays only on first visit
       - Runs for approximately 7.5 seconds
       - Cannot accidentally be skipped by tapping
       - Can still be skipped with Escape on desktop
       - Fades out smoothly
       - Prevents scrolling while playing
       - Uses localStorage so it does not replay
    ===================================================== */

    function initFirstVisitIntro() {

        const intro =
            document.getElementById(
                "site-intro"
            );


        if (!intro) {
            return;
        }


        /*
         * Versioned storage key.

         * V2 deliberately allows the new cinematic
         * to be tested even if the visitor has already
         * seen the previous intro.
         */

        const INTRO_STORAGE_KEY =
            "newittMediaIntroSeenV2";


        let introAlreadySeen =
            false;


        /* =================================================
           SAFE LOCAL STORAGE CHECK
        ================================================= */

        try {

            introAlreadySeen =
                window.localStorage.getItem(
                    INTRO_STORAGE_KEY
                ) === "true";

        } catch (error) {

            introAlreadySeen =
                false;

        }


        /* =================================================
           RETURNING VISITOR

           Remove the intro immediately.
        ================================================= */

        if (introAlreadySeen) {

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

            return;
        }


        /* =================================================
           FIRST VISIT

           Keep intro visible.
        ================================================= */

        document.body.classList.add(
            "intro-active"
        );


        /*
         * Stop page scrolling while the cinematic
         * intro is playing.
         */

        document.documentElement.style.overflow =
            "hidden";

        document.body.style.overflow =
            "hidden";


        /* =================================================
           MARK INTRO AS SEEN

           This happens immediately so refreshing during
           the intro does not cause it to restart.
        ================================================= */

        try {

            window.localStorage.setItem(
                INTRO_STORAGE_KEY,
                "true"
            );

        } catch (error) {

            /*
             * Storage may be unavailable because of
             * privacy settings.

             * The intro can still operate normally.
             */

        }


        /* =================================================
           CINEMATIC DURATION

           7.5 seconds gives the animation enough time
           to breathe on both desktop and mobile.
        ================================================= */

        const INTRO_DURATION =
            7500;


        const closeTimer =
            window.setTimeout(
                closeIntro,
                INTRO_DURATION
            );


        /* =================================================
           ESCAPE KEY

           Desktop users can skip the intro.
        ================================================= */

        function handleIntroEscape(
            event
        ) {

            if (
                event.key === "Escape"
            ) {

                closeIntro();

            }

        }


        document.addEventListener(
            "keydown",
            handleIntroEscape
        );


        /* =================================================
           CLOSE INTRO

           The intro is NOT closed by a normal tap.

           This is intentional.

           On mobile, accidental touches previously made
           the cinematic disappear almost instantly.
        ================================================= */

        function closeIntro() {

            if (
                intro.classList.contains(
                    "intro-hidden"
                )
            ) {
                return;
            }


            window.clearTimeout(
                closeTimer
            );


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


            document.removeEventListener(
                "keydown",
                handleIntroEscape
            );


            /*
             * Wait until the CSS fade-out has finished
             * before removing the intro from display.
             */

            window.setTimeout(
                function () {

                    document.documentElement.style.overflow =
                        "";

                    document.body.style.overflow =
                        "";

                    intro.style.display =
                        "none";

                },
                1150
            );

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


        /* =================================================
           OPEN / CLOSE MENU
        ================================================= */

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


        /* =================================================
           CLOSE AFTER SELECTING A PAGE
        ================================================= */

        const links =
            navLinks.querySelectorAll(
                "a"
            );


        links.forEach(
            function (link) {

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

            }
        );


        /* =================================================
           CLOSE WHEN TAPPING OUTSIDE
        ================================================= */

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


        /* =================================================
           RESET WHEN RETURNING TO DESKTOP
        ================================================= */

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


        anchors.forEach(
            function (anchor) {

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


                        target.scrollIntoView(
                            {
                                behavior:
                                    "smooth",

                                block:
                                    "start"
                            }
                        );


                        /*
                         * Update the URL without
                         * triggering another jump.
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

            }
        );

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
                    ? lightbox.querySelector(
                        "img"
                    )
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
         * Pages without a master lightbox are allowed
         * to continue normally.
         */

        if (!lightbox) {
            return;
        }


        /* =================================================
           GALLERY ITEMS

           Supports:
           .gallery-item
           [data-lightbox]
        ================================================= */

        const galleryItems =
            document.querySelectorAll(
                ".gallery-item, [data-lightbox]"
            );


        galleryItems.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        let source =
                            item.getAttribute(
                                "data-lightbox"
                            );


                        /*
                         * If no data-lightbox source exists,
                         * use the contained image.
                         */

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

            }
        );


        /* =================================================
           CLOSE LIGHTBOX
        ================================================= */

        function closeLightbox() {

            lightbox.classList.remove(
                "active"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            /*
             * Do not interfere with the cinematic
             * intro's scroll lock.
             */

            if (
                !document.body.classList.contains(
                    "intro-active"
                )
            ) {

                document.body.style.overflow =
                    "";

            }


            if (lightboxImage) {

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


        /* =================================================
           CLOSE BUTTON
        ================================================= */

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    closeLightbox();

                }
            );

        }


        /* =================================================
           CLICK BACKGROUND TO CLOSE
        ================================================= */

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


        /* =================================================
           ESCAPE KEY
        ================================================= */

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


        links.forEach(
            function (link) {

                const url =
                    link.getAttribute(
                        "href"
                    );


                if (!url) {
                    return;
                }


                /*
                 * Internal NEWITT links stay in the
                 * current window.

                 * External social links safely open
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

            }
        );

    }


})();
