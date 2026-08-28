"use strict";

/* =========================================================
   NEWITT MEDIA
   MASTER JAVASCRIPT
   NAVIGATION + LIGHTBOX + SITE CONTROLS
========================================================= */

(() => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menu =
        document.getElementById("main-menu");

    const menuButton =
        document.querySelector(".menu-toggle");

    const backTop =
        document.getElementById("backTop");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function setMenu(open) {

        if (!menu || !menuButton) {
            return;
        }

        menu.classList.toggle(
            "open",
            open
        );

        menuButton.setAttribute(
            "aria-expanded",
            String(open)
        );

    }


    window.toggleMenu = () => {

        if (!menu) {
            return;
        }

        setMenu(
            !menu.classList.contains("open")
        );

    };


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                window.toggleMenu();

            }
        );

    }


    /* =====================================================
       CLOSE MENU AFTER NAVIGATION
    ===================================================== */

    if (menu) {

        menu.querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        setMenu(false);

                    }
                );

            });

    }


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                !menu ||
                !menuButton ||
                !menu.classList.contains("open")
            ) {
                return;
            }

            if (
                !menu.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                setMenu(false);

            }

        }
    );


    /* =====================================================
       CLOSE MENU WHEN RETURNING TO DESKTOP
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800
            ) {

                setMenu(false);

            }

        }
    );


    /* =====================================================
       INTERNAL SMOOTH LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const id =
                    link.getAttribute("href");


                if (
                    !id ||
                    id === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(id);


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });


                setMenu(false);

            }
        );

    });


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    function closeLightbox() {

        const lightbox =
            document.getElementById("lightbox");

        const image =
            document.getElementById(
                "lightboxImage"
            );


        if (lightbox) {

            lightbox.classList.remove(
                "open"
            );

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        if (image) {

            image.removeAttribute(
                "src"
            );

            image.alt = "";

        }


        document.body.style.overflow =
            "";

    }


    document.querySelectorAll(
        ".gallery-link"
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const lightbox =
                    document.getElementById(
                        "lightbox"
                    );

                const image =
                    document.getElementById(
                        "lightboxImage"
                    );


                if (
                    !lightbox ||
                    !image
                ) {

                    return;

                }


                event.preventDefault();


                const source =
                    link.getAttribute(
                        "href"
                    );


                if (!source) {

                    return;

                }


                const thumbnail =
                    link.querySelector(
                        "img"
                    );


                image.src =
                    source;

                image.alt =
                    thumbnail?.alt ||
                    "Gallery image";


                lightbox.classList.add(
                    "open"
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


    /* =====================================================
       LIGHTBOX CLOSE BUTTON
    ===================================================== */

    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* =====================================================
       LIGHTBOX BACKGROUND CLOSE
    ===================================================== */

    const lightbox =
        document.getElementById(
            "lightbox"
        );


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                setMenu(false);

                closeLightbox();

            }

        }
    );


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    if (backTop) {

        const updateBackTop =
            () => {

                backTop.classList.toggle(
                    "show",
                    window.scrollY > 500
                );

            };


        window.addEventListener(
            "scroll",
            updateBackTop,
            {
                passive: true
            }
        );


        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );


        updateBackTop();

    }


    /* =====================================================
       IMAGE PERFORMANCE
    ===================================================== */

    document.querySelectorAll(
        "img"
    ).forEach(
        (image, index) => {

            image.decoding =
                "async";


            if (index === 0) {

                image.loading =
                    "eager";

                image.setAttribute(
                    "fetchpriority",
                    "high"
                );

            } else {

                if (
                    !image.hasAttribute(
                        "loading"
                    )
                ) {

                    image.loading =
                        "lazy";

                }

                image.setAttribute(
                    "fetchpriority",
                    "low"
                );

            }

        }
    );


    /* =====================================================
       ANIMATED SOCIAL SECTION
       
       The visual animation itself is handled entirely
       by CSS. No JavaScript timer is required.

       This means:
       - Gold ticker loops continuously
       - Lightning flashes automatically
       - House lights pulse automatically
       - Blue atmosphere moves automatically
       - Red atmosphere moves automatically
       - Paranormal logo slowly turns/reverses
       
       Keeping these animations in CSS gives better
       performance, particularly on mobile devices.
    ===================================================== */

    const animatedSocial =
        document.querySelector(
            ".animated-social-section"
        );


    if (animatedSocial) {

        animatedSocial.classList.add(
            "animations-ready"
        );

    }


})();
