/* =========================================================
   NEWITT MEDIA
   MASTER JAVASCRIPT
   STREAMLINED FINAL BUILD
   29 AUGUST 2026

   FUNCTIONS
   - First-visit cinematic intro
   - Mobile navigation
   - Mobile page transition
   - Back to top
   - Smooth anchor scrolling
   - Lightbox
   - Safe external links
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       DOM READY
    ===================================================== */

    document.addEventListener("DOMContentLoaded", function () {

        initFirstVisitIntro();
        initMobileNavigation();
        initPageTransition();
        initBackToTop();
        initSmoothScrolling();
        initLightbox();
        initExternalLinks();

    });


    /* =====================================================
       FIRST-VISIT CINEMATIC INTRO

       - First visit only
       - 7.5 seconds
       - No accidental mobile tap skip
       - Escape can skip
       - Uses localStorage
    ===================================================== */

    function initFirstVisitIntro() {

        const intro =
            document.getElementById("site-intro");

        if (!intro) {
            return;
        }

        const STORAGE_KEY =
            "newittMediaIntroSeenV2";

        let alreadySeen = false;

        try {

            alreadySeen =
                localStorage.getItem(STORAGE_KEY) === "true";

        } catch (error) {

            alreadySeen = false;

        }


        /* Returning visitor */

        if (alreadySeen) {

            intro.classList.add("intro-hidden");

            intro.setAttribute(
                "aria-hidden",
                "true"
            );

            return;

        }


        /* First visit */

        document.body.classList.add(
            "intro-active"
        );

        document.documentElement.style.overflow =
            "hidden";

        document.body.style.overflow =
            "hidden";


        try {

            localStorage.setItem(
                STORAGE_KEY,
                "true"
            );

        } catch (error) {

            /* Storage unavailable */

        }


        const INTRO_DURATION = 7500;

        const closeTimer =
            window.setTimeout(
                closeIntro,
                INTRO_DURATION
            );


        function handleEscape(event) {

            if (event.key === "Escape") {
                closeIntro();
            }

        }


        document.addEventListener(
            "keydown",
            handleEscape
        );


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
                handleEscape
            );


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

        const toggle =
            document.querySelector(
                ".menu-toggle"
            );

        const menu =
            document.querySelector(
                ".nav-links"
            );

        if (!toggle || !menu) {
            return;
        }


        function closeMenu() {

            menu.classList.remove(
                "open",
                "active",
                "menu-open"
            );

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            toggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }


        toggle.addEventListener(
            "click",
            function () {

                const open =
                    menu.classList.toggle(
                        "open"
                    );

                menu.classList.toggle(
                    "active",
                    open
                );

                menu.classList.toggle(
                    "menu-open",
                    open
                );

                toggle.setAttribute(
                    "aria-expanded",
                    String(open)
                );

                toggle.setAttribute(
                    "aria-label",
                    open
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );

            }
        );


        menu.querySelectorAll("a").forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            }
        );


        document.addEventListener(
            "click",
            function (event) {

                if (
                    !menu.contains(event.target) &&
                    !toggle.contains(event.target)
                ) {
                    closeMenu();
                }

            }
        );


        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth > 700
                ) {
                    closeMenu();
                }

            }
        );

    }


    /* =====================================================
       MOBILE PAGE TRANSITION
       FINAL MICRO-FLASH FIX

       Only intercepts normal internal page links
       on mobile devices.
    ===================================================== */

    function initPageTransition() {

        const transition =
            document.getElementById(
                "page-transition"
            );

        if (!transition) {
            return;
        }


        const links =
            document.querySelectorAll(
                'a[href$=".html"], a[href="index.html"], a[href="/"]'
            );


        links.forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    if (
                        event.defaultPrevented ||
                        event.ctrlKey ||
                        event.metaKey ||
                        event.shiftKey ||
                        event.altKey
                    ) {
                        return;
                    }


                    if (
                        window.innerWidth > 700
                    ) {
                        return;
                    }


                    const href =
                        link.getAttribute("href");


                    if (!href) {
                        return;
                    }


                    if (
                        href.startsWith("#") ||
                        href.startsWith("mailto:") ||
                        href.startsWith("tel:") ||
                        href.startsWith("http://") ||
                        href.startsWith("https://")
                    ) {
                        return;
                    }


                    event.preventDefault();


                    transition.classList.add(
                        "active"
                    );


                    requestAnimationFrame(
                        function () {

                            requestAnimationFrame(
                                function () {

                                    window.location.assign(
                                        href
                                    );

                                }
                            );

                        }
                    );

                }
            );

        });

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function initBackToTop() {

        const button =
            document.getElementById(
                "back-to-top"
            );

        if (!button) {
            return;
        }


        function update() {

            const visible =
                window.scrollY > 450;

            button.classList.toggle(
                "visible",
                visible
            );

            button.classList.toggle(
                "show",
                visible
            );

            button.classList.toggle(
                "is-visible",
                visible
            );

        }


        window.addEventListener(
            "scroll",
            update,
            {
                passive: true
            }
        );


        update();

    }


    /* =====================================================
       SMOOTH INTERNAL SCROLLING
    ===================================================== */

    function initSmoothScrolling() {

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const id =
                            link.getAttribute(
                                "href"
                            );

                        if (
                            !id ||
                            id === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                id
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

                            history.replaceState(
                                null,
                                "",
                                id
                            );

                        } catch (error) {

                            /* Ignore */

                        }

                    }
                );

            });

    }


    /* =====================================================
       LIGHTBOX
       Supports:
       - .gallery-item
       - [data-lightbox]
    ===================================================== */

    function initLightbox() {

        const lightbox =
            document.getElementById(
                "lightbox"
            );

        if (!lightbox) {
            return;
        }


        const image =
            document.getElementById(
                "lightbox-image"
            ) ||
            lightbox.querySelector("img");


        const close =
            document.getElementById(
                "lightbox-close"
            ) ||
            lightbox.querySelector(
                ".lightbox-close"
            );


        const items =
            document.querySelectorAll(
                ".gallery-item, [data-lightbox]"
            );


        function closeLightbox() {

            lightbox.classList.remove(
                "active"
            );

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            if (
                !document.body.classList.contains(
                    "intro-active"
                )
            ) {
                document.body.style.overflow =
                    "";
            }


            if (image) {

                window.setTimeout(
                    function () {

                        if (
                            !lightbox.classList.contains(
                                "active"
                            )
                        ) {

                            image.removeAttribute(
                                "src"
                            );

                        }

                    },
                    250
                );

            }

        }


        items.forEach(function (item) {

            item.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    let source =
                        item.getAttribute(
                            "data-lightbox"
                        );


                    if (!source) {

                        const thumbnail =
                            item.querySelector(
                                "img"
                            );

                        if (thumbnail) {
                            source =
                                thumbnail.getAttribute(
                                    "src"
                                );
                        }

                    }


                    if (
                        !source ||
                        !image
                    ) {
                        return;
                    }


                    image.src =
                        source;


                    const thumbnail =
                        item.querySelector(
                            "img"
                        );

                    image.alt =
                        thumbnail
                            ? thumbnail.alt || ""
                            : "";


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


        if (close) {

            close.addEventListener(
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
       EXTERNAL LINKS
       External websites automatically open safely
       in a new tab.
    ===================================================== */

    function initExternalLinks() {

        document
            .querySelectorAll(
                'a[href^="http://"], a[href^="https://"]'
            )
            .forEach(function (link) {

                const href =
                    link.getAttribute(
                        "href"
                    );

                if (!href) {
                    return;
                }


                try {

                    const url =
                        new URL(
                            href,
                            window.location.href
                        );


                    if (
                        url.hostname !==
                        window.location.hostname
                    ) {

                        link.target =
                            "_blank";

                        link.rel =
                            "noopener noreferrer";

                    }

                } catch (error) {

                    /* Ignore malformed URLs */

                }

            });

    }


})();
