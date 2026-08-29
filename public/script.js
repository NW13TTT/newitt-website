/* =========================================================
   NEWITT MEDIA
   MASTER JAVASCRIPT
   FINAL PROFESSIONAL BUILD
   VERSION: 29 AUGUST 2026
   CINEMATIC INTRO TIMING UPDATE

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

       The intro appears only on the first visit.

       The sequence is deliberately longer so the branding
       has time to appear properly before the intro closes.

       Timing:
       0.00s  Intro begins
       0.35s  Logo begins
       1.65s  NEWITT MEDIA appears
       2.65s  Gold line appears
       3.05s  Tagline appears
       7.30s  Intro closes
    ===================================================== */

    function initFirstVisitIntro() {

        const intro =
            document.getElementById("site-intro");


        if (!intro) {
            return;
        }


        const INTRO_STORAGE_KEY =
            "newittMediaIntroSeen";


        const INTRO_DURATION =
            7300;


        let introAlreadySeen =
            false;


        /* -------------------------------------------------
           SAFELY CHECK LOCAL STORAGE
        ------------------------------------------------- */

        try {

            introAlreadySeen =
                window.localStorage.getItem(
                    INTRO_STORAGE_KEY
                ) === "true";

        } catch (error) {

            introAlreadySeen = false;

        }


        /* -------------------------------------------------
           RETURNING VISITOR
        ------------------------------------------------- */

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


        /* -------------------------------------------------
           FIRST VISIT
        ------------------------------------------------- */

        document.body.classList.add(
            "intro-active"
        );


        /* -------------------------------------------------
           PREVENT PAGE SCROLLING
        ------------------------------------------------- */

        document.documentElement.style.overflow =
            "hidden";

        document.body.style.overflow =
            "hidden";


        /* -------------------------------------------------
           MARK INTRO AS SEEN

           This happens immediately.

           Refreshing the page will therefore not replay
           the cinematic intro.
        ------------------------------------------------- */

        try {

            window.localStorage.setItem(
                INTRO_STORAGE_KEY,
                "true"
            );

        } catch (error) {

            /*
             * Storage unavailable.
             * Continue normally.
             */

        }


        /* -------------------------------------------------
           AUTOMATIC CLOSE

           IMPORTANT:
           This now matches the 7.3 second CSS sequence.
        ------------------------------------------------- */

        const introTimer =
            window.setTimeout(
                function () {

                    closeIntro();

                },
                INTRO_DURATION
            );


        /* -------------------------------------------------
           TAP TO SKIP

           The visitor can still skip the intro if desired.
        ------------------------------------------------- */

        intro.addEventListener(
            "click",
            function () {

                closeIntro();

            }
        );


        /* -------------------------------------------------
           ESCAPE TO SKIP
        ------------------------------------------------- */

        function handleIntroEscape(event) {

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


        /* -------------------------------------------------
           CLOSE INTRO
        ------------------------------------------------- */

        function closeIntro() {

            if (
                intro.classList.contains(
                    "intro-hidden"
                )
            ) {

                return;

            }


            /*
             * Stop the automatic timer if the visitor
             * manually skips the intro.
             */

            window.clearTimeout(
                introTimer
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
             * Wait for the CSS fade-out to finish before
             * removing the intro from the display.
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
                850
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


        /* -------------------------------------------------
           CLOSE MENU WHEN LINK SELECTED
        ------------------------------------------------- */

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


        /* -------------------------------------------------
           CLOSE WHEN CLICKING OUTSIDE
        ------------------------------------------------- */

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


        /* -------------------------------------------------
           CLOSE WHEN RETURNING TO DESKTOP
        ------------------------------------------------- */

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
                window.scrollY > 450
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


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });


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


        if (!lightbox) {

            return;

        }


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
