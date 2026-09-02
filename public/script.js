/* =========================================================
   NEWITT MEDIA
   MASTER SCRIPT
========================================================= */

(function () {
    "use strict";

    /* =====================================================
       FIRST-VISIT INTRO
    ===================================================== */

    const intro = document.getElementById("site-intro");
    const introStorageKey = "newittMediaIntroSeen";

    function hideIntro() {
        if (!intro) return;

        intro.classList.add("is-hidden");

        window.setTimeout(function () {
            intro.setAttribute("aria-hidden", "true");
        }, 900);
    }

    if (intro) {
        let introSeen = false;

        try {
            introSeen = sessionStorage.getItem(introStorageKey) === "1";
        } catch (error) {
            introSeen = false;
        }

        if (introSeen) {
            hideIntro();
        } else {
            try {
                sessionStorage.setItem(introStorageKey, "1");
            } catch (error) {
                /* Storage may be unavailable. */
            }

            window.setTimeout(hideIntro, 3600);

            intro.addEventListener("click", hideIntro);
        }
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    function closeMenu() {
        if (!navLinks) return;

        navLinks.classList.remove("open");

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
        }
    }

    function toggleMenu() {
        if (!navLinks) return;

        const isOpen = navLinks.classList.toggle("open");

        if (menuToggle) {
            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            toggleMenu();
        });
    }

    if (navLinks) {
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                closeMenu();
            });
        });
    }

    document.addEventListener("click", function (event) {
        if (!navLinks || !menuToggle) return;

        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 800) {
            closeMenu();
        }
    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();

            if (intro) {
                hideIntro();
            }
        }
    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById("back-to-top") ||
        document.getElementById("backTop");

    function updateBackToTop() {
        if (!backToTop) return;

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    if (backToTop) {
        backToTop.addEventListener("click", function (event) {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );

        updateBackToTop();
    }


    /* =====================================================
       INTERNAL ANCHOR LINKS
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    document.querySelectorAll("a[href]").forEach(function (link) {

        const href = link.getAttribute("href");

        if (!href) return;

        const isExternal =
            /^https?:\/\//i.test(href);

        if (isExternal) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }

    });

})();
/* =========================================================
   LIGHTBOX
========================================================= */

(function () {
    "use strict";

    const lightbox =
        document.getElementById("lightbox");

    if (!lightbox) return;

    const lightboxImage =
        lightbox.querySelector("img");

    const lightboxClose =
        lightbox.querySelector(".lightbox-close");

    const lightboxCaption =
        lightbox.querySelector(".lightbox-caption");


    function openLightbox(image) {

        if (!lightboxImage) return;

        const source =
            image.getAttribute("data-lightbox") ||
            image.getAttribute("src");

        if (!source) return;

        lightboxImage.src = source;

        const alt =
            image.getAttribute("alt") || "";

        lightboxImage.alt = alt;

        if (lightboxCaption) {
            lightboxCaption.textContent = alt;
        }

        lightbox.classList.add("open");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "lightbox-open"
        );
    }


    function closeLightbox() {

        lightbox.classList.remove("open");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "lightbox-open"
        );

        if (lightboxImage) {
            lightboxImage.src = "";
        }
    }


    document
        .querySelectorAll("[data-lightbox]")
        .forEach(function (image) {

            image.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    openLightbox(image);
                }
            );

            image.setAttribute(
                "tabindex",
                "0"
            );

            image.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        openLightbox(image);
                    }
                }
            );
        });


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeLightbox();
            }
        );
    }


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
                lightbox.classList.contains("open")
            ) {
                closeLightbox();
            }
        }
    );

})();


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

(function () {
    "use strict";

    document
        .querySelectorAll("img")
        .forEach(function (image) {

            image.addEventListener(
                "error",
                function () {

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        });

})();


/* =========================================================
   CURRENT PAGE NAVIGATION
========================================================= */

(function () {
    "use strict";

    const currentPath =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const links =
        document.querySelectorAll(
            ".nav-links a"
        );

    links.forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (!href) return;

        const linkPath =
            href
                .split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();

        if (
            linkPath &&
            linkPath === currentPath
        ) {

            link.classList.add("active");

        }

    });

})();


/* =========================================================
   PAGE VISIBILITY
========================================================= */

(function () {
    "use strict";

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                document.visibilityState ===
                "hidden"
            ) {
                return;
            }

        }
    );

})();


/* =========================================================
   PREVENT ACCIDENTAL DRAGGING OF LOGOS
========================================================= */

(function () {
    "use strict";

    document
        .querySelectorAll(
            ".nav-brand img, .intro-logo, .hero-logo"
        )
        .forEach(function (image) {

            image.addEventListener(
                "dragstart",
                function (event) {
                    event.preventDefault();
                }
            );

        });

})();
/* =========================================================
   FINAL INITIALISATION
========================================================= */

(function () {
    "use strict";

    /*
     * Keep the page stable while assets load.
     * No page-to-page interception or animated transitions.
     */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            function () {
                document.documentElement.classList.add(
                    "newitt-ready"
                );
            },
            { once: true }
        );

    } else {

        document.documentElement.classList.add(
            "newitt-ready"
        );

    }

})();


/* =========================================================
   SOCIAL LINKS
========================================================= */

(function () {
    "use strict";

    document
        .querySelectorAll(
            ".social-button, .social-link"
        )
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    const href =
                        link.getAttribute("href");

                    if (!href) {
                        return;
                    }

                    /*
                     * Social links remain normal links.
                     * No iframe loading and no page interception.
                     */

                }
            );

        });

})();


/* =========================================================
   MOBILE MENU ACCESSIBILITY
========================================================= */

(function () {
    "use strict";

    const button =
        document.querySelector(".menu-toggle");

    const menu =
        document.querySelector(".nav-links");

    if (!button || !menu) {
        return;
    }

    if (!button.hasAttribute("aria-expanded")) {
        button.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    if (!button.hasAttribute("aria-controls")) {
        const menuId =
            menu.id || "main-navigation";

        menu.id = menuId;

        button.setAttribute(
            "aria-controls",
            menuId
        );
    }

})();


/* =========================================================
   INTRO ACCESSIBILITY
========================================================= */

(function () {
    "use strict";

    const intro =
        document.getElementById("site-intro");

    if (!intro) {
        return;
    }

    intro.setAttribute(
        "role",
        "dialog"
    );

    intro.setAttribute(
        "aria-label",
        "NEWITT Media introduction"
    );

})();


/* =========================================================
   LIGHTBOX ACCESSIBILITY
========================================================= */

(function () {
    "use strict";

    const lightbox =
        document.getElementById("lightbox");

    if (!lightbox) {
        return;
    }

    if (!lightbox.hasAttribute("aria-hidden")) {
        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );
    }

})();


/* =========================================================
   END OF MASTER SCRIPT
========================================================= */
