/* =========================================================
   NEWITT MEDIA
   MASTER JAVASCRIPT
   FINAL WEBSITE BUILD
   VERSION: 29 AUGUST 2026
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       DOM READY
    ====================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initialiseMobileMenu();

            initialiseSmoothLinks();

            initialiseBackToTop();

            initialiseLightbox();

            initialiseImagePerformance();

            initialiseCinematicIntro();

            initialiseSocialEffects();

        }
    );


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
                            link.getAttribute("href");


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


                        const header =
                            document.querySelector(
                                ".site-header"
                            );


                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        const targetTop =
                            target
                                .getBoundingClientRect()
                                .top +
                            window.scrollY -
                            headerHeight -
                            12;


                        const reducedMotion =
                            window.matchMedia(
                                "(prefers-reduced-motion: reduce)"
                            ).matches;


                        window.scrollTo({

                            top:
                                Math.max(
                                    0,
                                    targetTop
                                ),

                            behavior:
                                reducedMotion
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


        window.addEventListener(
            "load",
            updateBackToTop
        );


        updateBackToTop();


        backToTop.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const reducedMotion =
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches;


                window.scrollTo({

                    top: 0,

                    behavior:
                        reducedMotion
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
                document.createElement("div");


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


        if (
            !lightboxImage ||
            !closeButton
        ) {
            return;
        }


        let previousOverflow = "";

        let previousFocus = null;


        function openLightbox(
            imageSource,
            imageAlt,
            trigger
        ) {

            if (!imageSource) {
                return;
            }


            previousFocus =
                trigger ||
                document.activeElement;


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


            if (
                previousFocus &&
                typeof previousFocus.focus ===
                    "function"
            ) {

                try {

                    previousFocus.focus();

                } catch (error) {

                    /* Focus restoration is optional. */

                }

            }

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
                                    ? (
                                        image.currentSrc ||
                                        image.src
                                    )
                                    : ""
                            );


                        const alt =
                            image
                                ? image.alt
                                : "";


                        openLightbox(
                            source,
                            alt,
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
            document.querySelectorAll("img");


        images.forEach(
            function (image) {

                if (
                    !image.hasAttribute("decoding")
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
                    !image.hasAttribute("loading")
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
       PLAYS ON EVERY VISIT
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
         * The cinematic intro intentionally
         * plays on EVERY visit.
         *
         * There is NO localStorage check,
         * cookie check or "already seen"
         * condition.
         */


        /*
         * Establish the opening state.
         */

        intro.classList.remove(
            "intro-hidden"
        );


        intro.style.opacity =
            "1";


        intro.style.visibility =
            "visible";


        intro.style.pointerEvents =
            "auto";


        /*
         * Force browser reflow so the opening
         * animation starts correctly every time.
         */

        void intro.offsetWidth;


        /*
         * Full cinematic opening.
         *
         * Normal:
         * approximately 5.2 seconds.
         *
         * Reduced motion:
         * approximately 1.2 seconds.
         */

        const displayTime =
            reducedMotion
                ? 1200
                : 5200;


        window.setTimeout(
            function () {

                if (!intro) {
                    return;
                }


                /*
                 * Begin cinematic fade-out.
                 */

                intro.classList.add(
                    "intro-hidden"
                );


                /*
                 * Remove the intro from the page
                 * after the fade has completed.
                 */

                window.setTimeout(
                    function () {

                        if (
                            intro &&
                            intro.parentNode
                        ) {

                            intro.remove();

                        }

                    },
                    reducedMotion
                        ? 100
                        : 850
                );

            },
            displayTime
        );

    }


    /* =====================================================
       SOCIAL EFFECTS
       
       IMPORTANT:
       The cinematic social artwork is controlled
       by CSS. JavaScript must NOT continuously
       alter its opacity, transform or position.
       
       This prevents the artwork and animation
       fighting each other.
    ====================================================== */

    function initialiseSocialEffects() {

        const socialHub =
            document.querySelector(
                ".social-hub"
            );


        if (!socialHub) {
            return;
        }


        /*
         * Remove any legacy inline transform
         * from an older version of the website.
         */

        const masterFrame =
            socialHub.querySelector(
                ".social-master-frame"
            );


        if (masterFrame) {

            masterFrame.style.removeProperty(
                "transform"
            );

            masterFrame.style.removeProperty(
                "translate"
            );

            masterFrame.style.removeProperty(
                "opacity"
            );

        }


        /*
         * The current social artwork uses
         * CSS animation only.
         *
         * No requestAnimationFrame loop.
         * No JavaScript opacity pulsing.
         * No JavaScript movement.
         */

    }


    /* =====================================================
       PUBLIC MENU FUNCTION
       
       Kept for compatibility with older HTML
       or previous versions of the website.
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
