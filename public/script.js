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

        lightboxImage.src = "";

        lightboxImage.alt = "";

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
   CLOSE MENU AFTER NAVIGATION
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
   PAGE INITIALISATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupBackToTop();

        setupSmoothLinks();

        setupGallery();

        setupOutsideMenuClose();

        setupKeyboardControls();

        setupNavigationLinks();

    }
);
