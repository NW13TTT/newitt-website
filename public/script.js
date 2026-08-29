/* =========================================================
   NEWITT MEDIA
   MASTER SCRIPT
   ---------------------------------------------------------
   • Opening animation
   • Mobile navigation
   • Back to top
   • Language selector
   • Persistent language preference
   • Gallery / lightbox
   • Smooth internal scrolling
   • Image error handling
   • External-link safety
   • Accessibility support

   Supported languages:
   English
   Cymraeg
   Français
   Deutsch
   Español
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       DOM READY
    ===================================================== */

    const ready = (callback) => {

        if (document.readyState === "loading") {

            document.addEventListener(
                "DOMContentLoaded",
                callback,
                { once: true }
            );

        } else {

            callback();

        }

    };


    ready(() => {


        /* =====================================================
           OPENING ANIMATION
        ===================================================== */

        const intro =
            document.getElementById("site-intro");


        if (intro) {

            const INTRO_KEY =
                "newittMediaIntroSeen";


            const finishIntro = () => {

                intro.classList.add(
                    "intro-finished"
                );

                document.body.classList.remove(
                    "no-scroll"
                );


                window.setTimeout(() => {

                    intro.hidden = true;

                }, 900);

            };


            let seen = false;


            try {

                seen =
                    sessionStorage.getItem(
                        INTRO_KEY
                    ) === "true";

            } catch (error) {

                seen = false;

            }


            if (seen) {

                intro.hidden = true;

                intro.setAttribute(
                    "aria-hidden",
                    "true"
                );

            } else {

                document.body.classList.add(
                    "no-scroll"
                );


                try {

                    sessionStorage.setItem(
                        INTRO_KEY,
                        "true"
                    );

                } catch (error) {

                    /* Storage unavailable. */

                }


                window.setTimeout(
                    finishIntro,
                    3600
                );

            }

        }


        /* =====================================================
           MOBILE NAVIGATION
        ===================================================== */

        const menuToggle =
            document.querySelector(
                ".menu-toggle"
            );


        const navLinks =
            document.querySelector(
                ".nav-links"
            );


        const closeMenu = () => {

            if (
                !menuToggle ||
                !navLinks
            ) {

                return;

            }


            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );


            navLinks.classList.remove(
                "open"
            );

            navLinks.classList.remove(
                "active"
            );

        };


        if (
            menuToggle &&
            navLinks
        ) {


            menuToggle.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();


                    const open =
                        menuToggle.getAttribute(
                            "aria-expanded"
                        ) === "true";


                    menuToggle.setAttribute(
                        "aria-expanded",
                        String(!open)
                    );


                    menuToggle.setAttribute(
                        "aria-label",
                        open
                            ? "Open navigation menu"
                            : "Close navigation menu"
                    );


                    navLinks.classList.toggle(
                        "open",
                        !open
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

                    if (
                        event.key === "Escape"
                    ) {

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

                topButton.classList.toggle(
                    "visible",
                    window.scrollY > 420
                );

            };


            updateTopButton();


            window.addEventListener(
                "scroll",
                updateTopButton,
                { passive: true }
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
           LANGUAGE SYSTEM
        ===================================================== */

        const LANGUAGE_KEY =
            "newittMediaLanguage";


        const LANGUAGES = [
            "en",
            "cy",
            "fr",
            "de",
            "es"
        ];


        const LANGUAGE_NAMES = {

            en: "English",

            cy: "Cymraeg",

            fr: "Français",

            de: "Deutsch",

            es: "Español"

        };


        /*
           Every translatable element uses:

           data-i18n="translation.key"

           This avoids trying to guess which language
           the current text happens to be in.
        */


        const TRANSLATIONS = {

            en: {

                navHome: "Home",
                navSkyline: "Skyline",
                navParanormal: "Paranormal",
                navPhotography: "Photography",
                navContact: "Contact",

                explore:
                    "Explore NEWITT Media",

                getInTouch:
                    "Get in Touch",

                visitSkyline:
                    "Visit Skyline",

                enterParanormal:
                    "Enter the Paranormal",

                visitPhotography:
                    "Visit Photography",

                followSocial:
                    "✦ FOLLOW US ON SOCIAL MEDIA ✦"

            },


            cy: {

                navHome: "Cartref",
                navSkyline: "Skyline",
                navParanormal: "Paranormal",
                navPhotography: "Ffotograffiaeth",
                navContact: "Cysylltu",

                explore:
                    "Archwilio NEWITT Media",

                getInTouch:
                    "Cysylltu â Ni",

                visitSkyline:
                    "Ewch i Skyline",

                enterParanormal:
                    "Ewch i'r Paranormal",

                visitPhotography:
                    "Ewch i Ffotograffiaeth",

                followSocial:
                    "✦ DILYNWCH NI AR Y CYFRYNGAU CYMDEITHASOL ✦"

            },


            fr: {

                navHome: "Accueil",
                navSkyline: "Skyline",
                navParanormal: "Paranormal",
                navPhotography: "Photographie",
                navContact: "Contact",

                explore:
                    "Explorer NEWITT Media",

                getInTouch:
                    "Nous contacter",

                visitSkyline:
                    "Visiter Skyline",

                enterParanormal:
                    "Entrer dans le paranormal",

                visitPhotography:
                    "Voir la photographie",

                followSocial:
                    "✦ SUIVEZ-NOUS SUR LES RÉSEAUX SOCIAUX ✦"

            },


            de: {

                navHome: "Startseite",
                navSkyline: "Skyline",
                navParanormal: "Paranormal",
                navPhotography: "Fotografie",
                navContact: "Kontakt",

                explore:
                    "NEWITT Media entdecken",

                getInTouch:
                    "Kontakt aufnehmen",

                visitSkyline:
                    "Skyline besuchen",

                enterParanormal:
                    "Zum Paranormalen",

                visitPhotography:
                    "Fotografie ansehen",

                followSocial:
                    "✦ FOLGEN SIE UNS IN DEN SOZIALEN MEDIEN ✦"

            },


            es: {

                navHome: "Inicio",
                navSkyline: "Skyline",
                navParanormal: "Paranormal",
                navPhotography: "Fotografía",
                navContact: "Contacto",

                explore:
                    "Explorar NEWITT Media",

                getInTouch:
                    "Contactar",

                visitSkyline:
                    "Visitar Skyline",

                enterParanormal:
                    "Entrar en lo paranormal",

                visitPhotography:
                    "Ver fotografía",

                followSocial:
                    "✦ SÍGUENOS EN LAS REDES SOCIALES ✦"

            }

        };


        /* =====================================================
           LANGUAGE SELECTOR
        ===================================================== */

        let languageSelector =
            document.querySelector(
                ".language-selector"
            );


        if (!languageSelector) {

            languageSelector =
                document.createElement(
                    "div"
                );

            languageSelector.className =
                "language-selector";

            languageSelector.setAttribute(
                "aria-label",
                "Language selection"
            );


            languageSelector.innerHTML = `

                <button
                    type="button"
                    class="language-toggle"
                    aria-expanded="false"
                    aria-controls="language-menu"
                    aria-label="Language: English"
                >
                    EN
                </button>

                <div
                    class="language-menu"
                    id="language-menu"
                    hidden
                >

                    <button type="button" data-lang="en">
                        English
                    </button>

                    <button type="button" data-lang="cy">
                        Cymraeg
                    </button>

                    <button type="button" data-lang="fr">
                        Français
                    </button>

                    <button type="button" data-lang="de">
                        Deutsch
                    </button>

                    <button type="button" data-lang="es">
                        Español
                    </button>

                </div>

            `;


            document.body.appendChild(
                languageSelector
            );

        }


        const languageToggle =
            languageSelector.querySelector(
                ".language-toggle"
            );


        const languageMenu =
            languageSelector.querySelector(
                ".language-menu"
            );


        /* =====================================================
           LANGUAGE FUNCTIONS
        ===================================================== */

        const closeLanguageMenu = () => {

            if (
                !languageToggle ||
                !languageMenu
            ) {

                return;

            }


            languageToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            languageMenu.hidden = true;

        };


        const saveLanguage = (language) => {

            try {

                localStorage.setItem(
                    LANGUAGE_KEY,
                    language
                );

            } catch (error) {

                /* Storage unavailable. */

            }

        };


        const getSavedLanguage = () => {

            try {

                const saved =
                    localStorage.getItem(
                        LANGUAGE_KEY
                    );


                if (
                    LANGUAGES.includes(
                        saved
                    )
                ) {

                    return saved;

                }

            } catch (error) {

                /* Storage unavailable. */

            }


            return "en";

        };


        const applyTranslation = (
            element,
            key,
            dictionary
        ) => {

            if (
                !element ||
                !dictionary
            ) {

                return;

            }


            if (
                Object.prototype.hasOwnProperty.call(
                    dictionary,
                    key
                )
            ) {

                element.textContent =
                    dictionary[key];

            }

        };


        const setLanguage = (
            language
        ) => {

            if (
                !LANGUAGES.includes(
                    language
                )
            ) {

                language = "en";

            }


            const dictionary =
                TRANSLATIONS[
                    language
                ];


            if (!dictionary) {

                return;

            }


            /* ---------------------------------------------
               HTML LANGUAGE
            --------------------------------------------- */

            document.documentElement.lang =
                language === "en"
                    ? "en-GB"
                    : language;


            /* ---------------------------------------------
               SAVE
            --------------------------------------------- */

            saveLanguage(
                language
            );


            /* ---------------------------------------------
               SELECTOR
            --------------------------------------------- */

            if (languageToggle) {

                languageToggle.textContent =
                    language.toUpperCase();


                languageToggle.setAttribute(
                    "aria-label",
                    `Language: ${LANGUAGE_NAMES[language]}`
                );

            }


            /* ---------------------------------------------
               DATA-I18N ELEMENTS
            --------------------------------------------- */

            document
                .querySelectorAll(
                    "[data-i18n]"
                )
                .forEach((element) => {

                    const key =
                        element.getAttribute(
                            "data-i18n"
                        );


                    applyTranslation(
                        element,
                        key,
                        dictionary
                    );

                });


            /* ---------------------------------------------
               NAVIGATION FALLBACK
               Keeps the current HTML working even before
               all pages have data-i18n attributes.
            --------------------------------------------- */

            const nav =
                document.querySelector(
                    ".nav-links"
                );


            if (nav) {

                nav.querySelectorAll("a")
                    .forEach((link) => {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (!href) {

                            return;

                        }


                        if (
                            href.includes(
                                "index.html"
                            ) ||
                            href === "./" ||
                            href === "/"
                        ) {

                            link.textContent =
                                dictionary.navHome;

                        } else if (
                            href.includes(
                                "skyline.html"
                            )
                        ) {

                            link.textContent =
                                dictionary.navSkyline;

                        } else if (
                            href.includes(
                                "paranormal.html"
                            )
                        ) {

                            link.textContent =
                                dictionary.navParanormal;

                        } else if (
                            href.includes(
                                "photography.html"
                            )
                        ) {

                            link.textContent =
                                dictionary.navPhotography;

                        } else if (
                            href.includes(
                                "contact.html"
                            )
                        ) {

                            link.textContent =
                                dictionary.navContact;

                        }

                    });

            }


            /* ---------------------------------------------
               COMMON BUTTONS
            --------------------------------------------- */

            document
                .querySelectorAll(
                    ".button"
                )
                .forEach((button) => {

                    const key =
                        button.getAttribute(
                            "data-i18n"
                        );


                    if (key) {

                        applyTranslation(
                            button,
                            key,
                            dictionary
                        );

                    }

                });


            /* ---------------------------------------------
               SOCIAL TICKER
            --------------------------------------------- */

            document
                .querySelectorAll(
                    ".social-ticker-track span"
                )
                .forEach((element) => {

                    element.textContent =
                        dictionary.followSocial;

                });


            /* ---------------------------------------------
               CUSTOM EVENT
            --------------------------------------------- */

            document.dispatchEvent(
                new CustomEvent(
                    "newittLanguageChanged",
                    {
                        detail: {
                            language
                        }
                    }
                )
            );

        };


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
                .querySelectorAll(
                    "[data-lang]"
                )
                .forEach((button) => {

                    button.addEventListener(
                        "click",
                        (event) => {

                            event.stopPropagation();


                            const language =
                                button.getAttribute(
                                    "data-lang"
                                );


                            setLanguage(
                                language
                            );


                            closeLanguageMenu();

                        }
                    );

                });


            document.addEventListener(
                "click",
                (event) => {

                    if (
                        !languageSelector.contains(
                            event.target
                        )
                    ) {

                        closeLanguageMenu();

                    }

                }
            );


            document.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key === "Escape"
                    ) {

                        closeLanguageMenu();

                    }

                }
            );

        }


        setLanguage(
            getSavedLanguage()
        );


        /* =====================================================
           GALLERY / LIGHTBOX
        ===================================================== */

        const galleryImages =
            document.querySelectorAll(
                ".gallery-item img, .gallery-link img"
            );


        const lightbox =
            document.querySelector(
                ".lightbox"
            );


        if (
            galleryImages.length &&
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


                lightbox.setAttribute(
                    "aria-hidden",
                    "true"
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


            galleryImages.forEach(
                (image) => {

                    image.addEventListener(
                        "click",
                        (event) => {

                            event.preventDefault();


                            if (
                                !lightboxImage
                            ) {

                                return;

                            }


                            const parentLink =
                                image.closest(
                                    "a"
                                );


                            const fullImage =
                                parentLink &&
                                parentLink.href
                                    ? parentLink.href
                                    : image.currentSrc ||
                                      image.src;


                            lightboxImage.src =
                                fullImage;


                            lightboxImage.alt =
                                image.alt ||
                                "NEWITT Media image";


                            lightbox.classList.add(
                                "active"
                            );


                            lightbox.setAttribute(
                                "aria-hidden",
                                "false"
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
            .querySelectorAll(
                "img"
            )
            .forEach((image) => {

                image.addEventListener(
                    "error",
                    () => {

                        image.classList.add(
                            "image-load-error"
                        );

                    },
                    { once: true }
                );

            });


        /* =====================================================
           EXTERNAL LINK SAFETY
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


        /* =====================================================
           JAVASCRIPT READY
        ===================================================== */

        document.documentElement.classList.add(
            "newitt-js-ready"
        );


    });

})();
