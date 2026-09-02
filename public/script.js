/* =========================================================
   NEWITT MEDIA
   MASTER JAVASCRIPT
   CLEAN FINAL BUILD
   30 AUGUST 2026

   FUNCTIONS
   - First-visit cinematic intro
   - Mobile navigation
   - Mobile page transition
   - Back to top
   - Smooth anchor scrolling
   - Lightbox
   - Safe external links
   - Mobile micro-flash protection

   DESIGN NOTES
   - Keep original cinematic entry animation
   - No sweeping shine animation
   - No red paranormal mist
   - Preserve existing page structure
========================================================= */


/* =========================================================
   EARLY MOBILE PAGE TRANSITION
   ---------------------------------------------------------
   Runs before DOMContentLoaded so the incoming page is
   covered before the browser can visibly flash it.
========================================================= */

(function () {

    "use strict";


    const TRANSITION_KEY = "newittPageTransition";

    const isMobile =
        window.matchMedia &&
        window.matchMedia("(max-width: 700px)").matches;


    if (!isMobile) {
        return;
    }


    let incoming = false;


    try {

        incoming =
            sessionStorage.getItem(TRANSITION_KEY) === "1";

        sessionStorage.removeItem(TRANSITION_KEY);

    } catch (error) {

        incoming = false;

    }


    if (!incoming) {
        return;
    }


    const transitionStyle =
        document.createElement("style");


    transitionStyle.id =
        "newitt-early-transition-style";


    transitionStyle.textContent = `
        html {
            background: #020305 !important;
            background-color: #020305 !important;
        }

        body {
            background: #020305 !important;
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
            transitionStyle
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
            document.createElement("div");


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


    createOverlay();


    function reveal() {

        const overlay =
            document.getElementById(
                "newitt-early-transition"
            );


        if (!overlay) {
            return;
        }


        overlay.style.transition =
            "opacity 220ms ease";


        overlay.style.opacity =
            "0";


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
            260
        );

    }


    function revealAfterPaint() {

        window.requestAnimationFrame(
            function () {

                window.requestAnimationFrame(
                    reveal
                );

            }
        );

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            revealAfterPaint,
            {
                once: true
            }
        );

    } else {

        revealAfterPaint();

    }

})();


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

            initPageTransition();

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

                event.preventDefault();


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
       MOBILE PAGE TRANSITION
       -----------------------------------------------------
       Handles the outgoing page.

       The early transition at the top of this file handles
       the incoming page before the browser can flash it.
    ===================================================== */

    function initPageTransition() {

        const mobile =
            window.matchMedia(
                "(max-width: 700px)"
            ).matches;


        if (!mobile) {
            return;
        }


        const links =
            document.querySelectorAll(
                "a[href]"
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


                        if (
                            event.button !== 0
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
                         * Leave anchors, email, telephone
                         * and genuine external links alone.
                         */

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


                        /*
                         * Do not interfere with downloads.
                         */

                        if (
                            link.hasAttribute(
                                "download"
                            )
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
                            current ===
                            target
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
                                "newittPageTransition",
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
                                transform: "translateZ(0)",
                                webkitTransform:
                                    "translateZ(0)",
                                willChange: "opacity",
                                transition:
                                    "opacity 180ms ease"
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


                        /*
                         * Force the browser to register the
                         * initial opacity before starting fade.
                         */

                        void overlay.offsetWidth;


                        window.requestAnimationFrame(
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
       Supports both:
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


                                altText =
                                    thumbnail.alt ||
                                    "";

                            }

                        } else {

                            const thumbnail =
                                item.querySelector(
                                    "img"
                                );


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
