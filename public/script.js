/* =========================================================
   NEWITT MEDIA
   MASTER LANGUAGE SYSTEM
   ENGLISH / CYMRAEG
   NEWITT MEDIA 2.0
   NO COOKIES

   VERSION:
   30 AUGUST 2026

   Supports:
   - data-lang-en / data-lang-cy
   - legacy data-lang="en" / data-lang="cy"
   - data-aria-en / data-aria-cy
   - shared language preference across pages
   - nested HTML preservation
   - navigation language selector
   - accessibility labels

   IMPORTANT:
   The master system preserves nested HTML elements.
   This prevents highlighted <span> elements from being
   destroyed when the language changes.
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

            /*
             * Local storage may be unavailable.
             */

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


            /*
             * Keep the legacy key synchronised so older
             * NEWITT Media code cannot overwrite the
             * selected language accidentally.
             */

            localStorage.setItem(
                LEGACY_LANGUAGE_KEY,
                language
            );

        } catch (error) {

            /*
             * Local storage may be unavailable.
             */

        }

    }


    /* =====================================================
       UPDATE MASTER LANGUAGE ELEMENTS
       
       NEW SYSTEM:
       
       data-lang-en="English"
       data-lang-cy="Welsh"

       IMPORTANT:
       We preserve nested HTML inside the element.

       This means structures such as:

       <span>
           Into the
           <span>unknown.</span>
       </span>

       are not flattened when the language changes.
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


                    const translatedText =
                        language === "cy"
                            ? welsh
                            : english;


                    /*
                     * If the element contains child
                     * elements, preserve their structure
                     * while updating the visible language.
                     *
                     * The supplied data-lang text remains the
                     * source of truth for the element itself.
                     */


                    if (
                        element.children.length === 0
                    ) {

                        element.textContent =
                            translatedText;

                        return;

                    }


                    /*
                     * Special handling for nested spans.
                     *
                     * We preserve the existing child HTML
                     * structure and replace only the direct
                     * text content around those children.
                     */

                    const children =
                        Array.from(
                            element.children
                        );


                    if (
                        children.length === 1 &&
                        children[0].tagName === "SPAN"
                    ) {

                        const child =
                            children[0];


                        /*
                         * If the supplied translation contains
                         * a phrase followed by a highlighted
                         * child, keep the highlighted child.
                         *
                         * The existing HTML is deliberately
                         * preserved.
                         */

                        const childText =
                            child.textContent.trim();


                        if (
                            childText &&
                            translatedText
                                .toLowerCase()
                                .includes(
                                    childText.toLowerCase()
                                )
                        ) {

                            const index =
                                translatedText
                                    .toLowerCase()
                                    .indexOf(
                                        childText.toLowerCase()
                                    );


                            const before =
                                translatedText
                                    .slice(
                                        0,
                                        index
                                    )
                                    .trim();


                            const after =
                                translatedText
                                    .slice(
                                        index +
                                        childText.length
                                    )
                                    .trim();


                            element.innerHTML =
                                "";


                            if (before) {

                                element.appendChild(
                                    document.createTextNode(
                                        before + " "
                                    )
                                );

                            }


                            element.appendChild(
                                child
                            );


                            if (after) {

                                element.appendChild(
                                    document.createTextNode(
                                        " " + after
                                    )
                                );

                            }


                            return;

                        }

                    }


                    /*
                     * For complex nested structures, preserve
                     * the HTML structure rather than destroying
                     * it with textContent.
                     */

                    const originalHTML =
                        element.innerHTML;


                    /*
                     * If the translation differs from the
                     * current visible text, update only direct
                     * text nodes where possible.
                     */

                    const directTextNodes = [];


                    Array.from(
                        element.childNodes
                    ).forEach(
                        function (node) {

                            if (
                                node.nodeType ===
                                Node.TEXT_NODE
                            ) {

                                directTextNodes.push(
                                    node
                                );

                            }

                        }
                    );


                    if (
                        directTextNodes.length
                    ) {

                        /*
                         * Preserve child elements and update
                         * the surrounding direct text.
                         */

                        const firstText =
                            directTextNodes[0];


                        firstText.nodeValue =
                            translatedText;

                        directTextNodes
                            .slice(1)
                            .forEach(
                                function (node) {

                                    node.nodeValue =
                                        "";

                                }
                            );

                        return;

                    }


                    /*
                     * Final safe fallback.
                     *
                     * This is only reached when there is no
                     * useful nested structure to preserve.
                     */

                    if (
                        originalHTML !==
                        translatedText
                    ) {

                        element.textContent =
                            translatedText;

                    }

                }
            );

    }


    /* =====================================================
       UPDATE LEGACY LANGUAGE ELEMENTS
       
       OLDER SYSTEM:
       
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
                     * Ignore elements belonging to the
                     * newer master language system.
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


            buttons.forEach(
                function (button) {

                    if (
                        button !== active
                    ) {

                        button.setAttribute(
                            "aria-pressed",
                            "false"
                        );

                    }

                }
            );

        }


        /*
         * Support older manually-created selectors.
         */

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
       CREATE MASTER SELECTOR
    ====================================================== */

    function createSelector() {

        /*
         * Do not create a duplicate selector.
         */

        if (
            document.getElementById(
                "newitt-language-selector"
            )
        ) {

            return;

        }


        /*
         * Older pages currently have their own selector.
         * Leave those selectors alone while migration
         * continues.
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
