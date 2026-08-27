"use strict";

/* =========================================================
   NEWITT MEDIA
   MASTER JAVASCRIPT
   FINAL CLEAN VERSION

   Works across:
   Home
   Skyline
   Paranormal
   Photography
   Contact
========================================================= */

(() => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menu = document.getElementById("main-menu");
    const menuButton = document.querySelector(".menu-toggle");

    const backTop =
        document.getElementById("backTop");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");


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


    function toggleMenu() {

        if (!menu) {
            return;
        }

        setMenu(
            !menu.classList.contains("open")
        );

    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                toggleMenu();

            }
        );

    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER NAVIGATION
    ===================================================== */

    if (menu) {

        menu.querySelectorAll("a").forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        setMenu(false);

                    }
                );

            }
        );

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
       CLOSE MENU WHEN RESIZING TO DESKTOP
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
    ).forEach(
        link => {

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

        }
    );


    /* =====================================================
       SKYLINE GALLERY LIGHTBOX
    ===================================================== */

    function openLightbox(source, altText) {

        if (
            !lightbox ||
            !lightboxImage ||
            !source
        ) {

            return;

        }


        lightboxImage.src =
            source;


        lightboxImage.alt =
            altText ||
            "NEWITT Skyline Media photograph";


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


    function closeLightbox() {

        if (lightbox) {

            lightbox.classList.remove(
                "open"
            );

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        if (lightboxImage) {

            lightboxImage.removeAttribute(
                "src"
            );

            lightboxImage.alt = "";

        }


        document.body.style.overflow =
            "";

    }


    document.querySelectorAll(
        ".gallery-link"
    ).forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    if (
                        !lightbox ||
                        !lightboxImage
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


                    const altText =
                        thumbnail?.alt ||
                        "NEWITT Skyline Media photograph";


                    openLightbox(
                        source,
                        altText
                    );

                }
            );

        }
    );


    /* =====================================================
       LIGHTBOX CLOSE BUTTON
    ===================================================== */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* =====================================================
       CLOSE LIGHTBOX BY CLICKING BACKDROP
    ===================================================== */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
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

            /* ESC */

            if (
                event.key === "Escape"
            ) {

                setMenu(false);

                closeLightbox();

            }


            /* ENTER / SPACE FOR LIGHTBOX CLOSE */

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                if (
                    document.activeElement ===
                    lightboxClose
                ) {

                    closeLightbox();

                }

            }

        }
    );


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    if (backTop) {

        function updateBackTop() {

            backTop.classList.toggle(
                "show",
                window.scrollY > 500
            );

        }


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

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(
        (image, index) => {

            image.decoding =
                "async";


            /*
               The first image on each page
               gets priority.

               Existing loading settings
               are respected.
            */

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
       TIKTOK EMBED SAFETY
    ===================================================== */

    /*
       TikTok's own embed.js handles
       the actual creator embeds.

       We do not attempt to control
       the third-party script here.
    */


    /* =====================================================
       EXPOSE MENU FUNCTION
       Useful if anything else on the site
       needs to open / close the menu.
    ===================================================== */

    window.toggleMenu =
        toggleMenu;


    /* =====================================================
       INITIAL LIGHTBOX STATE
    ===================================================== */

    if (lightbox) {

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =====================================================
       COMPLETE
    ===================================================== */

})();
