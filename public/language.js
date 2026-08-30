/* =========================================================
   NEWITT MEDIA
   MASTER LANGUAGE SYSTEM
   ENGLISH / CYMRAEG
   NEWITT MEDIA 2.0
   NO COOKIES
========================================================= */

(function () {

    "use strict";


    const LANGUAGE_KEY =
        "newittLanguage";


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

        } catch (error) {}


        return "en";

    }


    function saveLanguage(language) {

        try {

            localStorage.setItem(
                LANGUAGE_KEY,
                language
            );

        } catch (error) {}

    }


    function updateText(language) {

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


    function updateHtmlLanguage(language) {

        document.documentElement.lang =
            language === "cy"
                ? "cy"
                : "en-GB";

    }


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

        }

    }


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


        updateText(
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


    function createSelector() {

        if (
            document.getElementById(
                "newitt-language-selector"
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


        selector.appendChild(
            english
        );


        selector.appendChild(
            divider
        );


        selector.appendChild(
            welsh
        );


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


    function initialise() {

        createSelector();


        setLanguage(
            getStoredLanguage()
        );

    }


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
