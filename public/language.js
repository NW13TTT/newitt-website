/* =========================================================
   NEWITT MEDIA
   MASTER LANGUAGE SYSTEM
   UPDATE 2 OF 5

   Languages:
   🇬🇧 English
   🐉 Welsh

   Features:
   - English / Welsh switching
   - Flag-only selector
   - Remembers language choice
   - Updates visible text
   - Updates aria labels
   - Updates document language
   - Updates page title where supported
   - Works across every page
   - Mobile friendly
   - Safari / iPhone friendly
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       SETTINGS
    ====================================================== */

    const LANGUAGE_KEY =
        "newittMediaLanguage";


    const DEFAULT_LANGUAGE =
        "en";


    const SUPPORTED_LANGUAGES =
        ["en", "cy"];


    /* =====================================================
       LANGUAGE NAMES
    ====================================================== */

    const LANGUAGE_DATA = {

        en: {
            flag: "🇬🇧",
            name: "English",
            documentLanguage: "en-GB"
        },

        cy: {
            name: "Cymraeg",
            documentLanguage: "cy"
        }

    };


    /* =====================================================
       GET SAVED LANGUAGE
    ====================================================== */

    function getSavedLanguage() {

        let saved =
            DEFAULT_LANGUAGE;


        try {

            const stored =
                localStorage.getItem(
                    LANGUAGE_KEY
                );


            if (
                stored &&
                SUPPORTED_LANGUAGES.includes(
                    stored
                )
            ) {

                saved =
                    stored;

            }

        } catch (error) {

            saved =
                DEFAULT_LANGUAGE;

        }


        return saved;

    }


    /* =====================================================
       SAVE LANGUAGE
    ====================================================== */

    function saveLanguage(
        language
    ) {

        try {

            localStorage.setItem(
                LANGUAGE_KEY,
                language
            );

        } catch (error) {}

    }


    /* =====================================================
       CREATE LANGUAGE SELECTOR
    ====================================================== */

    function createLanguageSelector() {

        if (
            document.getElementById(
                "newitt-language-selector"
            )
        ) {

            return;

        }


        const nav =
            document.querySelector(
                ".nav"
            );


        if (!nav) {

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
            "Language selection"
        );


        selector.innerHTML = `

            <button
                type="button"
                data-language="en"
                aria-label="English"
                title="English"
            >
                🇬🇧
            </button>

            <span
                aria-hidden="true"
            >
                |
            </span>

            <button
                type="button"
                data-language="cy"
                aria-label="Cymraeg"
                title="Cymraeg"
                class="welsh-language-button"
            >
                <svg
                    class="welsh-flag"
                    viewBox="0 0 900 600"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Welsh flag"
                >
                    <rect
                        width="900"
                        height="600"
                        fill="#fff"
                    />

                    <path
                        d="M0 0h900v300H0z"
                        fill="#fff"
                    />

                    <path
                        d="M0 300h900v300H0z"
                        fill="#00853f"
                    />

                    <g
                        transform="translate(450 310)"
                    >
                        <path
                            d="
                                M0-205
                                C-24-185-31-160-20-137
                                C-12-120 8-113 18-97
                                C28-81 22-60 8-43
                                C-4-28-22-18-31-2
                                C-42 17-39 37-24 49
                                C-11 60 6 62 17 74
                                C29 88 27 109 16 126
                                C6 141-11 153-15 170
                                C-19 185-9 198 7 205
                                C23 212 42 206 50 193
                                C60 176 55 157 44 141
                                C34 126 18 115 20 96
                                C22 78 39 65 54 54
                                C73 40 85 23 83 4
                                C81-17 66-31 51-45
                                C34-61 28-78 35-97
                                C42-116 60-130 63-150
                                C66-170 52-191 34-200
                                C23-206 11-208 0-205
                                Z
                            "
                            fill="#c8102e"
                        />

                        <path
                            d="
                                M-63 187
                                C-39 176-28 158-28 139
                                C-28 119-41 106-52 92
                                C-66 74-70 55-60 38
                                C-50 20-31 11-21-4
                                C-10-21-14-42-28-56
                                C-42-70-61-79-66-97
                                C-71-116-59-135-41-145
                                C-22-156 0-151 16-139
                                C32-127 41-108 38-88
                                C35-68 20-54 6-40
                                C-9-25-10-10 1 4
                                C12 18 30 27 42 42
                                C56 59 58 80 47 98
                                C37 115 18 126 17 146
                                C16 166 31 181 50 187
                                C28 203-7 208-35 199
                                C-47 196-57 192-63 187
                                Z
                            "
                            fill="#c8102e"
                            opacity="0.95"
                        />
                    </g>
                </svg>
            </button>

        `;


        /*
         * Place selector at the end of
         * the navigation container.
         */

        nav.appendChild(
            selector
        );


        selector
            .querySelectorAll(
                "button[data-language]"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const language =
                                button.getAttribute(
                                    "data-language"
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

                        }
                    );

                }
            );

    }


    /* =====================================================
       APPLY LANGUAGE
    ====================================================== */

    function setLanguage(
        language
    ) {

        if (
            !SUPPORTED_LANGUAGES.includes(
                language
            )
        ) {

            language =
                DEFAULT_LANGUAGE;

        }


        saveLanguage(
            language
        );


        document.documentElement.lang =
            LANGUAGE_DATA[
                language
            ].documentLanguage;


        document.documentElement
            .setAttribute(
                "data-language",
                language
            );


        updateText(
            language
        );


        updateAriaLabels(
            language
        );


        updateSelectorState(
            language
        );


        updatePageTitle(
            language
        );

    }


    /* =====================================================
       UPDATE NORMAL TEXT
    ====================================================== */

    function updateText(
        language
    ) {

        document
            .querySelectorAll(
                "[data-lang-en][data-lang-cy]"
            )
            .forEach(
                function (element) {

                    const value =
                        element.getAttribute(
                            "data-lang-" +
                            language
                        );


                    if (
                        value === null
                    ) {

                        return;

                    }


                    /*
                     * Preserve HTML entities
                     * and intentionally supplied
                     * inline markup.
                     */

                    element.innerHTML =
                        value;

                }
            );

    }


    /* =====================================================
       UPDATE ARIA LABELS
    ====================================================== */

    function updateAriaLabels(
        language
    ) {

        document
            .querySelectorAll(
                "[data-aria-en][data-aria-cy]"
            )
            .forEach(
                function (element) {

                    const value =
                        element.getAttribute(
                            "data-aria-" +
                            language
                        );


                    if (
                        value === null
                    ) {

                        return;

                    }


                    element.setAttribute(
                        "aria-label",
                        value
                    );

                }
            );

    }


    /* =====================================================
       UPDATE SELECTOR STATE
    ====================================================== */

    function updateSelectorState(
        language
    ) {

        const selector =
            document.getElementById(
                "newitt-language-selector"
            );


        if (!selector) {

            return;

        }


        selector
            .querySelectorAll(
                "button[data-language]"
            )
            .forEach(
                function (button) {

                    const active =
                        button.getAttribute(
                            "data-language"
                        ) === language;


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

    }


    /* =====================================================
       PAGE TITLES
    ====================================================== */

    function updatePageTitle(
        language
    ) {

        const title =
            document.querySelector(
                "title"
            );


        if (!title) {

            return;

        }


        const page =
            document.body
                ? document.body.className
                : "";


        const titles = {

            "home-page": {

                en:
                    "NEWITT Media | From Above. After Dark. And Everything In Between.",

                cy:
                    "NEWITT Media | O'r Awyr. Ar ôl Tywyllwch. A Phopeth Rhwng y Ddau."

            },


            "skyline-page": {

                en:
                    "NEWITT Skyline Media | From Above.",

                cy:
                    "NEWITT Skyline Media | O'r Awyr."

            },


            "paranormal-page": {

                en:
                    "NEWITT's Paranormal Adventures | After Dark.",

                cy:
                    "Anturiaethau Paranormal NEWITT | Ar ôl Tywyllwch."

            },


            "photography-page": {

                en:
                    "NEWITT Media Photography | People. Places. Adventures.",

                cy:
                    "Ffotograffiaeth NEWITT Media | Pobl. Lleoedd. Anturiaethau."

            },


            "contact-page": {

                en:
                    "Contact NEWITT Media",

                cy:
                    "Cysylltu â NEWITT Media"

            },


            "privacy-page": {

                en:
                    "Privacy & Safety | NEWITT Media",

                cy:
                    "Preifatrwydd a Diogelwch | NEWITT Media"

            }

        };


        let pageTitles =
            null;


        Object.keys(
            titles
        ).some(
            function (pageClass) {

                if (
                    document.body.classList.contains(
                        pageClass
                    )
                ) {

                    pageTitles =
                        titles[
                            pageClass
                        ];

                    return true;

                }


                return false;

            }
        );


        if (
            pageTitles &&
            pageTitles[language]
        ) {

            title.textContent =
                pageTitles[
                    language
                ];

        }

    }


    /* =====================================================
       LANGUAGE SELECTOR CSS
    ====================================================== */

    function injectSelectorStyles() {

        if (
            document.getElementById(
                "newitt-language-styles"
            )
        ) {

            return;

        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "newitt-language-styles";


        style.textContent = `

            #newitt-language-selector {

                display: inline-flex;

                align-items: center;
                justify-content: center;

                gap: 3px;

                flex-shrink: 0;

                margin-left: 8px;

                padding: 3px 4px;

                border:
                    1px solid
                    rgba(255,255,255,0.12);

                border-radius: 7px;

                background:
                    rgba(255,255,255,0.035);

                backdrop-filter:
                    blur(8px);

                -webkit-backdrop-filter:
                    blur(8px);

            }


            #newitt-language-selector button {

                width: 34px;
                height: 30px;

                display: inline-flex;

                align-items: center;
                justify-content: center;

                padding: 0;

                border: 0;

                border-radius: 5px;

                background:
                    transparent;

                font-size: 1.05rem;

                line-height: 1;

                cursor: pointer;

                appearance: none;

                -webkit-appearance: none;

                transition:
                    transform 180ms ease,
                    background 180ms ease,
                    opacity 180ms ease;

            }


            #newitt-language-selector
            .welsh-language-button {

                overflow: hidden;

            }


            #newitt-language-selector
            .welsh-flag {

                display: block;

                width: 27px;

                height: 18px;

                object-fit: cover;

                border-radius: 2px;

                flex-shrink: 0;

            }


            #newitt-language-selector button:hover {

                background:
                    rgba(255,255,255,0.08);

                transform:
                    translateY(-1px);

            }


            #newitt-language-selector button.active {

                background:
                    rgba(201,164,91,0.16);

                box-shadow:
                    0 0 0 1px
                    rgba(201,164,91,0.24);

            }


            #newitt-language-selector button:focus-visible {

                outline:
                    2px solid
                    #c9a45b;

                outline-offset:
                    2px;

            }


            #newitt-language-selector span {

                color:
                    rgba(255,255,255,0.20);

                font-size:
                    0.55rem;

                user-select:
                    none;

            }


            @media (max-width: 700px) {

                .nav {

                    flex-wrap:
                        wrap;

                }


                #newitt-language-selector {

                    width:
                        100%;

                    flex-basis:
                        100%;

                    justify-content:
                        center;

                    margin:
                        5px 0 8px;

                    padding:
                        4px;

                    order:
                        30;

                }


                #newitt-language-selector button {

                    width:
                        48px;

                    height:
                        38px;

                    font-size:
                        1.15rem;

                }


                #newitt-language-selector
                .welsh-flag {

                    width:
                        34px;

                    height:
                        23px;

                }

            }


            @media (prefers-reduced-motion: reduce) {

                #newitt-language-selector button {

                    transition:
                        none;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =====================================================
       INITIALISE
    ====================================================== */

    function initLanguageSystem() {

        injectSelectorStyles();

        createLanguageSelector();


        const language =
            getSavedLanguage();


        setLanguage(
            language
        );

    }


    /* =====================================================
       START
    ====================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initLanguageSystem,
            {
                once: true
            }
        );

    } else {

        initLanguageSystem();

    }


})();
