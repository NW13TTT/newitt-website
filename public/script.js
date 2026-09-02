/* =========================================================
   NEWITT MEDIA
   MASTER JAVASCRIPT
   STREAMLINED FINAL BUILD
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
========================================================= */


/* =========================================================
   EARLY MOBILE PAGE TRANSITION
   Runs immediately, before DOMContentLoaded.

   This is important because the browser can otherwise
   paint the new document before our normal initialisation.
========================================================= */

(function () {

    "use strict";


    const TRANSITION_KEY =
        "newittPageTransition";


    const isMobile =
        window.matchMedia &&
        window.matchMedia(
            "(max-width: 700px)"
        ).matches;


    /*
     * If we arrived from another NEWITT page,
     * immediately create the black cover.
     */

    if (isMobile) {

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


        if (incoming) {

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

            document.head.appendChild(
                style
            );


            const createOverlay =
                function () {

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

                    document.documentElement
                        .appendChild(
                            overlay
                        );

                };


            /*
             * Create as early as possible.
             */

            if (
                document.documentElement
            ) {

                createOverlay();

            }


            /*
             * Reveal the new page only after
             * the browser has painted it.
             */

            const reveal =
                function () {

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

                            if (
                                overlay.parentNode
                            ) {

                                overlay.parentNode
                                    .removeChild(
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

                                earlyStyle.parentNode
                                    .removeChild(
                                        earlyStyle
                                    );

                            }

                        },
                        260
                    );

                };


            if (
                document.readyState ===
                "loading"
            ) {

                document.addEventListener(
                    "DOMContentLoaded",
                    function () {

                        requestAnimationFrame(
                            function () {

                                requestAnimationFrame(
                                    reveal
                                );

                            }
                        );

                    },
                    {
                        once: true
                    }
                );

            } else {

                requestAnimationFrame(
                    function () {

                        requestAnimationFrame(
                            reveal
                        );

                    }
                );

            }

        }

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


        toggle.addEventListener(
            "click",
            function () {

                const open =
                    !menu.classList.contains(
                        "open"
                    );


                menu.classList.toggle(
                    "open",
                    open
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
       OUTGOING PAGE

       The early transition handles the incoming page.
       This section handles the outgoing page.
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


                        overlay.style.position =
                            "fixed";

                        overlay.style.inset =
                            "0";

                        overlay.style.width =
                            "100%";

                        overlay.style.height =
                            "100%";

                        overlay.style.zIndex =
                            "2147483647";

                        overlay.style.background =
                            "#020305";

                        overlay.style.opacity =
                            "0";

                        overlay.style.pointerEvents =
                            "all";

                        overlay.style.transform =
                            "translateZ(0)";

                        overlay.style.webkitTransform =
                            "translateZ(0)";

                        overlay.style.willChange =
                            "opacity";

                        overlay.style.transition =
                            "opacity 180ms ease";


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
