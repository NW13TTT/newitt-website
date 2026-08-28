/* =========================================================
   NEWITT MEDIA
   MASTER SCRIPT
   Opening animation • mobile navigation • top button
   languages • lightbox • safe page-wide behaviour
========================================================= */

(() => {
    "use strict";

    const ready = (fn) => {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn, { once: true });
        } else {
            fn();
        }
    };

    ready(() => {

        /* =====================================================
           OPENING ANIMATION
        ===================================================== */

        const intro = document.getElementById("site-intro");

        if (intro) {
            const INTRO_SEEN_KEY = "newittMediaIntroSeen";

            const revealSite = () => {
                intro.classList.add("intro-finished");
                document.body.classList.remove("no-scroll");

                window.setTimeout(() => {
                    intro.setAttribute("hidden", "");
                    intro.setAttribute("aria-hidden", "true");
                }, 900);
            };

            let alreadySeen = false;

            try {
                alreadySeen =
                    sessionStorage.getItem(INTRO_SEEN_KEY) === "true";
            } catch (error) {
                alreadySeen = false;
            }

            if (alreadySeen) {

                intro.setAttribute("hidden", "");
                intro.setAttribute("aria-hidden", "true");

            } else {

                document.body.classList.add("no-scroll");

                try {
                    sessionStorage.setItem(
                        INTRO_SEEN_KEY,
                        "true"
                    );
                } catch (error) {
                    /* Continue if storage is unavailable. */
                }

                window.setTimeout(
                    revealSite,
                    3600
                );
            }
        }


        /* =====================================================
           MOBILE NAVIGATION
        ===================================================== */

        const menuToggle =
            document.querySelector(".menu-toggle");

        const navLinks =
            document.querySelector(".nav-links");


        const closeMenu = () => {

            if (!menuToggle || !navLinks) {
                return;
            }

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            navLinks.classList.remove("open");
            navLinks.classList.remove("active");

        };


        if (menuToggle && navLinks) {

            menuToggle.addEventListener(
                "click",
                () => {

                    const isOpen =
                        menuToggle.getAttribute(
                            "aria-expanded"
                        ) === "true";

                    menuToggle.setAttribute(
                        "aria-expanded",
                        String(!isOpen)
                    );

                    navLinks.classList.toggle(
                        "open",
                        !isOpen
                    );

                }
            );


            navLinks
                .querySelectorAll("a")
                .forEach((link) => {

                    link.addEventListener(
                        "click",
                        closeMenu
                    );

                });


            document.addEventListener(
                "click",
                (event) => {

                    if (
                        !navLinks.contains(event.target) &&
                        !menuToggle.contains(event.target)
                    ) {
                        closeMenu();
                    }

                }
            );


            document.addEventListener(
                "keydown",
                (event) => {

                    if (event.key === "Escape") {
                        closeMenu();
                    }

                }
            );

        }


        /* =====================================================
           BACK TO TOP
        ===================================================== */

        const topButton =
            document.getElementById(
                "back-to-top"
            );


        if (topButton) {

            const updateTopButton = () => {

                if (window.scrollY > 420) {

                    topButton.classList.add(
                        "visible"
                    );

                } else {

                    topButton.classList.remove(
                        "visible"
                    );

                }

            };


            updateTopButton();


            window.addEventListener(
                "scroll",
                updateTopButton,
                {
                    passive: true
                }
            );


            topButton.addEventListener(
                "click",
                (event) => {

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
           LANGUAGE SELECTOR
        ===================================================== */

        const languageToggle =
            document.querySelector(
                ".language-toggle"
            );

        const languageMenu =
            document.getElementById(
                "language-menu"
            );


        if (
            languageToggle &&
            languageMenu
        ) {

            languageToggle.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    const isOpen =
                        languageToggle.getAttribute(
                            "aria-expanded"
                        ) === "true";

                    languageToggle.setAttribute(
                        "aria-expanded",
                        String(!isOpen)
                    );

                    languageMenu.hidden =
                        isOpen;

                }
            );


            languageMenu
                .querySelectorAll("[data-lang]")
                .forEach((button) => {

                    button.addEventListener(
                        "click",
                        () => {

                            const language =
                                button.getAttribute(
                                    "data-lang"
                                );

                            if (!language) {
                                return;
                            }


                            try {

                                localStorage.setItem(
                                    "newittMediaLanguage",
                                    language
                                );

                            } catch (error) {
                                /* Ignore storage errors. */
                            }


                            languageToggle.textContent =
                                language.toUpperCase();


                            languageToggle.setAttribute(
                                "aria-expanded",
                                "false"
                            );


                            languageMenu.hidden =
                                true;

                        }
                    );

                });


            document.addEventListener(
                "click",
                () => {

                    languageToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    languageMenu.hidden =
                        true;

                }
            );


            document.addEventListener(
                "keydown",
                (event) => {

                    if (event.key === "Escape") {

                        languageToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        languageMenu.hidden =
                            true;

                    }

                }
            );


            try {

                const savedLanguage =
                    localStorage.getItem(
                        "newittMediaLanguage"
                    );

                if (savedLanguage) {

                    languageToggle.textContent =
                        savedLanguage.toUpperCase();

                }

            } catch (error) {
                /* Ignore storage errors. */
            }

        }


        /* =====================================================
           GALLERY / LIGHTBOX
        ===================================================== */

        const galleryItems =
            document.querySelectorAll(
                ".gallery-item img"
            );

        const lightbox =
            document.querySelector(
                ".lightbox"
            );


        if (
            galleryItems.length &&
            lightbox
        ) {

            const lightboxImage =
                lightbox.querySelector(
                    "img"
                );

            const closeButton =
                lightbox.querySelector(
                    ".lightbox-close"
                );


            const closeLightbox = () => {

                lightbox.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "no-scroll"
                );

                if (lightboxImage) {

                    lightboxImage.removeAttribute(
                        "src"
                    );

                }

            };


            galleryItems.forEach(
                (image) => {

                    image.addEventListener(
                        "click",
                        () => {

                            if (!lightboxImage) {
                                return;
                            }

                            lightboxImage.src =
                                image.currentSrc ||
                                image.src;

                            lightboxImage.alt =
                                image.alt ||
                                "NEWITT Media image";

                            lightbox.classList.add(
                                "active"
                            );

                            document.body.classList.add(
                                "no-scroll"
                            );

                        }
                    );

                }
            );


            if (closeButton) {

                closeButton.addEventListener(
                    "click",
                    closeLightbox
                );

            }


            lightbox.addEventListener(
                "click",
                (event) => {

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
                (event) => {

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
           SMOOTH INTERNAL LINKS
        ===================================================== */

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    (event) => {

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


                        const target =
                            document.querySelector(
                                targetId
                            );

                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        const reducedMotion =
                            window.matchMedia(
                                "(prefers-reduced-motion: reduce)"
                            ).matches;


                        target.scrollIntoView({
                            behavior:
                                reducedMotion
                                    ? "auto"
                                    : "smooth",
                            block: "start"
                        });

                    }
                );

            });


        /* =====================================================
           IMAGE SAFETY
        ===================================================== */

        document
            .querySelectorAll("img")
            .forEach((image) => {

                image.addEventListener(
                    "error",
                    () => {

                        image.classList.add(
                            "image-load-error"
                        );

                    },
                    {
                        once: true
                    }
                );

            });


        /* =====================================================
           PAGE READY
        ===================================================== */

        document.documentElement.classList.add(
            "newitt-js-ready"
        );


        /* =====================================================
           EXTERNAL SOCIAL LINKS
        ===================================================== */

        document
            .querySelectorAll(
                'a[target="_blank"]'
            )
            .forEach((link) => {

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            });

    });

})();
