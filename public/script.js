"use strict";

/* =========================================================
   NEWITT MEDIA
   CLEAN MASTER JAVASCRIPT
========================================================= */

(() => {

    const menu = document.getElementById("main-menu");
    const menuButton = document.querySelector(".menu-toggle");
    const backTop = document.getElementById("backTop");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function setMenu(open) {

        if (!menu || !menuButton) {
            return;
        }

        menu.classList.toggle("open", open);

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
            () => {
                window.toggleMenu();
            }
        );

    }


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
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                setMenu(false);

                closeLightbox();

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

    function closeLightbox() {

        const lightbox =
            document.getElementById("lightbox");

        const image =
            document.getElementById("lightboxImage");


        if (lightbox) {

            lightbox.classList.remove("open");

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        if (image) {

            image.removeAttribute("src");

            image.alt = "";

        }


        document.body.style.overflow = "";

    }


    document.querySelectorAll(
        ".gallery-link"
    ).forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const lightbox =
                        document.getElementById("lightbox");

                    const image =
                        document.getElementById("lightboxImage");


                    if (
                        !lightbox ||
                        !image
                    ) {
                        return;
                    }


                    event.preventDefault();


                    const source =
                        link.getAttribute("href");


                    if (!source) {
                        return;
                    }


                    const thumbnail =
                        link.querySelector("img");


                    image.src = source;

                    image.alt =
                        thumbnail?.alt ||
                        "Skyline gallery image";


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

        }
    );


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


    const lightbox =
        document.getElementById("lightbox");


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

            image.decoding = "async";


            if (index === 0) {

                image.loading = "eager";

                image.setAttribute(
                    "fetchpriority",
                    "high"
                );

            } else {

                if (
                    !image.hasAttribute("loading")
                ) {

                    image.loading = "lazy";

                }

                image.setAttribute(
                    "fetchpriority",
                    "low"
                );

            }

        }
    );

})();
