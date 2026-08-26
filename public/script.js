"use strict";


/* =====================================================
   NEWITT MEDIA
   FINAL MASTER JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

function setMenu(open) {

    const menu =
        document.getElementById("main-menu");

    const button =
        document.querySelector(".menu-toggle");


    if (!menu || !button) {
        return;
    }


    menu.classList.toggle(
        "open",
        Boolean(open)
    );


    button.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
    );

}


/* =====================================================
   MENU TOGGLE
===================================================== */

function toggleMenu() {

    const menu =
        document.getElementById("main-menu");


    if (!menu) {
        return;
    }


    setMenu(
        !menu.classList.contains("open")
    );

}


/* =====================================================
   BACK TO TOP
===================================================== */

function setupBackToTop() {

    const topButton =
        document.getElementById("backTop");


    if (!topButton) {
        return;
    }


    function updateButton() {

        if (window.scrollY > 500) {

            topButton.classList.add("show");

        } else {

            topButton.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateButton,
        {
            passive: true
        }
    );


    topButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateButton();

}


/* =====================================================
   SMOOTH INTERNAL LINKS
===================================================== */

function setupSmoothLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const id =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            id
                        );


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

}


/* =====================================================
   SKYLINE GALLERY LIGHTBOX
===================================================== */

function setupGallery() {

    const galleryLinks =
        document.querySelectorAll(
            ".gallery-link"
        );


    if (!galleryLinks.length) {
        return;
    }


    const lightbox =
        document.getElementById(
            "lightbox"
        );


    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );


    if (
        !lightbox ||
        !lightboxImage
    ) {
        return;
    }


    galleryLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const imageSource =
                        link.getAttribute(
                            "href"
                        );


                    if (!imageSource) {
                        return;
                    }


                    const thumbnail =
                        link.querySelector(
                            "img"
                        );


                    lightboxImage.src =
                        imageSource;


                    lightboxImage.alt =
                        thumbnail
                            ? thumbnail.alt
                            : "Skyline gallery image";


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


    const closeButton =
        document.getElementById(
            "lightboxClose"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeLightbox
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

}


/* =====================================================
   CLOSE LIGHTBOX
===================================================== */

function closeLightbox() {

    const lightbox =
        document.getElementById(
            "lightbox"
        );


    const lightboxImage =
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


    if (lightboxImage) {

        lightboxImage.src =
            "";

        lightboxImage.alt =
            "";

    }


    document.body.style.overflow =
        "";

}


/* =====================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
===================================================== */

function setupOutsideMenuClose() {

    document.addEventListener(
        "click",
        function (event) {

            const menu =
                document.getElementById(
                    "main-menu"
                );


            const menuButton =
                document.querySelector(
                    ".menu-toggle"
                );


            if (
                !menu ||
                !menuButton
            ) {
                return;
            }


            if (
                menu.classList.contains(
                    "open"
                ) &&

                !menu.contains(
                    event.target
                ) &&

                !menuButton.contains(
                    event.target
                )
            ) {

                setMenu(false);

            }

        }
    );

}


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

function setupKeyboardControls() {

    document.addEventListener(
        "keydown",
        function (event) {


            /* Escape closes mobile menu
               and image lightbox */

            if (
                event.key ===
                "Escape"
            ) {

                setMenu(false);

                closeLightbox();

            }

        }
    );

}


/* =====================================================
   NAVIGATION LINK HANDLING
===================================================== */

function setupNavigationLinks() {

    document
        .querySelectorAll(
            ".nav-links a"
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        setMenu(false);

                    }
                );

            }
        );

}


/* =====================================================
   PHASE 2.2
   SMART IMAGE PERFORMANCE
===================================================== */

function setupImagePerformance() {

    const images =
        document.querySelectorAll(
            "img"
        );


    if (!images.length) {
        return;
    }


    images.forEach(
        function (image, index) {

            /*
             * Decode images asynchronously where supported.
             * This helps prevent image decoding from blocking
             * the main page rendering process.
             */

            if (
                "decoding" in image
            ) {

                image.decoding =
                    "async";

            }


            /*
             * The first important image is treated as a
             * high-priority image.
             */

            if (
                index === 0
            ) {

                image.setAttribute(
                    "fetchpriority",
                    "high"
                );

                image.loading =
                    "eager";

            } else {

                /*
                 * Other images can load lazily as the user
                 * approaches them.
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

}


/* =====================================================
   PAGE INITIALISATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupBackToTop();

        setupImagePerformance();

        setupSmoothLinks();

        setupGallery();

        setupOutsideMenuClose();

        setupKeyboardControls();

        setupNavigationLinks();

    }
);
