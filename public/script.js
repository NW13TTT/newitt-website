/* =========================================================
   NEWITT MEDIA
   MASTER WEBSITE SCRIPT
   FINAL WEBSITE SYSTEM

   Handles:
   - Opening animation
   - Mobile navigation
   - Back to top
   - Language selector
   - Page translations
   - Gallery / lightbox
   - Smooth scrolling
   - Image error handling
   - External-link safety
   - Accessibility
   - Keyboard controls
   - Reduced-motion support

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
           GENERAL HELPERS
        ===================================================== */

        const prefersReducedMotion = () => {

            return window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        };


        const normalise = (value) => {

            return String(value || "")
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();

        };


        /* =====================================================
           OPENING ANIMATION
        ===================================================== */

        const intro =
            document.getElementById("site-intro");


        if (intro) {

            const INTRO_SEEN_KEY =
                "newittMediaIntroSeen";


            const hideIntroImmediately = () => {

                intro.classList.add(
                    "intro-finished"
                );

                intro.setAttribute(
                    "hidden",
                    ""
                );

                intro.setAttribute(
                    "aria-hidden",
                    "true"
                );

                document.body.classList.remove(
                    "no-scroll"
                );

            };


            const revealSite = () => {

                intro.classList.add(
                    "intro-finished"
                );

                document.body.classList.remove(
                    "no-scroll"
                );


                window.setTimeout(() => {

                    intro.setAttribute(
                        "hidden",
                        ""
                    );

                    intro.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }, 900);

            };


            let alreadySeen = false;


            try {

                alreadySeen =
                    sessionStorage.getItem(
                        INTRO_SEEN_KEY
                    ) === "true";

            } catch (error) {

                alreadySeen = false;

            }


            if (alreadySeen) {

                hideIntroImmediately();

            } else {

                document.body.classList.add(
                    "no-scroll"
                );


                try {

                    sessionStorage.setItem(
                        INTRO_SEEN_KEY,
                        "true"
                    );

                } catch (error) {

                    /* Storage unavailable. */

                }


                window.setTimeout(
                    revealSite,
                    prefersReducedMotion()
                        ? 50
                        : 3600
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


        const openMenu = () => {

            if (
                !menuToggle ||
                !navLinks
            ) {

                return;

            }


            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );


            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );


            navLinks.classList.add(
                "open"
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


                    const isOpen =
                        menuToggle.getAttribute(
                            "aria-expanded"
                        ) === "true";


                    if (isOpen) {

                        closeMenu();

                    } else {

                        openMenu();

                    }

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
                        !navLinks.contains(
                            event.target
                        ) &&
                        !menuToggle.contains(
                            event.target
                        )
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

                if (
                    window.scrollY > 420
                ) {

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


                    window.scrollTo({

                        top: 0,

                        behavior:
                            prefersReducedMotion()
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


        const SUPPORTED_LANGUAGES = [
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
         * Translation dictionary.
         *
         * The existing page wording remains the English
         * master wording. JavaScript replaces known interface
         * strings without damaging links, HTML structure,
         * images or branding.
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

                oneBrandThreeWorlds:
                    "One brand. Three worlds.",

                chooseExperience:
                    "Choose your NEWITT experience.",

                aerialMedia:
                    "AERIAL MEDIA",

                paranormalInvestigation:
                    "PARANORMAL INVESTIGATION",

                photography:
                    "PHOTOGRAPHY",

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

                oneBrandThreeWorlds:
                    "Un brand. Tair byd.",

                chooseExperience:
                    "Dewiswch eich profiad NEWITT.",

                aerialMedia:
                    "CYFRYNGAU AWYR",

                paranormalInvestigation:
                    "YMCHWILIAD PARANORMAL",

                photography:
                    "FFOTOGRAFFIAETH",

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

                oneBrandThreeWorlds:
                    "Une marque. Trois univers.",

                chooseExperience:
                    "Choisissez votre expérience NEWITT.",

                aerialMedia:
                    "MÉDIA AÉRIEN",

                paranormalInvestigation:
                    "ENQUÊTE PARANORMALE",

                photography:
                    "PHOTOGRAPHIE",

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

                oneBrandThreeWorlds:
                    "Eine Marke. Drei Welten.",

                chooseExperience:
                    "Wählen Sie Ihr NEWITT Erlebnis.",

                aerialMedia:
                    "LUFTMEDIEN",

                paranormalInvestigation:
                    "PARANORMALE ERMITTLUNG",

                photography:
                    "FOTOGRAFIE",

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

                oneBrandThreeWorlds:
                    "Una marca. Tres mundos.",

                chooseExperience:
                    "Elige tu experiencia NEWITT.",

                aerialMedia:
                    "MEDIOS AÉREOS",

                paranormalInvestigation:
                    "INVESTIGACIÓN PARANORMAL",

                photography:
                    "FOTOGRAFÍA",

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

                    <button
                        type="button"
                        data-lang="en"
                    >
                        English
                    </button>

                    <button
                        type="button"
                        data-lang="cy"
                    >
                        Cymraeg
                    </button>

                    <button
                        type="button"
                        data-lang="fr"
                    >
                        Français
                    </button>

                    <button
                        type="button"
                        data-lang="de"
                    >
                        Deutsch
                    </button>

                    <button
                        type="button"
                        data-lang="es"
                    >
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


        if (
            languageToggle &&
            languageMenu
        ) {


            const closeLanguageMenu = () => {

                languageToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                languageMenu.hidden =
                    true;

            };


            const openLanguageMenu = () => {

                languageToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

                languageMenu.hidden =
                    false;

            };


            languageToggle.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();


                    const isOpen =
                        languageToggle.getAttribute(
                            "aria-expanded"
                        ) === "true";


                    if (isOpen) {

                        closeLanguageMenu();

                    } else {

                        openLanguageMenu();

                    }

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


                            if (
                                !SUPPORTED_LANGUAGES.includes(
                                    language
                                )
                            ) {

                                return;

                            }


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


            /* =================================================
               LANGUAGE TRANSLATION HELPERS
            ================================================= */

            const translateNavigation = (
                dictionary
            ) => {

                const nav =
                    document.querySelector(
                        ".nav-links"
                    );


                if (!nav) {

                    return;

                }


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

            };


            const translateButton = (
                button,
                dictionary
            ) => {

                const href =
                    button.getAttribute(
                        "href"
                    ) || "";


                const original =
                    button.dataset.newittOriginalText ||
                    button.textContent.trim();


                if (
                    !button.dataset.newittOriginalText
                ) {

                    button.dataset.newittOriginalText =
                        original;

                }


                const text =
                    normalise(
                        button.dataset.newittOriginalText
                    );


                if (
                    text ===
                    "explore newitt media"
                ) {

                    button.textContent =
                        dictionary.explore;

                    return;

                }


                if (
                    text ===
                    "get in touch"
                ) {

                    button.textContent =
                        dictionary.getInTouch;

                    return;

                }


                if (
                    text ===
                    "visit skyline" &&
                    href.includes(
                        "skyline.html"
                    )
                ) {

                    button.textContent =
                        dictionary.visitSkyline;

                    return;

                }


                if (
                    text ===
                    "enter the paranormal" &&
                    href.includes(
                        "paranormal.html"
                    )
                ) {

                    button.textContent =
                        dictionary.enterParanormal;

                    return;

                }


                if (
                    text ===
                    "visit photography" &&
                    href.includes(
                        "photography.html"
                    )
                ) {

                    button.textContent =
                        dictionary.visitPhotography;

                }

            };


            const translateButtons = (
                dictionary
            ) => {

                document
                    .querySelectorAll(
                        ".button"
                    )
                    .forEach((button) => {

                        translateButton(
                            button,
                            dictionary
                        );

                    });

            };


            const translateHome = (
                dictionary
            ) => {

                if (
                    !document.body.classList.contains(
                        "home-page"
                    )
                ) {

                    return;

                }


                /*
                 * One brand. Three worlds.
                 */

                document
                    .querySelectorAll(
                        ".section-heading .eyebrow"
                    )
                    .forEach((element) => {

                        const original =
                            element.dataset
                                .newittOriginalText ||
                            element.textContent.trim();


                        if (
                            !element.dataset
                                .newittOriginalText
                        ) {

                            element.dataset
                                .newittOriginalText =
                                    original;

                        }


                        if (
                            normalise(original) ===
                            "one brand. three worlds."
                        ) {

                            element.textContent =
                                dictionary
                                    .oneBrandThreeWorlds;

                        }

                    });


                /*
                 * Choose your NEWITT experience.
                 *
                 * The heading is kept as two pieces so
                 * the existing gold span remains intact.
                 */

                const experienceHeading =
                    Array.from(
                        document.querySelectorAll(
                            ".section-heading h2"
                        )
                    ).find((heading) => {

                        return normalise(
                            heading.textContent
                        ).includes(
                            "choose your newitt experience"
                        );

                    });


                if (experienceHeading) {

                    const span =
                        experienceHeading.querySelector(
                            "span"
                        );


                    if (span) {

                        const existingPrefix =
                            experienceHeading
                                .childNodes[0];


                        if (
                            existingPrefix &&
                            existingPrefix.nodeType ===
                            Node.TEXT_NODE
                        ) {

                            existingPrefix.textContent =
                                dictionary
                                    .chooseExperience
                                    .replace(
                                        /newitt experience\.$/i,
                                        ""
                                    );

                        }


                        span.textContent =
                            dictionary
                                .chooseExperience
                                .match(
                                    /newitt experience\.$/i
                                )
                                ? "NEWITT experience."
                                : dictionary
                                    .chooseExperience;

                    }

                }


                /*
                 * Social ticker
                 */

                document
                    .querySelectorAll(
                        ".social-ticker-track span"
                    )
                    .forEach((element) => {

                        element.textContent =
                            dictionary.followSocial;

                    });

            };


            function setLanguage(language) {

                if (
                    !SUPPORTED_LANGUAGES.includes(
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


                document.documentElement.lang =
                    language;


                try {

                    localStorage.setItem(
                        LANGUAGE_KEY,
                        language
                    );

                } catch (error) {

                    /* Storage unavailable. */

                }


                languageToggle.textContent =
                    language.toUpperCase();


                languageToggle.setAttribute(
                    "aria-label",
                    `Language: ${LANGUAGE_NAMES[language]}`
                );


                translateNavigation(
                    dictionary
                );


                translateButtons(
                    dictionary
                );


                translateHome(
                    dictionary
                );


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

            }


            let savedLanguage =
                "en";


            try {

                const storedLanguage =
                    localStorage.getItem(
                        LANGUAGE_KEY
                    );


                if (
                    storedLanguage &&
                    SUPPORTED_LANGUAGES.includes(
                        storedLanguage
                    )
                ) {

                    savedLanguage =
                        storedLanguage;

                }

            } catch (error) {

                savedLanguage =
                    "en";

            }


            setLanguage(
                savedLanguage
            );

        }


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

                    lightboxImage.removeAttribute(
                        "alt"
                    );

                }

            };


            const openLightbox = (
                image
            ) => {

                if (!lightboxImage) {

                    return;

                }


                const parentLink =
                    image.closest("a");


                const fullImage =
                    parentLink &&
                    parentLink.href
                        ? parentLink.href
                        : image.currentSrc ||
                          image.src;


                if (!fullImage) {

                    return;

                }


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


                if (closeButton) {

                    closeButton.focus();

                }

            };


            galleryImages.forEach(
                (image) => {

                    image.addEventListener(
                        "click",
                        (event) => {

                            event.preventDefault();

                            openLightbox(
                                image
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


                        /*
                         * #top should always return to
                         * the very top of the page.
                         */

                        if (
                            targetId === "#top"
                        ) {

                            event.preventDefault();


                            window.scrollTo({

                                top: 0,

                                behavior:
                                    prefersReducedMotion()
                                        ? "auto"
                                        : "smooth"

                            });


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

                            behavior:
                                prefersReducedMotion()
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

                        image.setAttribute(
                            "data-image-error",
                            "true"
                        );

                    },
                    {
                        once: true
                    }
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
           LANGUAGE MENU KEYBOARD ACCESS
        ===================================================== */

        if (
            languageSelector &&
            languageToggle &&
            languageMenu
        ) {

            languageToggle.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key === "ArrowDown" ||
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        languageToggle.click();

                        const firstLanguage =
                            languageMenu.querySelector(
                                "[data-lang]"
                            );


                        if (firstLanguage) {

                            firstLanguage.focus();

                        }

                    }

                }
            );


            languageMenu
                .querySelectorAll(
                    "[data-lang]"
                )
                .forEach((button, index, buttons) => {

                    button.addEventListener(
                        "keydown",
                        (event) => {

                            if (
                                event.key === "ArrowDown"
                            ) {

                                event.preventDefault();

                                const next =
                                    buttons[
                                        (index + 1) %
                                        buttons.length
                                    ];

                                next.focus();

                            }


                            if (
                                event.key === "ArrowUp"
                            ) {

                                event.preventDefault();

                                const previous =
                                    buttons[
                                        (index - 1 +
                                            buttons.length) %
                                        buttons.length
                                    ];

                                previous.focus();

                            }


                            if (
                                event.key === "Escape"
                            ) {

                                event.preventDefault();

                                languageToggle.click();

                                languageToggle.focus();

                            }

                        }
                    );

                });

        }


        /* =====================================================
           PAGE READY FLAG
        ===================================================== */

        document.documentElement.classList.add(
            "newitt-js-ready"
        );


    });

})();
