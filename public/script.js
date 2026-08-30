/* =========================================================
   NEWITT MEDIA
   MASTER JAVASCRIPT
   CLEAN MASTER VERSION
   UPDATE 1 OF 5

   Handles:
   - First-visit intro
   - Mobile navigation
   - Clean page navigation
   - Back to top
   - Smooth anchor scrolling
   - Photography lightbox
   - General lightbox
   - External links
   - Reduced motion
   - Keyboard accessibility
   - Safari / iPhone support
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       SETTINGS
    ====================================================== */

    const INTRO_STORAGE_KEY =
        "newittMediaIntroSeenV2";


    const MOBILE_QUERY =
        "(max-width: 700px)";


    function isMobile() {

        return (
            window.matchMedia &&
            window.matchMedia(
                MOBILE_QUERY
            ).matches
        );

    }


    function prefersReducedMotion() {

        return (
            window.matchMedia &&
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        );

    }


    /* =====================================================
       FIRST VISIT INTRO
    ====================================================== */

    function initFirstVisitIntro() {

        const intro =
            document.getElementById(
                "site-intro"
            );


        if (!intro) {

            return;

        }


        let alreadySeen = false;


        try {

            alreadySeen =
                localStorage.getItem(
                    INTRO_STORAGE_KEY
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
                INTRO_STORAGE_KEY,
                "true"
            );

        } catch (error) {}


        let closed = false;


        const duration =
            prefersReducedMotion()
                ? 0
                : 7500;


        const timer =
            window.setTimeout(
                closeIntro,
                duration
            );


        function handleKey(event) {

            if (
                event.key === "Escape"
            ) {

                closeIntro();

            }

        }


        document.addEventListener(
            "keydown",
            handleKey
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
                timer
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
                handleKey
            );


            if (
                prefersReducedMotion()
            ) {

                document.documentElement.style.overflow =
                    "";

                document.body.style.overflow =
                    "";

                intro.style.display =
                    "none";

                return;

            }


            window.setTimeout(
                function () {

                    document.documentElement.style.overflow =
                        "";

                    document.body.style.overflow =
                        "";

                    intro.style.display =
                        "none";

                },
                950
            );

        }

    }


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

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


        function openMenu() {

            menu.classList.add(
                "open",
                "active",
                "menu-open"
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


        menu.querySelectorAll(
            "a"
        ).forEach(
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
                    event.key === "Escape"
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

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       PAGE NAVIGATION
       
       IMPORTANT:
       No artificial fade overlay is used.
       The browser changes page normally.
       This removes the page-flash problem.
    ====================================================== */

    function initPageNavigation() {

        document
            .querySelectorAll(
                "a[href]"
            )
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function (event) {

                            if (
                                event.defaultPrevented
                            ) {

                                return;

                            }


                            if (
                                event.button !==
                                undefined &&
                                event.button !== 0
                            ) {

                                return;

                            }


                            if (
                                event.ctrlKey ||
                                event.metaKey ||
                                event.shiftKey ||
                                event.altKey
                            ) {

                                return;

                            }


                            const href =
                                link.getAttribute(
                                    "href"
                                );


                            if (!href) {

                                return;

                            }


                            /*
                             * Leave external links,
                             * email, telephone and
                             * JavaScript links alone.
                             */

                            if (
                                href.startsWith(
                                    "http://"
                                ) ||
                                href.startsWith(
                                    "https://"
                                ) ||
                                href.startsWith(
                                    "mailto:"
                                ) ||
                                href.startsWith(
                                    "tel:"
                                ) ||
                                href.startsWith(
                                    "javascript:"
                                )
                            ) {

                                return;

                            }


                            /*
                             * Anchor links stay on
                             * the current page.
                             */

                            if (
                                href.startsWith(
                                    "#"
                                )
                            ) {

                                return;

                            }


                            /*
                             * Do not interfere with
                             * downloads.
                             */

                            if (
                                link.hasAttribute(
                                    "download"
                                )
                            ) {

                                return;

                            }


                            /*
                             * Let the browser perform
                             * normal navigation.
                             *
                             * This is deliberate.
                             * It prevents the black/white
                             * flash caused by the old
                             * overlay system.
                             */

                        }
                    );

                }
            );

    }


    /* =====================================================
       BACK TO TOP
    ====================================================== */

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
            function (event) {

                event.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior:
                        prefersReducedMotion()
                            ? "auto"
                            : "smooth"

                });

            }
        );


        update();

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLLING
    ====================================================== */

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

                            const href =
                                anchor.getAttribute(
                                    "href"
                                );


                            if (
                                !href ||
                                href === "#"
                            ) {

                                return;

                            }


                            const target =
                                document.querySelector(
                                    href
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


                            const position =
                                target.getBoundingClientRect()
                                    .top +
                                window.scrollY -
                                headerHeight -
                                12;


                            window.scrollTo({

                                top:
                                    Math.max(
                                        0,
                                        position
                                    ),

                                behavior:
                                    prefersReducedMotion()
                                        ? "auto"
                                        : "smooth"

                            });

                        }
                    );

                }
            );

    }


    /* =====================================================
       GENERAL LIGHTBOX
    ====================================================== */

    function initLightbox() {

        const items =
            document.querySelectorAll(
                "[data-lightbox]"
            );


        const lightbox =
            document.querySelector(
                ".lightbox"
            );


        if (
            !items.length ||
            !lightbox
        ) {

            return;

        }


        const image =
            lightbox.querySelector(
                "img"
            );


        const close =
            lightbox.querySelector(
                ".lightbox-close"
            );


        if (
            !image ||
            !close
        ) {

            return;

        }


        function open(item) {

            const source =
                item.getAttribute(
                    "data-lightbox"
                );


            if (!source) {

                return;

            }


            image.src =
                source;


            image.alt =
                item.getAttribute(
                    "data-alt"
                ) ||
                "NEWITT Media image";


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


        function closeLightbox() {

            lightbox.classList.remove(
                "active"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            image.src =
                "";


            document.body.style.overflow =
                "";

        }


        items.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        open(item);

                    }
                );

            }
        );


        close.addEventListener(
            "click",
            closeLightbox
        );


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
       PHOTOGRAPHY LIGHTBOX
    ====================================================== */

    function initPhotographyLightbox() {

        const galleryItems =
            document.querySelectorAll(
                ".photography-gallery-item"
            );


        const lightbox =
            document.getElementById(
                "photography-lightbox"
            );


        const image =
            document.getElementById(
                "photography-lightbox-image"
            );


        const close =
            document.getElementById(
                "photography-lightbox-close"
            );


        if (
            !galleryItems.length ||
            !lightbox ||
            !image ||
            !close
        ) {

            return;

        }


        function open(item) {

            const fullImage =
                item.getAttribute(
                    "data-full-image"
                );


            const thumbnail =
                item.querySelector(
                    "img"
                );


            if (!fullImage) {

                return;

            }


            image.src =
                fullImage;


            image.alt =
                thumbnail
                    ? thumbnail.alt
                    : "NEWITT Media Photography image";


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


        function closeLightbox() {

            lightbox.classList.remove(
                "active"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            image.src =
                "";


            document.body.style.overflow =
                "";

        }


        galleryItems.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        open(item);

                    }
                );

            }
        );


        close.addEventListener(
            "click",
            closeLightbox
        );


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
    ====================================================== */

    function initExternalLinks() {

        document
            .querySelectorAll(
                'a[target="_blank"]'
            )
            .forEach(
                function (link) {

                    const rel =
                        link.getAttribute(
                            "rel"
                        ) || "";


                    const values =
                        new Set(
                            rel
                                .split(
                                    /\s+/
                                )
                                .filter(Boolean)
                        );


                    values.add(
                        "noopener"
                    );


                    values.add(
                        "noreferrer"
                    );


                    link.setAttribute(
                        "rel",
                        Array.from(
                            values
                        ).join(" ")
                    );

                }
            );

    }


    /* =====================================================
       SAFARI / IOS VIEWPORT
    ====================================================== */

    function initViewportSupport() {

        const root =
            document.documentElement;


        function updateViewportHeight() {

            if (
                window.visualViewport
            ) {

                root.style.setProperty(
                    "--newitt-vh",
                    (
                        window.visualViewport
                            .height *
                        0.01
                    ) + "px"
                );

            } else {

                root.style.setProperty(
                    "--newitt-vh",
                    (
                        window.innerHeight *
                        0.01
                    ) + "px"
                );

            }

        }


        updateViewportHeight();


        window.addEventListener(
            "resize",
            updateViewportHeight,
            {
                passive: true
            }
        );


        if (
            window.visualViewport
        ) {

            window.visualViewport.addEventListener(
                "resize",
                updateViewportHeight,
                {
                    passive: true
                }
            );

        }

    }


    /* =====================================================
       PAGE VISIBILITY
    ====================================================== */

    function initPageVisibility() {

        document.addEventListener(
            "visibilitychange",
            function () {

                if (
                    document.hidden
                ) {

                    document.body.classList.add(
                        "page-hidden"
                    );

                } else {

                    document.body.classList.remove(
                        "page-hidden"
                    );

                }

            }
        );

    }


    /* =====================================================
       IMAGE SAFETY
    ====================================================== */

    function initImageSafety() {

        document
            .querySelectorAll(
                "img"
            )
            .forEach(
                function (image) {

                    image.addEventListener(
                        "error",
                        function () {

                            image.classList.add(
                                "image-load-error"
                            );

                        }
                    );

                }
            );

    }


    /* =====================================================
       DOM READY
    ====================================================== */

    function init() {

        initFirstVisitIntro();

        initMobileNavigation();

        initPageNavigation();

        initBackToTop();

        initSmoothScrolling();

        initLightbox();

        initPhotographyLightbox();

        initExternalLinks();

        initViewportSupport();

        initPageVisibility();

        initImageSafety();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init,
            {
                once: true
            }
        );

    } else {

        init();

    }


})();
