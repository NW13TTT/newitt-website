/* =========================================================
   NEWITT MEDIA
   MASTER JAVASCRIPT
   CLEAN REBUILD
   ========================================================= */

"use strict";


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initialiseCinematicIntro();
    initialiseMobileNavigation();
    initialiseBackToTop();
    initialiseSmoothAnchors();
    initialiseLightboxes();
    initialiseExternalLinks();

});


/* =========================================================
   CINEMATIC INTRO
   ========================================================= */

function initialiseCinematicIntro() {

    const intro = document.getElementById("site-intro");

    if (!intro) {
        return;
    }


    /*
       The intro is shown only on the first visit
       during the current browser session.

       sessionStorage means:
       - first visit = intro appears
       - refreshing the page = no repeated intro
       - closing the browser/session = intro can appear again
    */

    const introSeenKey = "newittMediaIntroSeen";


    if (sessionStorage.getItem(introSeenKey) === "true") {

        intro.classList.add("is-hidden");

        return;
    }


    sessionStorage.setItem(
        introSeenKey,
        "true"
    );


    /*
       Give the cinematic opening enough time to play,
       then remove it completely from interaction.
    */

    const introDuration = 4200;


    window.setTimeout(() => {

        intro.classList.add("is-hidden");

        window.setTimeout(() => {

            intro.setAttribute(
                "aria-hidden",
                "true"
            );

        }, 1000);

    }, introDuration);


    /*
       The intro text itself can also be tapped/clicked
       to enter the website immediately.
    */

    intro.addEventListener("click", () => {

        intro.classList.add("is-hidden");

    });


    /*
       Allow keyboard users to enter immediately.
    */

    intro.addEventListener("keydown", (event) => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            intro.classList.add("is-hidden");

        }

    });

}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function initialiseMobileNavigation() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const menu =
        document.querySelector(".nav-links");


    if (!menuToggle || !menu) {
        return;
    }


    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                menuToggle.classList.toggle("active");

            menu.classList.toggle(
                "open",
                isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        }
    );


    /*
       Close the mobile menu when a navigation link
       is selected.
    */

    menu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            closeMobileMenu(
                menuToggle,
                menu
            );

        });

    });


    /*
       Close when clicking outside the navigation.
    */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !menu.classList.contains("open")
            ) {
                return;
            }


            const clickedInsideMenu =
                menu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                closeMobileMenu(
                    menuToggle,
                    menu
                );

            }

        }
    );


    /*
       Close the menu when Escape is pressed.
    */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                menu.classList.contains("open")
            ) {

                closeMobileMenu(
                    menuToggle,
                    menu
                );

                menuToggle.focus();

            }

        }
    );

}


function closeMobileMenu(
    menuToggle,
    menu
) {

    menuToggle.classList.remove("active");

    menu.classList.remove("open");

    document.body.classList.remove(
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


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initialiseBackToTop() {

    const button =
        document.getElementById("back-to-top");


    if (!button) {
        return;
    }


    const updateBackToTop = () => {

        if (window.scrollY > 500) {

            button.classList.add("visible");

        } else {

            button.classList.remove("visible");

        }

    };


    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    updateBackToTop();


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   SMOOTH INTERNAL ANCHORS
   ========================================================= */

function initialiseSmoothAnchors() {

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");


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
                        behavior: "smooth",
                        block: "start"
                    });


                    /*
                       Update the URL without forcing
                       the browser to jump.
                    */

                    if (
                        window.history &&
                        window.history.replaceState
                    ) {

                        window.history.replaceState(
                            null,
                            "",
                            targetId
                        );

                    }

                }
            );

        });

}


/* =========================================================
   LIGHTBOX SUPPORT
   ========================================================= */

function initialiseLightboxes() {

    const lightboxLinks =
        document.querySelectorAll(
            "[data-lightbox]"
        );


    if (!lightboxLinks.length) {
        return;
    }


    const lightbox =
        createLightbox();


    lightboxLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const href =
                    link.getAttribute("href");


                if (!href) {
                    return;
                }


                event.preventDefault();


                const image =
                    lightbox.querySelector(
                        ".newitt-lightbox-image"
                    );


                const caption =
                    lightbox.querySelector(
                        ".newitt-lightbox-caption"
                    );


                image.src = href;

                image.alt =
                    link.dataset.caption ||
                    link.querySelector("img")?.alt ||
                    "NEWITT Media image";


                caption.textContent =
                    link.dataset.caption || "";


                lightbox.classList.add(
                    "open"
                );


                document.body.classList.add(
                    "menu-open"
                );

            }
        );

    });

}


function createLightbox() {

    const existing =
        document.getElementById(
            "newitt-lightbox"
        );


    if (existing) {
        return existing;
    }


    const lightbox =
        document.createElement("div");


    lightbox.id =
        "newitt-lightbox";


    lightbox.className =
        "newitt-lightbox";


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    lightbox.innerHTML = `
        <button
            class="newitt-lightbox-close"
            type="button"
            aria-label="Close image"
        >
            ×
        </button>

        <div class="newitt-lightbox-inner">

            <img
                class="newitt-lightbox-image"
                src=""
                alt=""
            >

            <div
                class="newitt-lightbox-caption"
            ></div>

        </div>
    `;


    document.body.appendChild(
        lightbox
    );


    const closeButton =
        lightbox.querySelector(
            ".newitt-lightbox-close"
        );


    const closeLightbox = () => {

        lightbox.classList.remove(
            "open"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "menu-open"
        );

    };


    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target === lightbox
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
                lightbox.classList.contains("open")
            ) {

                closeLightbox();

            }

        }
    );


    return lightbox;

}


/* =========================================================
   EXTERNAL LINKS
   ========================================================= */

function initialiseExternalLinks() {

    document
        .querySelectorAll(
            'a[href^="http://"], a[href^="https://"]'
        )
        .forEach((link) => {

            const currentHost =
                window.location.hostname;

            let linkHost = "";

            try {

                linkHost =
                    new URL(
                        link.href
                    ).hostname;

            } catch {

                return;

            }


            /*
               Keep links to NEWITT Media itself
               behaving normally.
            */

            if (
                linkHost === currentHost ||
                linkHost === ""
            ) {
                return;
            }


            /*
               Social/external links open separately.
            */

            link.target = "_blank";

            link.rel =
                "noopener noreferrer";

        });

}


/* =========================================================
   PAGE LOAD SAFETY
   ========================================================= */

window.addEventListener(
    "pageshow",
    () => {

        document.body.classList.remove(
            "menu-open"
        );

        const menu =
            document.querySelector(".nav-links");

        const menuToggle =
            document.querySelector(".menu-toggle");


        if (menu) {
            menu.classList.remove("open");
        }


        if (menuToggle) {

            menuToggle.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);
