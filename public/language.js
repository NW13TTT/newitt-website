/* =========================================================
   NEWITT MEDIA
   LANGUAGE SYSTEM
   NEWITT MEDIA 2.0
   ENGLISH / CYMRAEG
   PRIVACY-FIRST
   NO COOKIES
========================================================= */

(function () {

    "use strict";

    const LANGUAGE_KEY = "newittLanguage";

    const translations = {

        cy: {

            "Home": "Cartref",
            "Skyline": "Skyline",
            "Paranormal": "Paranormal",
            "Photography": "Ffotograffiaeth",
            "Contact": "Cysylltu",

            "Open navigation menu": "Agor y ddewislen lywio",
            "Close navigation menu": "Cau'r ddewislen lywio",

            "Follow on TikTok": "Dilynwch ar TikTok",
            "YouTube": "YouTube",
            "Instagram": "Instagram",
            "Facebook": "Facebook",

            "Explore": "Archwilio",
            "Get in Touch": "Cysylltu",
            "Contact Us": "Cysylltwch â Ni",

            "Photography": "Ffotograffiaeth",

            "Follow the adventure.": "Dilynwch yr antur.",
            "Follow the investigation.": "Dilynwch yr ymchwiliad.",

            "The Adventure": "Yr Antur",
            "Current Adventures": "Anturiaethau Cyfredol",
            "Our Approach": "Ein Dull",
            "The Kit": "Yr Offer",
            "Safety": "Diogelwch",

            "Privacy & Safety": "Preifatrwydd a Diogelwch",

            "The adventure continues.": "Mae'r antur yn parhau.",

            "Explore Skyline": "Archwilio Skyline",
            "Explore Photography": "Archwilio Ffotograffiaeth",

            "NEWITT MEDIA": "NEWITT MEDIA",

            "After Dark.": "Ar Ôl Tywyllwch.",

            "Into the unknown.": "I'r anhysbys.",

            "Where we're going.": "I Ble Rydym yn Mynd.",

            "Explore. Investigate. Document.":
                "Archwilio. Ymchwilio. Dogfennu.",

            "What comes with us.": "Beth sy'n dod gyda ni.",

            "More locations. More adventures.":
                "Mwy o leoliadau. Mwy o anturiaethau.",

            "Ready to explore?":
                "Barod i archwilio?",

            "FROM ABOVE. AFTER DARK. AND EVERYTHING IN BETWEEN.":
                "O'R AWYR. AR ÔL TYWYLLWCH. A PHOPETH RHWNG Y DDAU.",

            "Different perspectives. One NEWITT Media.":
                "Safbwyntiau gwahanol. Un NEWITT Media.",

            "All Rights Reserved.":
                "Cedwir pob hawl."

        }

    };


    function getLanguage() {

        try {

            const saved =
                localStorage.getItem(
                    LANGUAGE_KEY
                );

            if (
                saved === "cy" ||
                saved === "en"
            ) {

                return saved;

            }

        } catch (error) {}

        return "en";

    }


    function setLanguage(language) {

        if (
            language !== "en" &&
            language !== "cy"
        ) {

            language = "en";

        }


        try {

            localStorage.setItem(
                LANGUAGE_KEY,
                language
            );

        } catch (error) {}


        document.documentElement.lang =
            language === "cy"
                ? "cy"
                : "en-GB";


        translatePage(language);

        updateSelector(language);

    }


    function translatePage(language) {

        if (language === "en") {

            restoreEnglish();

            return;

        }


        const dictionary =
            translations[language];

        if (!dictionary) {
            return;
        }


        document
            .querySelectorAll(
                "a, button, h1, h2, h3, p, span, div"
            )
            .forEach(
                function (element) {

                    if (
                        element.children.length > 0
                    ) {

                        return;

                    }


                    const original =
                        element.dataset
                            .newittEnglish ||
                        element.textContent
                            .trim();


                    if (!original) {
                        return;
                    }


                    element.dataset
                        .newittEnglish =
                        original;


                    if (
                        dictionary[original]
                    ) {

                        element.textContent =
                            dictionary[original];

                    }

                }
            );


        translateAttributes(
            dictionary
        );

    }


    function restoreEnglish() {

        document
            .querySelectorAll(
                "[data-newitt-english]"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        element.dataset
                            .newittEnglish;

                }
            );


        document
            .querySelectorAll(
                "[data-newitt-original-label]"
            )
            .forEach(
                function (element) {

                    element.setAttribute(
                        "aria-label",
                        element.dataset
                            .newittOriginalLabel
                    );

                }
            );

    }


    function translateAttributes(dictionary) {

        document
            .querySelectorAll(
                "[aria-label]"
            )
            .forEach(
                function (element) {

                    const original =
                        element.dataset
                            .newittOriginalLabel ||
                        element.getAttribute(
                            "aria-label"
                        );

                    if (!original) {
                        return;
                    }


                    element.dataset
                        .newittOriginalLabel =
                        original;


                    if (
                        dictionary[original]
                    ) {

                        element.setAttribute(
                            "aria-label",
                            dictionary[original]
                        );

                    }

                }
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


        const wrapper =
            document.createElement(
                "div"
            );

        wrapper.id =
            "newitt-language-selector";


        wrapper.setAttribute(
            "aria-label",
            "Language"
        );


        const english =
            document.createElement(
                "button"
            );

        english.type = "button";

        english.textContent = "EN";

        english.setAttribute(
            "aria-label",
            "English"
        );


        const separator =
            document.createElement(
                "span"
            );

        separator.textContent = "|";

        separator.setAttribute(
            "aria-hidden",
            "true"
        );


        const welsh =
            document.createElement(
                "button"
            );

        welsh.type = "button";

        welsh.textContent = "CY";

        welsh.setAttribute(
            "aria-label",
            "Cymraeg"
        );


        english.addEventListener(
            "click",
            function () {

                setLanguage("en");

            }
        );


        welsh.addEventListener(
            "click",
            function () {

                setLanguage("cy");

            }
        );


        wrapper.appendChild(
            english
        );

        wrapper.appendChild(
            separator
        );

        wrapper.appendChild(
            welsh
        );


        const nav =
            document.querySelector(
                ".nav"
            );


        if (nav) {

            nav.appendChild(
                wrapper
            );

        }

    }


    function updateSelector(language) {

        const selector =
            document.getElementById(
                "newitt-language-selector"
            );


        if (!selector) {
            return;
        }


        selector
            .querySelectorAll("button")
            .forEach(
                function (button) {

                    button.classList.remove(
                        "active"
                    );

                }
            );


        const active =
            selector.querySelector(
                language === "cy"
                    ? "button:last-child"
                    : "button:first-child"
            );


        if (active) {

            active.classList.add(
                "active"
            );

        }

    }


    function initialise() {

        createSelector();

        setLanguage(
            getLanguage()
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
