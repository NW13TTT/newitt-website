"use strict";

/* =========================================================
   NEWITT MEDIA
   MASTER JAVASCRIPT
   Home / Skyline / Paranormal / Photography / Contact
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
            toggleMenu
        );

    }


    /* Close menu after selecting a page */

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


    /* Close menu when clicking outside */

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


    /* Close menu when returning to desktop */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 800) {
                setMenu(false);
            }

        }
    );


    /* =====================================================
       SMOOTH INTERNAL LINKS
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


                    let target = null;

                    try {

                        target =
                            document.querySelector(id);

                    } catch {
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


                    setMenu(false);

                }
            );

        }
    );


    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

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


        document.body.style.overflow = "";

    }


    function openLightbox(link) {

        if (
            !lightbox ||
            !lightboxImage
        ) {
            return;
        }


        const source =
            link.getAttribute("href");


        if (!source) {
            return;
        }


        const thumbnail =
            link.querySelector("img");


        lightboxImage.src =
            source;


        lightboxImage.alt =
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


    document.querySelectorAll(
        ".gallery-link"
    ).forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    openLightbox(link);

                }
            );

        }
    );


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


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

    document.querySelectorAll(
        "img"
    ).forEach(
        (image, index) => {

            image.decoding =
                "async";


            /*
               Keep the first visible image eager.
            */

            if (index === 0) {

                image.loading =
                    "eager";

                image.setAttribute(
                    "fetchpriority",
                    "high"
                );

            } else {

                /*
                   Do not override an explicit
                   loading attribute from HTML.
                */

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
       EXPOSE MENU FUNCTION
       Useful if another page/script calls toggleMenu().
    ===================================================== */

    window.toggleMenu =
        toggleMenu;


})();
