/* =========================================================
   NEWITT MEDIA
   MASTER LANGUAGE SYSTEM
   ENGLISH / CYMRAEG
   NEWITT MEDIA 2.0
   PASS 2 - STABLE MASTER LANGUAGE ENGINE
   30 AUGUST 2026

   Supports:
   - data-lang-en / data-lang-cy
   - legacy data-lang="en" / data-lang="cy"
   - data-aria-en / data-aria-cy
   - shared language preference across pages
   - dynamically-created EN / CY selector
   - keyboard accessibility
   - mobile navigation compatibility
   - Safari / iOS resilience
   - NO COOKIES
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       LANGUAGE STORAGE
    ====================================================== */

    const LANGUAGE_KEY =
        "newittLanguage";

    const LEGACY_LANGUAGE_KEY =
        "newitt-language";


    /* =====================================================
       VALID LANGUAGES
    ====================================================== */

    const LANGUAGES = {
        ENGLISH: "en",
        WELSH: "cy"
    };


    /* =====================================================
       GET STORED LANGUAGE
    ====================================================== */

    function getStoredLanguage() {

        try {

            const stored =
                localStorage.getItem(
                    LANGUAGE_KEY
                );


            if (
                stored === LANGUAGES.ENGLISH ||
                stored === LANGUAGES.WELSH
            ) {

                return stored;

            }


            const legacyStored =
                localStorage.getItem(
                    LEGACY_LANGUAGE_KEY
                );


            if (
                legacyStored === LANGUAGES.ENGLISH ||
                legacyStored === LANGUAGES.WELSH
            ) {

                /*
                 * Migrate the older preference into
                 * the master storage key.
                 */

                localStorage.setItem(
                    LANGUAGE_KEY,
                    legacyStored
                );


                return legacyStored;

            }

        } catch (error) {

            /*
             * Local storage may be unavailable,
             * restricted or blocked by the browser.
             */

        }


        return LANGUAGES.ENGLISH;

    }


    /* =====================================================
       SAVE LANGUAGE
    ====================================================== */

    function saveLanguage(language) {

        try {

            localStorage.setItem(
                LANGUAGE_KEY,
                language
            );


            /*
             * Keep the legacy key synchronised so
             * older pages cannot accidentally restore
             * a different language.
             */

            localStorage.setItem(
                LEGACY_LANGUAGE_KEY,
                language
            );

        } catch (error) {

            /*
             * The site continues working normally even
             * when localStorage is unavailable.
             */

        }

    }


    /* =====================================================
       UPDATE MASTER TEXT
       
       New system:
       
       data-lang-en="English"
       data-lang-cy="Welsh"
    ====================================================== */

    function updateMasterText(language) {

        document
            .querySelectorAll(
                "[data-lang-en][data-lang-cy]"
            )
            .forEach(
                function (element) {

                    const english =
                        element.getAttribute(
                            "data-lang-en"
                        );


                    const welsh =
                        element.getAttribute(
                            "data-lang-cy"
                        );


                    const translated =
                        language ===
                        LANGUAGES.WELSH
                            ? welsh
                            : english;


                    if (
                        translated !== null
                    ) {

                        element.textContent =
                            translated;

                    }

                }
            );

    }


    /* =====================================================
       UPDATE LEGACY TEXT
       
       Older system:
       
       data-lang="en"
       data-lang="cy"
       
       These elements are hidden/shown rather than having
       their text replaced.
    ====================================================== */

    function updateLegacyText(language) {

        document
            .querySelectorAll(
                "[data-lang]"
            )
            .forEach(
                function (element) {

                    /*
                     * Ignore elements belonging to the
                     * newer master translation system.
                     */

                    if (
                        element.hasAttribute(
                            "data-lang-en"
                        ) ||
                        element.hasAttribute(
                            "data-lang-cy"
                        )
                    ) {

                        return;

                    }


                    const elementLanguage =
                        element.getAttribute(
                            "data-lang"
                        );


                    element.hidden =
                        elementLanguage !==
                        language;

                }
            );

    }


    /* =====================================================
       UPDATE ARIA LABELS
       
       Supports:
       
       data-aria-en
       data-aria-cy
    ====================================================== */

    function updateAria(language) {

        document
            .querySelectorAll(
                "[data-aria-en][data-aria-cy]"
            )
            .forEach(
                function (element) {

                    const english =
                        element.getAttribute(
                            "data-aria-en"
                        );


                    const welsh =
                        element.getAttribute(
                            "data-aria-cy"
                        );


                    const translated =
                        language ===
                        LANGUAGES.WELSH
                            ? welsh
                            : english;


                    if (
                        translated !== null
                    ) {

                        element.setAttribute(
                            "aria-label",
                            translated
                        );

                    }

                }
            );

    }


    /* =====================================================
       UPDATE HTML LANGUAGE
    ====================================================== */

    function updateHtmlLanguage(language) {

        document.documentElement.lang =
            language ===
            LANGUAGES.WELSH
                ? "cy-GB"
                : "en-GB";

    }


    /* =====================================================
       UPDATE LANGUAGE SELECTOR
    ====================================================== */

    function updateSelector(language) {

        const selector =
            document.getElementById(
                "newitt-language-selector"
            );


        if (!selector) {

            return;

        }


        const buttons =
            selector.querySelectorAll(
                "button"
            );


        buttons.forEach(
            function (button) {

                const buttonLanguage =
                    button.getAttribute(
                        "data-language"
                    );


                const active =
                    buttonLanguage ===
                    language;


                button.classList.toggle(
                    "active",
                    active
                );


                button.setAttribute(
                    "aria-pressed",
                    active
                        ? "true"
                        : "false"
                );

            }
        );


        selector.setAttribute(
            "aria-label",
            language ===
            LANGUAGES.WELSH
                ? "Iaith"
                : "Language"
        );

    }


    /* =====================================================
       UPDATE OLD LANGUAGE SELECTORS
       
       Kept for compatibility with pages which have not
       yet been migrated completely.
    ====================================================== */

    function updateLegacySelector(language) {

        const englishButton =
            document.getElementById(
                "language-en"
            );


        const welshButton =
            document.getElementById(
                "language-cy"
            );


        if (englishButton) {

            const active =
                language ===
                LANGUAGES.ENGLISH;


            englishButton.classList.toggle(
                "active",
                active
            );


            englishButton.setAttribute(
                "aria-pressed",
                active
                    ? "true"
                    : "false"
            );

        }


        if (welshButton) {

            const active =
                language ===
                LANGUAGES.WELSH;


            welshButton.classList.toggle(
                "active",
                active
            );


            welshButton.setAttribute(
                "aria-pressed",
                active
                    ? "true"
                    : "false"
            );

        }

    }


    /* =====================================================
       SET LANGUAGE
    ====================================================== */

    function setLanguage(language) {

        if (
            language !== LANGUAGES.ENGLISH &&
            language !== LANGUAGES.WELSH
        ) {

            language =
                LANGUAGES.ENGLISH;

        }


        saveLanguage(
            language
        );


        updateMasterText(
            language
        );


        updateLegacyText(
            language
        );


        updateAria(
            language
        );


        updateHtmlLanguage(
            language
        );


        updateSelector(
            language
        );


        updateLegacySelector(
            language
        );


        /*
         * Notify any other NEWITT Media scripts that
         * the language has changed.
         */

        try {

            window.dispatchEvent(
                new CustomEvent(
                    "newittLanguageChanged",
                    {
                        detail: {
                            language:
                                language
                        }
                    }
                )
            );

        } catch (error) {

            /*
             * Older Safari versions may not support
             * CustomEvent construction in every context.
             */

        }

    }


    /* =====================================================
       CREATE MASTER SELECTOR
    ====================================================== */

    function createSelector() {

        /*
         * Never create a duplicate.
         */

        if (
            document.getElementById(
                "newitt-language-selector"
            )
        ) {

            return;

        }


        /*
         * If an older selector already exists,
         * leave it alone.
         */

        if (
            document.getElementById(
                "language-en"
            ) ||
            document.getElementById(
                "language-cy"
            )
        ) {

            return;

        }


        const selector =
            document.createElement(
                "div"
            );


        selector.id =
            "newitt-language-selector";


        selector.setAttribute(
            "role",
            "group"
        );


        selector.setAttribute(
            "aria-label",
            "Language"
        );


        selector.setAttribute(
            "data-aria-en",
            "Language"
        );


        selector.setAttribute(
            "data-aria-cy",
            "Iaith"
        );


        /* =================================================
           ENGLISH BUTTON
        ================================================== */

        const english =
            document.createElement(
                "button"
            );


        english.type =
            "button";


        english.textContent =
            "EN";


        english.setAttribute(
            "data-language",
            LANGUAGES.ENGLISH
        );


        english.setAttribute(
            "aria-label",
            "English"
        );


        english.setAttribute(
            "title",
            "English"
        );


        english.setAttribute(
            "aria-pressed",
            "false"
        );


        /* =================================================
           DIVIDER
        ================================================== */

        const divider =
            document.createElement(
                "span"
            );


        divider.textContent =
            "|";


        divider.setAttribute(
            "aria-hidden",
            "true"
        );


        /* =================================================
           WELSH BUTTON
        ================================================== */

        const welsh =
            document.createElement(
                "button"
            );


        welsh.type =
            "button";


        welsh.textContent =
            "CY";


        welsh.setAttribute(
            "data-language",
            LANGUAGES.WELSH
        );


        welsh.setAttribute(
            "aria-label",
            "Cymraeg"
        );


        welsh.setAttribute(
            "title",
            "Cymraeg"
        );


        welsh.setAttribute(
            "aria-pressed",
            "false"
        );


        /* =================================================
           BUTTON EVENTS
        ================================================== */

        english.addEventListener(
            "click",
            function () {

                setLanguage(
                    LANGUAGES.ENGLISH
                );

            }
        );


        welsh.addEventListener(
            "click",
            function () {

                setLanguage(
                    LANGUAGES.WELSH
                );

            }
        );


        /* =================================================
           BUILD SELECTOR
        ================================================== */

        selector.appendChild(
            english
        );


        selector.appendChild(
            divider
        );


        selector.appendChild(
            welsh
        );


        /* =================================================
           INSERT INTO MASTER NAV
        ================================================= */

        const nav =
            document.querySelector(
                ".nav"
            );


        if (!nav) {

            return;

        }


        /*
         * The selector is deliberately placed inside
         * the master navigation container.
         *
         * CSS controls its desktop/mobile presentation.
         * JavaScript does not move it based on screen size.
         */

        nav.appendChild(
            selector
        );

    }


    /* =====================================================
       HANDLE DYNAMIC CONTENT
       
       Allows language translation to be refreshed if
       another script inserts translated elements.
    ====================================================== */

    function refreshLanguage() {

        setLanguage(
            getStoredLanguage()
        );

    }


    /* =====================================================
       PUBLIC API
       
       Allows other NEWITT Media scripts to change or
       retrieve the current language without touching
       internal functions.
    ====================================================== */

    window.NEWITTLanguage = {

        set:
            setLanguage,

        get:
            getStoredLanguage,

        refresh:
            refreshLanguage

    };


    /* =====================================================
       INITIALISE
    ====================================================== */

    function initialise() {

        createSelector();


        setLanguage(
            getStoredLanguage()
        );

    }


    /* =====================================================
       DOM READY
    ====================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialise,
            {
                once: true
            }
        );

    } else {

        initialise();

    }


})();
