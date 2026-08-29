/* =========================================================
   NEWITT MEDIA
   MASTER SCRIPT

   Opening animation
   Mobile navigation
   Back to top
   Language system
   Gallery / lightbox
   Smooth scrolling
   Image safety
   External-link safety

   LANGUAGE SYSTEM
   English
   Cymraeg
   Français
   Deutsch
   Español
========================================================= */

(() => {
    "use strict";


    /* =====================================================
       READY
    ===================================================== */

    const ready = (fn) => {

        if (document.readyState === "loading") {

            document.addEventListener(
                "DOMContentLoaded",
                fn,
                { once: true }
            );

        } else {

            fn();

        }

    };


    ready(() => {


        /* =====================================================
           OPENING ANIMATION
        ===================================================== */

        const intro =
            document.getElementById("site-intro");


        if (intro) {

            const INTRO_SEEN_KEY =
                "newittMediaIntroSeen";


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

                intro.setAttribute(
                    "hidden",
                    ""
                );

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
                        INTRO_SEEN_KEY,
                        "true"
                    );

                } catch (error) {

                    /* Storage unavailable. */

                }


                window.setTimeout(
                    revealSite,
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


                    const isOpen =
                        menuToggle.getAttribute(
                            "aria-expanded"
                        ) === "true";


                    menuToggle.setAttribute(
                        "aria-expanded",
                        String(!isOpen)
                    );


                    menuToggle.setAttribute(
                        "aria-label",
                        isOpen
                            ? "Open navigation menu"
                            : "Close navigation menu"
                    );


                    navLinks.classList.toggle(
                        "open",
                        !isOpen
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


        const TRANSLATIONS = {


            /* =================================================
               ENGLISH
            ================================================= */

            en: {

                navHome: "Home",

                navSkyline: "Skyline",

                navParanormal: "Paranormal",

                navPhotography: "Photography",

                navContact: "Contact",

                explore: "Explore NEWITT Media",

                getInTouch: "Get in Touch",

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


            /* =================================================
               WELSH
            ================================================= */

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


            /* =================================================
               FRENCH
            ================================================= */

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


            /* =================================================
               GERMAN
            ================================================= */

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


            /* =================================================
               SPANISH
            ================================================= */

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
           FIND / CREATE LANGUAGE SELECTOR
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


            /* ================================================
               CLOSE LANGUAGE MENU
            ================================================= */

            const closeLanguageMenu = () => {

                languageToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                languageMenu.hidden =
                    true;

            };


            /* ================================================
               OPEN / CLOSE
            ================================================= */

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


            /* ================================================
               LANGUAGE BUTTONS
            ================================================= */

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


            /* ================================================
               CLICK OUTSIDE
            ================================================= */

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


            /* ================================================
               ESCAPE
            ================================================= */

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


            /* ================================================
               SET LANGUAGE
            ================================================= */

            function setLanguage(
                language
            ) {

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


                /* --------------------------------------------
                   HTML LANGUAGE
                -------------------------------------------- */

                document.documentElement.lang =
                    language === "cy"
                        ? "cy"
                        : language;


                /* --------------------------------------------
                   SAVE LANGUAGE
                -------------------------------------------- */

                try {

                    localStorage.setItem(
                        LANGUAGE_KEY,
                        language
                    );

                } catch (error) {

                    /* Storage unavailable. */

                }


                /* --------------------------------------------
                   BUTTON
                -------------------------------------------- */

                languageToggle.textContent =
                    language.toUpperCase();


                languageToggle.setAttribute(
                    "aria-label",
                    `Language: ${LANGUAGE_NAMES[language]}`
                );


                /* --------------------------------------------
                   NAVIGATION
                -------------------------------------------- */

                const nav =
                    document.querySelector(
                        ".nav-links"
                    );


                if (nav) {

                    const navItems =
                        nav.querySelectorAll(
                            "a"
                        );


                    navItems.forEach(
                        (link) => {

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

                        }
                    );

                }


                /* --------------------------------------------
                   COMMON BUTTONS
                -------------------------------------------- */

                document
                    .querySelectorAll(
                        ".button"
                    )
                    .forEach((button) => {

                        const href =
                            button.getAttribute(
                                "href"
                            );


                        const text =
                            button.textContent
                                .trim()
                                .toLowerCase();


                        if (
                            text.includes(
                                "get in touch"
                            ) ||
                            text.includes(
                                "nous contacter"
                            ) ||
                            text.includes(
                                "kontakt"
                            ) ||
                            text.includes(
                                "contactar"
                            ) ||
                            text.includes(
                                "cysylltu"
                            )
                        ) {

                            button.textContent =
                                dictionary.getInTouch;

                        }


                        if (
                            text.includes(
                                "explore newitt"
                            )
                        ) {

                            button.textContent =
                                dictionary.explore;

                        }


                        if (
                            href &&
                            href.includes(
                                "skyline.html"
                            ) &&
                            (
                                text.includes(
                                    "visit skyline"
                                ) ||
                                text.includes(
                                    "skyline besuchen"
                                ) ||
                                text.includes(
                                    "visitar skyline"
                                ) ||
                                text.includes(
                                    "visiter skyline"
                                ) ||
                                text.includes(
                                    "ewch i skyline"
                                )
                            )
                        ) {

                            button.textContent =
                                dictionary.visitSkyline;

                        }


                        if (
                            href &&
                            href.includes(
                                "paranormal.html"
                            ) &&
                            (
                                text.includes(
                                    "enter the paranormal"
                                ) ||
                                text.includes(
                                    "zum paranormalen"
                                ) ||
                                text.includes(
                                    "entrar en lo paranormal"
                                ) ||
                                text.includes(
                                    "entrer dans le paranormal"
                                ) ||
                                text.includes(
                                    "ewch i'r paranormal"
                                )
                            )
                        ) {

                            button.textContent =
                                dictionary.enterParanormal;

                        }


                        if (
                            href &&
                            href.includes(
                                "photography.html"
                            ) &&
                            (
                                text.includes(
                                    "visit photography"
                                ) ||
                                text.includes(
                                    "fotografie ansehen"
                                ) ||
                                text.includes(
                                    "ver fotografía"
                                ) ||
                                text.includes(
                                    "voir la photographie"
                                ) ||
                                text.includes(
                                    "ewch i ffotograffiaeth"
                                )
                            )
                        ) {

                            button.textContent =
                                dictionary.visitPhotography;

                        }

                    });


                /* --------------------------------------------
                   HOME PAGE HEADINGS
                -------------------------------------------- */

                const homePage =
                    document.body.classList.contains(
                        "home-page"
                    );


                if (homePage) {

                    const eybrows =
                        document.querySelectorAll(
                            ".section-heading .eyebrow"
                        );


                    eybrows.forEach(
                        (element) => {

                            const text =
                                element.textContent
                                    .trim()
                                    .toLowerCase();


                            if (
                                text.includes(
                                    "one brand"
                                ) ||
                                text.includes(
                                    "un brand"
                                ) ||
                                text.includes(
                                    "une marque"
                                ) ||
                                text.includes(
                                    "eine marke"
                                ) ||
                                text.includes(
                                    "una marca"
                                )
                            ) {

                                element.textContent =
                                    dictionary.oneBrandThreeWorlds;

                            }

                        }
                    );


                    const headings =
                        document.querySelectorAll(
                            ".section-heading h2"
                        );


                    headings.forEach(
                        (heading) => {

                            const text =
                                heading.textContent
                                    .replace(
                                        /\s+/g,
                                        " "
                                    )
                                    .trim()
                                    .toLowerCase();


                            if (
                                text.includes(
                                    "choose your"
                                ) ||
                                text.includes(
                                    "choisissez"
                                ) ||
                                text.includes(
                                    "wählen"
                                ) ||
                                text.includes(
                                    "elige"
                                ) ||
                                text.includes(
                                    "dewiswch"
                                )
                            ) {

                                const span =
                                    heading.querySelector(
                                        "span"
                                    );


                                heading.childNodes
                                    .forEach(
                                        (node) => {

                                            if (
                                                node.nodeType ===
                                                Node.TEXT_NODE
                                            ) {

                                                if (
                                                    node.textContent
                                                        .trim()
                                                        .length
                                                ) {

                                                    node.textContent =
                                                        dictionary
                                                            .chooseExperience
                                                            .replace(
                                                                dictionary
                                                                    .chooseExperience
                                                                    .split(
                                                                        " "
                                                                    )
                                                                    .slice(
                                                                        2
                                                                    )
                                                                    .join(
                                                                        " "
                                                                    ),
                                                                ""
                                                            );

                                                }

                                            }

                                        }
                                    );


                                if (span) {

                                    span.textContent =
                                        dictionary
                                            .chooseExperience
                                            .replace(
                                                /^[^.]*?choose your\s*/i,
                                                ""
                                            )
                                            .replace(
                                                /^[^.]*?choisissez votre\s*/i,
                                                ""
                                            )
                                            .replace(
                                                /^[^.]*?wählen sie\s*/i,
                                                ""
                                            )
                                            .replace(
                                                /^[^.]*?elige tu\s*/i,
                                                ""
                                            )
                                            .replace(
                                                /^[^.]*?dewiswch eich\s*/i,
                                                ""
                                            );

                                }

                            }

                        }
                    );

                }


                /* --------------------------------------------
                   SOCIAL TICKER
                -------------------------------------------- */

                document
                    .querySelectorAll(
                        ".social-ticker-track span"
                    )
                    .forEach(
                        (element) => {

                            element.textContent =
                                dictionary.followSocial;

                        }
                    );


                /* --------------------------------------------
                   LANGUAGE EVENT
                -------------------------------------------- */

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


            /* ================================================
               LOAD SAVED LANGUAGE
            ================================================= */

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
                    {
                        once: true
                    }
                );

            });


        /* =====================================================
           PAGE READY
        ===================================================== */

        document.documentElement.classList.add(
            "newitt-js-ready"
        );


        /* =====================================================
           EXTERNAL SOCIAL LINKS
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


    });

})();
