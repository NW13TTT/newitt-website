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
            document.querySelector(
                ".menu-toggle"
            );

        const navLinks =
            document.querySelector(
                ".nav-links"
            );

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

            navLinks.classList.add(
                "open"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        }


        /*
         * Make sure the menu starts in a
         * predictable closed state.
         */

        closeMenu();


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
                    event.target.closest(
                        "a"
                    );


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
                    navLinks.classList.contains(
                        "open"
                    ) &&
                    !navLinks.contains(
                        event.target
                    ) &&
                    !menuToggle.contains(
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
                    window.innerWidth > 700
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
                            link.getAttribute(
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

            const shouldShow =
                window.scrollY >
                420;


            if (shouldShow) {

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
                document.createElement(
                    "div"
                );


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


        let previousOverflow =
            "";


        let previousFocus =
            null;


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

                        lightboxImage.src =
                            "";

                        lightboxImage.alt =
                            "";

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

                    /*
                     * Ignore focus restoration
                     * errors.
                     */

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
       IMAGE PERFORMANCE
    ====================================================== */

    function initialiseImagePerformance() {

        const images =
            document.querySelectorAll(
                "img"
            );


        images.forEach(
            function (image) {

                if (
                    !image.hasAttribute(
                        "decoding"
                    )
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
                    !image.hasAttribute(
                        "loading"
                    )
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
       
       FIRST VISIT ONLY
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


        const introKey =
            "newittMediaCinematicIntroSeen";


        let alreadySeen =
            false;


        try {

            alreadySeen =
                localStorage.getItem(
                    introKey
                ) === "true";

        } catch (error) {

            alreadySeen =
                false;

        }


        /*
         * Returning visitors do not need to see
         * the full cinematic opening again.
         */

        if (alreadySeen) {

            intro.remove();

            return;

        }


        /*
         * Mark the cinematic introduction as
         * seen immediately so navigation between
         * pages does not replay it.
         */

        try {

            localStorage.setItem(
                introKey,
                "true"
            );

        } catch (error) {

            /*
             * Storage may be unavailable in
             * private browsing situations.
             * The introduction can still run.
             */

        }


        /*
         * Full cinematic first-visit sequence.
         *
         * The existing five-second timing is
         * deliberately preserved.
         */

        const duration =
            reducedMotion
                ? 900
                : 5000;


        window.setTimeout(
            function () {

                if (!intro) {
                    return;
                }


                intro.classList.add(
                    "intro-hidden"
                );


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
                        ? 50
                        : 750
                );

            },
            duration
        );

    }


    /* =====================================================
       SOCIAL MEDIA HUB
       CINEMATIC ATMOSPHERE
    ====================================================== */

    function initialiseSocialEffects() {

        const socialHub =
            document.querySelector(
                ".social-hub"
            );


        if (!socialHub) {
            return;
        }


        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (reducedMotion) {
            return;
        }


        const skyline =
            socialHub.querySelector(
                ".social-lightning"
            );


        const paranormal =
            socialHub.querySelector(
                ".social-paranormal-glow"
            );


        const houseGlow =
            socialHub.querySelector(
                ".social-house-glow"
            );


        let animationFrame =
            null;


        let lastTime =
            0;


        function animate(
            timestamp
        ) {

            if (
                timestamp -
                lastTime <
                45
            ) {

                animationFrame =
                    window.requestAnimationFrame(
                        animate
                    );

                return;

            }


            lastTime =
                timestamp;


            const time =
                timestamp / 1000;


            /*
             * Skyline electrical atmosphere.
             */

            if (skyline) {

                const skylinePulse =
                    0.45 +
                    Math.sin(
                        time * 1.7
                    ) *
                    0.12;


                skyline.style.opacity =
                    skylinePulse.toFixed(
                        3
                    );

            }


            /*
             * Paranormal atmosphere.
             */

            if (paranormal) {

                const paranormalPulse =
                    0.38 +
                    Math.sin(
                        time * 1.15 +
                        1.5
                    ) *
                    0.18;


                paranormal.style.opacity =
                    paranormalPulse.toFixed(
                        3
                    );

            }


            /*
             * Haunted-house glow.
             */

            if (houseGlow) {

                const housePulse =
                    0.34 +
                    Math.sin(
                        time * 0.9 +
                        2
                    ) *
                    0.12;


                houseGlow.style.opacity =
                    housePulse.toFixed(
                        3
                    );

            }


            /*
             * The artwork's movement remains
             * controlled by CSS.
             *
             * We deliberately do not write
             * transform/translate values here,
             * preventing JavaScript from
             * fighting the CSS animation.
             */

            animationFrame =
                window.requestAnimationFrame(
                    animate
                );

        }


        animationFrame =
            window.requestAnimationFrame(
                animate
            );


        /*
         * Stop the effects when the page is
         * hidden to reduce unnecessary CPU and
         * battery usage on mobile devices.
         */

        document.addEventListener(
            "visibilitychange",
            function () {

                if (
                    document.hidden
                ) {

                    if (
                        animationFrame
                    ) {

                        window.cancelAnimationFrame(
                            animationFrame
                        );

                        animationFrame =
                            null;

                    }

                } else {

                    if (
                        !animationFrame
                    ) {

                        lastTime =
                            0;

                        animationFrame =
                            window.requestAnimationFrame(
                                animate
                            );

                    }

                }

            }
        );

    }


    /* =====================================================
       PUBLIC MENU FUNCTION
       
       Kept for compatibility with existing
       HTML and previous versions of the site.
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
