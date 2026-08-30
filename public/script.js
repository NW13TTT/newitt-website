/* =========================================================
   NEWITT MEDIA
   MASTER JAVASCRIPT
   NEWITT MEDIA 2.0
   PASS 1B - SHARED FOUNDATION
   30 AUGUST 2026

   FUNCTIONS
   - First-visit cinematic intro
   - Mobile navigation
   - Mobile page transitions
   - Back to top
   - Smooth anchor scrolling
   - Lightbox
   - Safe external links
   - Reduced-motion support
   - Keyboard accessibility
   - Safari / iPhone resilience
   - NEWITT Media language-system compatibility
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       MASTER SETTINGS
    ====================================================== */

    const TRANSITION_KEY =
        "newittPageTransition";


    const INTRO_STORAGE_KEY =
        "newittMediaIntroSeenV2";


    const MOBILE_QUERY =
        "(max-width: 700px)";


    const isMobile =
        function () {

            return (
                window.matchMedia &&
                window.matchMedia(
                    MOBILE_QUERY
                ).matches
            );

        };


    const prefersReducedMotion =
        function () {

            return (
                window.matchMedia &&
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
            );

        };


    /* =====================================================
       EARLY MOBILE PAGE TRANSITION
       
       This runs before the main DOM-ready initialisation.
       It prevents a bright flash while the next page loads.
    ====================================================== */

    (function earlyMobileTransition() {

        if (!isMobile()) {
            return;
        }


        let incoming = false;


        try {

            incoming =
                sessionStorage.getItem(
                    TRANSITION_KEY
                ) === "1";


            sessionStorage.removeItem(
                TRANSITION_KEY
            );

        } catch (error) {

            incoming = false;

        }


        if (!incoming) {
            return;
        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "newitt-early-transition-style";


        style.textContent = `
            html {
                background: #020305 !important;
                background-color: #020305 !important;
            }

            body {
                background-color: #020305 !important;
            }

            #newitt-early-transition {
                position: fixed;
                inset: 0;
                width: 100%;
                height: 100%;
                z-index: 2147483647;
                background: #020305;
                opacity: 1;
                pointer-events: all;
                transform: translateZ(0);
                -webkit-transform: translateZ(0);
                will-change: opacity;
            }
        `;


        if (document.head) {

            document.head.appendChild(
                style
            );

        }


        function createOverlay() {

            if (
                document.getElementById(
                    "newitt-early-transition"
                )
            ) {

                return;

            }


            const overlay =
                document.createElement(
                    "div"
                );


            overlay.id =
                "newitt-early-transition";


            overlay.setAttribute(
                "aria-hidden",
                "true"
            );


            if (document.documentElement) {

                document.documentElement.appendChild(
                    overlay
                );

            }

        }


        function removeOverlay() {

            const overlay =
                document.getElementById(
                    "newitt-early-transition"
                );


            if (!overlay) {
                return;
            }


            if (prefersReducedMotion()) {

                overlay.style.transition =
                    "none";

                overlay.style.opacity =
                    "0";

            } else {

                overlay.style.transition =
                    "opacity 220ms ease";

                overlay.style.opacity =
                    "0";

            }


            window.setTimeout(
                function () {

                    if (overlay.parentNode) {

                        overlay.parentNode.removeChild(
                            overlay
                        );

                    }


                    const earlyStyle =
                        document.getElementById(
                            "newitt-early-transition-style"
                        );


                    if (
                        earlyStyle &&
                        earlyStyle.parentNode
                    ) {

                        earlyStyle.parentNode.removeChild(
                            earlyStyle
                        );

                    }

                },
                prefersReducedMotion()
                    ? 0
                    : 260
            );

        }


        createOverlay();


        const reveal =
            function () {

                if (prefersReducedMotion()) {

                    removeOverlay();

                    return;

                }


                requestAnimationFrame(
                    function () {

                        requestAnimationFrame(
                            removeOverlay
                        );

                    }
                );

            };


        if (
            document.readyState ===
            "loading"
        ) {

            document.addEventListener(
                "DOMContentLoaded",
                reveal,
                {
                    once: true
                }
            );

        } else {

            reveal();

        }

    })();


    /* =====================================================
       DOM READY
    ====================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initFirstVisitIntro();

            initMobileNavigation();

            initPageTransition();

            initBackToTop();

            initSmoothScrolling();

            initLightbox();

            initPhotographyLightbox();

            initExternalLinks();

        }
    );


    /* =====================================================
       FIRST-VISIT CINEMATIC INTRO
       
       The intro appears only once on the device/browser.
       Escape or tapping the intro closes it immediately.
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
                event.key === "Escape"
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


            if (prefersReducedMotion()) {

                document.documentElement
                    .style
                    .overflow = "";


                document.body
                    .style
                    .overflow = "";


                intro.style.display =
                    "none";


                return;

            }


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
            function () {

                const open =
                    menu.classList.contains(
                        "open"
                    );


                if (open) {

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
       MOBILE PAGE TRANSITION
    ====================================================== */

    function initPageTransition() {

        if (!isMobile()) {
            return;
        }


        const links =
            document.querySelectorAll(
                'a[href$=".html"], a[href="index.html"], a[href="/"]'
            );


        links.forEach(
            function (link) {

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


                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (!href) {
                            return;
                        }


                        if (
                            href.startsWith("#") ||
                            href.startsWith("mailto:") ||
                            href.startsWith("tel:") ||
                            href.startsWith("http://") ||
                            href.startsWith("https://") ||
                            href.startsWith("javascript:")
                        ) {

                            return;

                        }


                        const current =
                            window.location.pathname
                                .split("/")
                                .pop() ||
                            "index.html";


                        const target =
                            href
                                .split("#")[0]
                                .split("?")[0]
                                .split("/")
                                .pop() ||
                            "index.html";


                        if (
                            current === target
                        ) {

                            return;

                        }


                        if (
                            document.body.dataset
                                .newittNavigating ===
                            "true"
                        ) {

                            event.preventDefault();

                            return;

                        }


                        event.preventDefault();


                        document.body.dataset
                            .newittNavigating =
                            "true";


                        try {

                            sessionStorage.setItem(
                                TRANSITION_KEY,
                                "1"
                            );

                        } catch (error) {}


                        const overlay =
                            document.createElement(
                                "div"
                            );


                        overlay.id =
                            "newitt-transition-overlay";


                        overlay.setAttribute(
                            "aria-hidden",
                            "true"
                        );


                        Object.assign(
                            overlay.style,
                            {
                                position: "fixed",
                                inset: "0",
                                width: "100%",
                                height: "100%",
                                zIndex: "2147483647",
                                background: "#020305",
                                opacity: "0",
                                pointerEvents: "all",
                                transform:
                                    "translateZ(0)",
                                webkitTransform:
                                    "translateZ(0)",
                                willChange:
                                    "opacity",
                                transition:
                                    prefersReducedMotion()
                                        ? "none"
                                        : "opacity 180ms ease"
                            }
                        );


                        document.body.appendChild(
                            overlay
                        );


                        document.documentElement
                            .style
                            .overflow =
                            "hidden";


                        document.body
                            .style
                            .overflow =
                            "hidden";


                        if (
                            prefersReducedMotion()
                        ) {

                            overlay.style.opacity =
                                "1";


                            window.location.href =
                                href;


                            return;

                        }


                        void overlay.offsetWidth;


                        requestAnimationFrame(
                            function () {

                                overlay.style.opacity =
                                    "1";


                                window.setTimeout(
                                    function () {

                                        window.location.href =
                                            href;

                                    },
                                    180
                                );

                            }
                        );

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

                                behavior:
                                    prefersReducedMotion()
                                        ? "auto"
                                        : "smooth",

                                block:
                                    "start"

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
       MASTER LIGHTBOX
       
       Supports:
       .gallery-item
       [data-lightbox]
    ====================================================== */

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


        if (
            !image ||
            !items.length
        ) {

            return;

        }


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

                if (
                    prefersReducedMotion()
                ) {

                    image.removeAttribute(
                        "src"
                    );

                } else {

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


                        if (!source) {

                            source =
                                item.getAttribute(
                                    "data-full-image"
                                );

                        }


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


                        if (!source) {
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
       PHOTOGRAPHY LIGHTBOX
       
       Dedicated engine used by photography.html.
       
       It remains dormant while the photography gallery
       contains no .photography-gallery-item elements.
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


        const lightboxImage =
            document.getElementById(
                "photography-lightbox-image"
            );


        const closeButton =
            document.getElementById(
                "photography-lightbox-close"
            );


        if (
            !galleryItems.length ||
            !lightbox ||
            !lightboxImage ||
            !closeButton
        ) {

            return;

        }


        function openLightbox(item) {

            const image =
                item.getAttribute(
                    "data-full-image"
                );


            const thumbnail =
                item.querySelector(
                    "img"
                );


            if (!image) {
                return;
            }


            lightboxImage.src =
                image;


            lightboxImage.alt =
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


            document.body.style.overflow =
                "";


            if (
                prefersReducedMotion()
            ) {

                lightboxImage.src =
                    "";

            } else {

                window.setTimeout(
                    function () {

                        if (
                            !lightbox.classList.contains(
                                "active"
                            )
                        ) {

                            lightboxImage.src =
                                "";

                        }

                    },
                    250
                );

            }

        }


        galleryItems.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        openLightbox(
                            item
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
       
       External websites open safely in a new tab.
       Internal NEWITT Media pages remain same-tab.
    ====================================================== */

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


    /* =====================================================
       BROWSER BACK / FORWARD RESILIENCE
    ====================================================== */

    window.addEventListener(
        "pageshow",
        function (event) {

            if (event.persisted) {

                document.body.dataset
                    .newittNavigating =
                    "false";


                document.documentElement
                    .style
                    .overflow = "";


                document.body
                    .style
                    .overflow = "";


                const overlay =
                    document.getElementById(
                        "newitt-transition-overlay"
                    );


                if (overlay) {

                    overlay.remove();

                }


                const earlyOverlay =
                    document.getElementById(
                        "newitt-early-transition"
                    );


                if (earlyOverlay) {

                    earlyOverlay.remove();

                }

            }

        }
    );


    /* =====================================================
       SAFARI / IOS VISIBILITY RESILIENCE
       
       If the page returns from the background, remove
       accidental navigation locks.
    ====================================================== */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                document.visibilityState ===
                "visible"
            ) {

                if (
                    document.body.dataset
                        .newittNavigating ===
                    "true"
                ) {

                    /*
                     * Do not remove the flag during an
                     * active transition unless the page
                     * has actually returned to visibility.
                     */

                    window.setTimeout(
                        function () {

                            if (
                                document.visibilityState ===
                                "visible"
                            ) {

                                document.body.dataset
                                    .newittNavigating =
                                    "false";

                            }

                        },
                        500
                    );

                }

            }

        }
    );


    /* =====================================================
       LANGUAGE SYSTEM COMPATIBILITY
       
       language.js owns the actual language switching.
       
       This script deliberately does NOT modify:
       - data-lang-en
       - data-lang-cy
       - data-lang
       - localStorage language values
       
       This prevents two master systems from fighting.
    ====================================================== */

    window.addEventListener(
        "newittLanguageChanged",
        function () {

            /*
             * Recalculate accessibility-sensitive
             * navigation labels if the language system
             * has changed them.
             */

            const toggle =
                document.querySelector(
                    ".menu-toggle"
                );


            if (!toggle) {
                return;
            }


            const menu =
                document.querySelector(
                    ".nav-links"
                );


            if (!menu) {
                return;
            }


            const expanded =
                menu.classList.contains(
                    "open"
                );


            if (expanded) {

                /*
                 * language.js remains the owner of the
                 * translated aria labels.
                 *
                 * No hard-coded language replacement
                 * is performed here.
                 */

                return;

            }

        }
    );


})();
