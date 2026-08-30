/* =========================================================
   NEWITT MEDIA
   MASTER LANGUAGE SYSTEM
   ENGLISH / CYMRAEG
   NEWITT MEDIA 2.0
   NO COOKIES

   Supports:
   - data-lang-en / data-lang-cy
   - legacy data-lang="en" / data-lang="cy"
   - data-aria-en / data-aria-cy
   - shared language preference across pages
   - accessible language selector
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
       GET STORED LANGUAGE
    ====================================================== */

    function getStoredLanguage() {

        try {

            const stored =
                localStorage.getItem(
                    LANGUAGE_KEY
                );


            if (
                stored === "cy" ||
                stored === "en"
            ) {

                return stored;

            }


            const legacyStored =
                localStorage.getItem(
                    LEGACY_LANGUAGE_KEY
                );


            if (
                legacyStored === "cy" ||
                legacyStored === "en"
            ) {

                return legacyStored;

            }

        } catch (error) {

            /* Local storage may be unavailable. */

        }


        return "en";

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


            localStorage.setItem(
                LEGACY_LANGUAGE_KEY,
                language
            );

        } catch (error) {

            /* Local storage may be unavailable. */

        }

    }


    /* =====================================================
       UPDATE MASTER LANGUAGE ELEMENTS

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


                    element.textContent =
                        language === "cy"
                            ? welsh
                            : english;

                }
            );

    }


    /* =====================================================
       UPDATE LEGACY LANGUAGE ELEMENTS

       Older system:

       data-lang="en"
       data-lang="cy"
    ====================================================== */

    function updateLegacyText(language) {

        document
            .querySelectorAll(
                "[data-lang]"
            )
            .forEach(
                function (element) {

                    /*
                     * Ignore elements belonging to
                     * the newer language system.
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
                        elementLanguage !== language;

                }
            );

    }


    /* =====================================================
       UPDATE ARIA LABELS
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


                    element.setAttribute(
                        "aria-label",
                        language === "cy"
                            ? welsh
                            : english
                    );

                }
            );

    }


    /* =====================================================
       UPDATE HTML LANGUAGE
    ====================================================== */

    function updateHtmlLanguage(language) {

        document.documentElement.lang =
            language === "cy"
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


        if (selector) {

            const buttons =
                selector.querySelectorAll(
                    "button"
                );


            buttons.forEach(
                function (button) {

                    button.classList.remove(
                        "active"
                    );


                    button.setAttribute(
                        "aria-pressed",
                        "false"
                    );

                }
            );


            const active =
                language === "cy"
                    ? buttons[1]
                    : buttons[0];


            if (active) {

                active.classList.add(
                    "active"
                );


                active.setAttribute(
                    "aria-pressed",
                    "true"
                );

            }

        }


        /* =================================================
           LEGACY SELECTORS
        ================================================== */

        const englishButton =
            document.getElementById(
                "language-en"
            );


        const welshButton =
            document.getElementById(
                "language-cy"
            );


        if (englishButton) {

            englishButton.classList.toggle(
                "active",
                language === "en"
            );


            englishButton.setAttribute(
                "aria-pressed",
                language === "en"
                    ? "true"
                    : "false"
            );

        }


        if (welshButton) {

            welshButton.classList.toggle(
                "active",
                language === "cy"
            );


            welshButton.setAttribute(
                "aria-pressed",
                language === "cy"
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
            language !== "en" &&
            language !== "cy"
        ) {

            language = "en";

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

    }


    /* =====================================================
       CREATE MASTER LANGUAGE SELECTOR
    ====================================================== */

    function createSelector() {

        /*
         * Do not create a duplicate.
         */

        if (
            document.getElementById(
                "newitt-language-selector"
            )
        ) {

            return;

        }


        /*
         * Do not interfere with older manually
         * created language selectors.
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
                    "en"
                );

            }
        );


        welsh.addEventListener(
            "click",
            function () {

                setLanguage(
                    "cy"
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
           INSERT INTO NAVIGATION
        ================================================== */

        const nav =
            document.querySelector(
                ".nav"
            );


        if (nav) {

            nav.appendChild(
                selector
            );

        }

    }


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
