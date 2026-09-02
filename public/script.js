/* =========================================================
   NEWITT MEDIA
   MASTER JAVASCRIPT
   CLEAN FINAL BUILD
   SEPTEMBER 2026

   FUNCTIONS
   - First-visit cinematic intro
   - Mobile navigation
   - Normal page-to-page navigation
   - Back to top
   - Smooth anchor scrolling
   - Lightbox
   - Safe external links

   DESIGN NOTES
   - Keep original cinematic entry animation
   - No sweeping shine animation
   - No red paranormal mist
   - Preserve existing page structure
========================================================= */


/* =========================================================
   MAIN NEWITT MEDIA SCRIPT
========================================================= */

(function () {

    "use strict";


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
       -----------------------------------------------------
       The original NEWITT cinematic entrance is retained.
       It appears once per browser/device storage and can
       still be skipped with Escape or a tap.
    ===================================================== */

    function initFirstVisitIntro() {

        const intro =
            document.getElementById(
                "site-intro"
            );


        if (!intro) {
            return;
        }


        const STORAGE_KEY =
            "newittMediaIntroSeenV2";


        let alreadySeen = false;


        try {

            alreadySeen =
                localStorage.getItem(
                    STORAGE_KEY
                ) === "true";

        } catch (error) {

            alreadySeen = false;

        }


        if (alreadySeen) {

            intro.classList.add(
                "intro-hidden"
            );


            intro.setAttribute(
                "aria-hidden",
                "true"
            );


            intro.style.display =
                "none";


            return;

        }


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

        } catch (error) {}


        const INTRO_DURATION =
            7500;


        let closed = false;


        const closeTimer =
            window.setTimeout(
                closeIntro,
                INTRO_DURATION
            );


        function handleEscape(event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeIntro();

            }

        }


        document.addEventListener(
            "keydown",
            handleEscape
        );


        intro.addEventListener(
            "click",
            closeIntro
        );


        function closeIntro() {

            if (closed) {
                return;
            }


            closed = true;


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

                    document.documentElement
                        .style
                        .overflow = "";


                    document.body
                        .style
                        .overflow = "";


                    intro.style.display =
                        "none";

                },
                950
            );

        }

    }


    /* =====================================================
       MOBILE NAVIGATION
       -----------------------------------------------------
       Uses the existing .menu-toggle and .nav-links
       structure used throughout the NEWITT pages.
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


        if (
            !toggle ||
            !menu
        ) {

            return;

        }


        function closeMenu() {

            menu.classList.remove(
                "open",
                "active",
                "menu-open",
                "is-open"
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


        function openMenu() {

            menu.classList.add(
                "open",
                "active",
                "menu-open",
                "is-open"
            );


            toggle.setAttribute(
                "aria-expanded",
                "true"
            );


            toggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        }


        toggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                const isOpen =
                    menu.classList.contains(
                        "open"
                    );


                if (isOpen) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );


        menu.querySelectorAll("a")
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            closeMenu();

                        }
                    );

                }
            );


        document.addEventListener(
            "click",
            function (event) {

                if (
                    !menu.contains(
                        event.target
                    ) &&
                    !toggle.contains(
                        event.target
                    )
                ) {

                    closeMenu();

                }

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeMenu();

                }

            }
        );


        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth >
                    700
                ) {

                    closeMenu();

                }

            }
        );

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
                window.scrollY >
                450;


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


        button.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


        update();

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLLING
       -----------------------------------------------------
       Only handles links beginning with #.
       Normal page links such as:
       skyline.html
       paranormal.html
       photography.html
       contact.html

       are NOT intercepted.
    ===================================================== */

    function initSmoothScrolling() {

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
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


                            let target = null;


                            try {

                                target =
                                    document.querySelector(
                                        targetId
                                    );

                            } catch (error) {

                                return;

                            }


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
                                    targetId
                                );

                            } catch (error) {}

                        }
                    );

                }
            );

    }


    /* =====================================================
       LIGHTBOX
       -----------------------------------------------------
       Supports:
       .gallery-item
       [data-lightbox]
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
            lightbox.querySelector(
                "img"
            );


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


            document.body.style.overflow =
                "";


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


        function openLightbox(
            source,
            altText
        ) {

            if (
                !source ||
                !image
            ) {

                return;

            }


            image.src =
                source;


            image.alt =
                altText || "";


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


        items.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        let source =
                            item.getAttribute(
                                "data-lightbox"
                            );


                        let altText = "";


                        const thumbnail =
                            item.querySelector(
                                "img"
                            );


                        if (!source) {

                            if (thumbnail) {

                                source =
                                    thumbnail.getAttribute(
                                        "src"
                                    );


                                altText =
                                    thumbnail.alt ||
                                    "";

                            }

                        } else {

                            if (thumbnail) {

                                altText =
                                    thumbnail.alt ||
                                    "";

                            }

                        }


                        openLightbox(
                            source,
                            altText
                        );

                    }
                );

            }
        );


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
       -----------------------------------------------------
       External social links open safely in a new tab.
       Internal NEWITT pages remain in the same tab.
    ===================================================== */

    function initExternalLinks() {

        document
            .querySelectorAll(
                'a[href^="http://"], a[href^="https://"]'
            )
            .forEach(
                function (link) {

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

                    } catch (error) {}

                }
            );

    }


})();
