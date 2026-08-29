/* =========================================================
  NEWITT MEDIA
  MASTER SCRIPT
  FINAL LANGUAGE + SITE SYSTEM
 
  Languages:
  English
  Cymraeg
  Français
  Deutsch
  Español
 
  Includes:
  - Opening animation
  - Mobile navigation
  - Back to top
  - Full language system
  - Saved language
  - Gallery / lightbox
  - Smooth scrolling
  - Image safety
  - External-link safety
========================================================= */
 
(() => {
   "use strict";
 
   const ready = (fn) => {
       if (document.readyState === "loading") {
           document.addEventListener("DOMContentLoaded", fn, { once: true });
       } else {
           fn();
       }
   };
 
   ready(() => {
 
       /* =====================================================
          OPENING ANIMATION
       ===================================================== */
 
       const intro = document.getElementById("site-intro");
 
       if (intro) {
           const INTRO_SEEN_KEY = "newittMediaIntroSeen";
 
           const revealSite = () => {
               intro.classList.add("intro-finished");
               document.body.classList.remove("no-scroll");
 
               window.setTimeout(() => {
                   intro.setAttribute("hidden", "");
                   intro.setAttribute("aria-hidden", "true");
               }, 900);
           };
 
           let alreadySeen = false;
 
           try {
               alreadySeen =
                   sessionStorage.getItem(INTRO_SEEN_KEY) === "true";
           } catch (error) {
               alreadySeen = false;
           }
 
           if (alreadySeen) {
               intro.setAttribute("hidden", "");
               intro.setAttribute("aria-hidden", "true");
           } else {
               document.body.classList.add("no-scroll");
 
               try {
                   sessionStorage.setItem(INTRO_SEEN_KEY, "true");
               } catch (error) {
                   /* Storage unavailable. */
               }
 
               window.setTimeout(revealSite, 3600);
           }
       }
 
 
       /* =====================================================
          MOBILE NAVIGATION
       ===================================================== */
 
       const menuToggle = document.querySelector(".menu-toggle");
       const navLinks = document.querySelector(".nav-links");
 
       const closeMenu = () => {
           if (!menuToggle || !navLinks) {
               return;
           }
 
           menuToggle.setAttribute("aria-expanded", "false");
           menuToggle.setAttribute(
               "aria-label",
               "Open navigation menu"
           );
 
           navLinks.classList.remove("open");
           navLinks.classList.remove("active");
       };
 
       if (menuToggle && navLinks) {
 
           menuToggle.addEventListener("click", (event) => {
               event.stopPropagation();
 
               const isOpen =
                   menuToggle.getAttribute("aria-expanded") === "true";
 
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
 
               navLinks.classList.toggle("open", !isOpen);
           });
 
           navLinks.querySelectorAll("a").forEach((link) => {
               link.addEventListener("click", closeMenu);
           });
 
           document.addEventListener("click", (event) => {
               if (
                   !navLinks.contains(event.target) &&
                   !menuToggle.contains(event.target)
               ) {
                   closeMenu();
               }
           });
 
           document.addEventListener("keydown", (event) => {
               if (event.key === "Escape") {
                   closeMenu();
               }
           });
       }
 
 
       /* =====================================================
          BACK TO TOP
       ===================================================== */
 
       const topButton =
           document.getElementById("back-to-top");
 
       if (topButton) {
 
           const updateTopButton = () => {
               if (window.scrollY > 420) {
                   topButton.classList.add("visible");
               } else {
                   topButton.classList.remove("visible");
               }
           };
 
           updateTopButton();
 
           window.addEventListener(
               "scroll",
               updateTopButton,
               { passive: true }
           );
 
           topButton.addEventListener("click", (event) => {
               event.preventDefault();
 
               const reducedMotion =
                   window.matchMedia(
                       "(prefers-reduced-motion: reduce)"
                   ).matches;
 
               window.scrollTo({
                   top: 0,
                   behavior: reducedMotion ? "auto" : "smooth"
               });
           });
       }
 
 
       /* =====================================================
          LANGUAGE SYSTEM
       ===================================================== */
 
       const LANGUAGE_KEY = "newittMediaLanguage";
 
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
 
               homeEyebrow: "NEWITT Media",
 
               heroLineOne: "FROM ABOVE.",
               heroLineTwo: "AFTER DARK.",
               heroTagline:
                   "AND EVERYTHING IN BETWEEN.",
 
               heroIntroduction:
                   "Aerial media. Photography. Paranormal adventures. One NEWITT identity.",
 
               explore: "Explore NEWITT Media",
               getInTouch: "Get in Touch",
 
               oneBrandThreeWorlds:
                   "One brand. Three worlds.",
 
               chooseExperience:
                   "Choose your NEWITT experience.",
 
               worldsIntroduction:
                   "Explore aerial media, paranormal adventures and photography, all brought together under one distinctive NEWITT Media identity.",
 
               aerialMedia: "AERIAL MEDIA",
               paranormalInvestigation:
                   "PARANORMAL INVESTIGATION",
               photography: "PHOTOGRAPHY",
 
               skylineDescription:
                   "Taking your view to a higher level. Professional aerial imagery and drone media from a different perspective.",
 
               paranormalDescription:
                   "We go looking for answers. Sometimes we find them. Sometimes they find us.",
 
               photographyDescription:
                   "Moments, places and people captured properly, with a clean and distinctive NEWITT Media style.",
 
               visitSkyline: "Visit Skyline",
               enterParanormal: "Enter the Paranormal",
               visitPhotography: "Visit Photography",
 
               followSocial:
                   "✦ FOLLOW US ON SOCIAL MEDIA ✦",
 
               aboutEyebrow:
                   "About NEWITT Media",
 
               aboutTitle:
                   "One name. Three worlds.",
 
               aerialTitle: "Aerial Media",
 
               aerialAbout:
                   "See locations, landscapes and moments from a perspective most people never get to experience.",
 
               exploreSkyline:
                   "Explore Skyline →",
 
               paranormalTitle: "Paranormal",
 
               paranormalAbout:
                   "Investigations, locations and experiences from the world of the unexplained.",
 
               enterParanormalAbout:
                   "Enter the Paranormal →",
 
               photographyTitle: "Photography",
 
               photographyAbout:
                   "Photography that concentrates on the moment, the location and the story.",
 
               viewPhotography:
                   "View Photography →",
 
               ctaEyebrow:
                   "NEWITT Media",
 
               ctaTitle:
                   "Ready to explore?",
 
               ctaText:
                   "Choose your world or get in touch with NEWITT Media.",
 
               footerTagline:
                   "FROM ABOVE. AFTER DARK. AND EVERYTHING IN BETWEEN.",
 
               copyright:
                   "© 2026 NEWITT Media. All Rights Reserved. The creative rights, branding, logos, names, designs and original content associated with NEWITT Media, NEWITT Skyline Media, NEWITT’s Paranormal Adventures and NEWITT Media Photography remain the property of NEWITT Media and may not be copied, reproduced, modified or used without prior permission."
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
 
               homeEyebrow: "NEWITT Media",
 
               heroLineOne: "O'R UCHOD.",
               heroLineTwo: "AR ÔL YN DDYFN.",
               heroTagline:
                   "A POPETH RHWNG Y DDWY.",
 
               heroIntroduction:
                   "Cyfryngau awyr. Ffotograffiaeth. Anturiaethau paranormal. Un hunaniaeth NEWITT.",
 
               explore:
                   "Archwilio NEWITT Media",
 
               getInTouch:
                   "Cysylltu â Ni",
 
               oneBrandThreeWorlds:
                   "Un brand. Tair byd.",
 
               chooseExperience:
                   "Dewiswch eich profiad NEWITT.",
 
               worldsIntroduction:
                   "Archwiliwch gyfryngau awyr, anturiaethau paranormal a ffotograffiaeth, oll o dan hunaniaeth NEWITT Media unigryw.",
 
               aerialMedia:
                   "CYFRYNGAU AWYR",
 
               paranormalInvestigation:
                   "YMCHWILIAD PARANORMAL",
 
               photography:
                   "FFOTOGRAFFIAETH",
 
               skylineDescription:
                   "Mynd â'ch golygfa i lefel uwch. Delweddau awyr proffesiynol a chyfryngau drôn o bersbectif gwahanol.",
 
               paranormalDescription:
                   "Rydym yn chwilio am atebion. Weithiau rydym yn dod o hyd iddynt. Weithiau maent yn dod o hyd i ni.",
 
               photographyDescription:
                   "Eiliadau, lleoedd a phobl wedi'u dal yn iawn, gyda steil glân ac unigryw NEWITT Media.",
 
               visitSkyline:
                   "Ewch i Skyline",
 
               enterParanormal:
                   "Ewch i'r Paranormal",
 
               visitPhotography:
                   "Ewch i Ffotograffiaeth",
 
               followSocial:
                   "✦ DILYNWCH NI AR Y CYFRYNGAU CYMDEITHASOL ✦",
 
               aboutEyebrow:
                   "Am NEWITT Media",
 
               aboutTitle:
                   "Un enw. Tair byd.",
 
               aerialTitle:
                   "Cyfryngau Awyr",
 
               aerialAbout:
                   "Gweld lleoliadau, tirweddau ac eiliadau o bersbectif nad yw'r rhan fwyaf o bobl byth yn cael ei brofi.",
 
               exploreSkyline:
                   "Archwilio Skyline →",
 
               paranormalTitle:
                   "Paranormal",
 
               paranormalAbout:
                   "Ymchwiliadau, lleoliadau a phrofiadau o fyd yr anhysbys.",
 
               enterParanormalAbout:
                   "Ewch i'r Paranormal →",
 
               photographyTitle:
                   "Ffotograffiaeth",
 
               photographyAbout:
                   "Ffotograffiaeth sy'n canolbwyntio ar yr eiliad, y lleoliad a'r stori.",
 
               viewPhotography:
                   "Gweld Ffotograffiaeth →",
 
               ctaEyebrow:
                   "NEWITT Media",
 
               ctaTitle:
                   "Barod i archwilio?",
 
               ctaText:
                   "Dewiswch eich byd neu cysylltwch â NEWITT Media.",
 
               footerTagline:
                   "O'R UCHOD. AR ÔL YN DDYFN. A POPETH RHWNG Y DDWY.",
 
               copyright:
                   "© 2026 NEWITT Media. Cedwir pob hawl. Mae'r hawliau creadigol, brandio, logos, enwau, dyluniadau a chynnwys gwreiddiol sy'n gysylltiedig â NEWITT Media, NEWITT Skyline Media, NEWITT’s Paranormal Adventures a NEWITT Media Photography yn eiddo i NEWITT Media ac ni chânt eu copïo, eu hatgynhyrchu, eu haddasu na'u defnyddio heb ganiatâd ymlaen llaw."
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
 
               homeEyebrow: "NEWITT Media",
 
               heroLineOne: "VU D'EN HAUT.",
               heroLineTwo: "APRÈS LA NUIT.",
               heroTagline:
                   "ET TOUT CE QUI SE TROUVE ENTRE LES DEUX.",
 
               heroIntroduction:
                   "Médias aériens. Photographie. Aventures paranormales. Une identité NEWITT.",
 
               explore:
                   "Explorer NEWITT Media",
 
               getInTouch:
                   "Nous contacter",
 
               oneBrandThreeWorlds:
                   "Une marque. Trois univers.",
 
               chooseExperience:
                   "Choisissez votre expérience NEWITT.",
 
               worldsIntroduction:
                   "Explorez les médias aériens, les aventures paranormales et la photographie, réunis sous une identité NEWITT Media distinctive.",
 
               aerialMedia:
                   "MÉDIA AÉRIEN",
 
               paranormalInvestigation:
                   "ENQUÊTE PARANORMALE",
 
               photography:
                   "PHOTOGRAPHIE",
 
               skylineDescription:
                   "Donnez une nouvelle dimension à votre regard. Images aériennes professionnelles et médias drone sous une perspective différente.",
 
               paranormalDescription:
                   "Nous cherchons des réponses. Parfois nous les trouvons. Parfois elles nous trouvent.",
 
               photographyDescription:
                   "Des moments, des lieux et des personnes capturés avec soin, dans le style propre et distinctif de NEWITT Media.",
 
               visitSkyline:
                   "Visiter Skyline",
 
               enterParanormal:
                   "Entrer dans le paranormal",
 
               visitPhotography:
                   "Voir la photographie",
 
               followSocial:
                   "✦ SUIVEZ-NOUS SUR LES RÉSEAUX SOCIAUX ✦",
 
               aboutEyebrow:
                   "À propos de NEWITT Media",
 
               aboutTitle:
                   "Un nom. Trois univers.",
 
               aerialTitle:
                   "Média aérien",
 
               aerialAbout:
                   "Découvrez des lieux, des paysages et des moments sous une perspective que la plupart des gens n'ont jamais l'occasion de voir.",
 
               exploreSkyline:
                   "Explorer Skyline →",
 
               paranormalTitle:
                   "Paranormal",
 
               paranormalAbout:
                   "Enquêtes, lieux et expériences dans le monde de l'inexpliqué.",
 
               enterParanormalAbout:
                   "Entrer dans le paranormal →",
 
               photographyTitle:
                   "Photographie",
 
               photographyAbout:
                   "Une photographie qui se concentre sur le moment, le lieu et l'histoire.",
 
               viewPhotography:
                   "Voir la photographie →",
 
               ctaEyebrow:
                   "NEWITT Media",
 
               ctaTitle:
                   "Prêt à explorer ?",
 
               ctaText:
                   "Choisissez votre univers ou contactez NEWITT Media.",
 
               footerTagline:
                   "VU D'EN HAUT. APRÈS LA NUIT. ET TOUT CE QUI SE TROUVE ENTRE LES DEUX.",
 
               copyright:
                   "© 2026 NEWITT Media. Tous droits réservés. Les droits créatifs, la marque, les logos, les noms, les designs et le contenu original associés à NEWITT Media, NEWITT Skyline Media, NEWITT’s Paranormal Adventures et NEWITT Media Photography restent la propriété de NEWITT Media et ne peuvent être copiés, reproduits, modifiés ou utilisés sans autorisation préalable."
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
 
               homeEyebrow: "NEWITT Media",
 
               heroLineOne: "VON OBEN.",
               heroLineTwo: "NACH EINBRUCH DER DUNKELHEIT.",
               heroTagline:
                   "UND ALLES DAZWISCHEN.",
 
               heroIntroduction:
                   "Luftaufnahmen. Fotografie. Paranormale Abenteuer. Eine NEWITT Identität.",
 
               explore:
                   "NEWITT Media entdecken",
 
               getInTouch:
                   "Kontakt aufnehmen",
 
               oneBrandThreeWorlds:
                   "Eine Marke. Drei Welten.",
 
               chooseExperience:
                   "Wählen Sie Ihr NEWITT Erlebnis.",
 
               worldsIntroduction:
                   "Entdecken Sie Luftaufnahmen, paranormale Abenteuer und Fotografie, vereint unter der unverwechselbaren Identität von NEWITT Media.",
 
               aerialMedia:
                   "LUFTMEDIEN",
 
               paranormalInvestigation:
                   "PARANORMALE ERMITTLUNG",
 
               photography:
                   "FOTOGRAFIE",
 
               skylineDescription:
                   "Bringen Sie Ihre Perspektive auf eine höhere Ebene. Professionelle Luftaufnahmen und Drohnenmedien aus einer anderen Perspektive.",
 
               paranormalDescription:
                   "Wir suchen nach Antworten. Manchmal finden wir sie. Manchmal finden sie uns.",
 
               photographyDescription:
                   "Momente, Orte und Menschen richtig eingefangen, mit dem klaren und unverwechselbaren Stil von NEWITT Media.",
 
               visitSkyline:
                   "Skyline besuchen",
 
               enterParanormal:
                   "Zum Paranormalen",
 
               visitPhotography:
                   "Fotografie ansehen",
 
               followSocial:
                   "✦ FOLGEN SIE UNS IN DEN SOZIALEN MEDIEN ✦",
 
               aboutEyebrow:
                   "Über NEWITT Media",
 
               aboutTitle:
                   "Ein Name. Drei Welten.",
 
               aerialTitle:
                   "Luftmedien",
 
               aerialAbout:
                   "Erleben Sie Orte, Landschaften und Momente aus einer Perspektive, die die meisten Menschen nie zu sehen bekommen.",
 
               exploreSkyline:
                   "Skyline entdecken →",
 
               paranormalTitle:
                   "Paranormal",
 
               paranormalAbout:
                   "Ermittlungen, Orte und Erlebnisse aus der Welt des Unerklärlichen.",
 
               enterParanormalAbout:
                   "Zum Paranormalen →",
 
               photographyTitle:
                   "Fotografie",
 
               photographyAbout:
                   "Fotografie, die sich auf den Moment, den Ort und die Geschichte konzentriert.",
 
               viewPhotography:
                   "Fotografie ansehen →",
 
               ctaEyebrow:
                   "NEWITT Media",
 
               ctaTitle:
                   "Bereit zum Entdecken?",
 
               ctaText:
                   "Wählen Sie Ihre Welt oder kontaktieren Sie NEWITT Media.",
 
               footerTagline:
                   "VON OBEN. NACH EINBRUCH DER DUNKELHEIT. UND ALLES DAZWISCHEN.",
 
               copyright:
                   "© 2026 NEWITT Media. Alle Rechte vorbehalten. Die kreativen Rechte, Marken, Logos, Namen, Designs und Originalinhalte von NEWITT Media, NEWITT Skyline Media, NEWITT’s Paranormal Adventures und NEWITT Media Photography bleiben Eigentum von NEWITT Media und dürfen ohne vorherige Genehmigung nicht kopiert, vervielfältigt, verändert oder verwendet werden."
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
 
               homeEyebrow: "NEWITT Media",
 
               heroLineOne: "DESDE ARRIBA.",
               heroLineTwo: "DESPUÉS DE LA OSCURIDAD.",
               heroTagline:
                   "Y TODO LO QUE HAY ENTRE MEDIAS.",
 
               heroIntroduction:
                   "Medios aéreos. Fotografía. Aventuras paranormales. Una identidad NEWITT.",
 
               explore:
                   "Explorar NEWITT Media",
 
               getInTouch:
                   "Contactar",
 
               oneBrandThreeWorlds:
                   "Una marca. Tres mundos.",
 
               chooseExperience:
                   "Elige tu experiencia NEWITT.",
 
               worldsIntroduction:
                   "Explora medios aéreos, aventuras paranormales y fotografía, reunidos bajo una identidad distintiva de NEWITT Media.",
 
               aerialMedia:
                   "MEDIOS AÉREOS",
 
               paranormalInvestigation:
                   "INVESTIGACIÓN PARANORMAL",
 
               photography:
                   "FOTOGRAFÍA",
 
               skylineDescription:
                   "Lleva tu perspectiva a un nivel superior. Imágenes aéreas profesionales y medios con dron desde una perspectiva diferente.",
 
               paranormalDescription:
                   "Buscamos respuestas. A veces las encontramos. A veces ellas nos encuentran.",
 
               photographyDescription:
                   "Momentos, lugares y personas capturados correctamente, con el estilo limpio y distintivo de NEWITT Media.",
 
               visitSkyline:
                   "Visitar Skyline",
 
               enterParanormal:
                   "Entrar en lo paranormal",
 
               visitPhotography:
                   "Ver fotografía",
 
               followSocial:
                   "✦ SÍGUENOS EN LAS REDES SOCIALES ✦",
 
               aboutEyebrow:
                   "Sobre NEWITT Media",
 
               aboutTitle:
                   "Un nombre. Tres mundos.",
 
               aerialTitle:
                   "Medios Aéreos",
 
               aerialAbout:
                   "Descubre lugares, paisajes y momentos desde una perspectiva que la mayoría de las personas nunca llega a experimentar.",
 
               exploreSkyline:
                   "Explorar Skyline →",
 
               paranormalTitle:
                   "Paranormal",
 
               paranormalAbout:
                   "Investigaciones, lugares y experiencias del mundo de lo inexplicable.",
 
               enterParanormalAbout:
                   "Entrar en lo paranormal →",
 
               photographyTitle:
                   "Fotografía",
 
               photographyAbout:
                   "Fotografía centrada en el momento, el lugar y la historia.",
 
               viewPhotography:
                   "Ver fotografía →",
 
               ctaEyebrow:
                   "NEWITT Media",
 
               ctaTitle:
                   "¿Listo para explorar?",
 
               ctaText:
                   "Elige tu mundo o ponte en contacto con NEWITT Media.",
 
               footerTagline:
                   "DESDE ARRIBA. DESPUÉS DE LA OSCURIDAD. Y TODO LO QUE HAY ENTRE MEDIAS.",
 
               copyright:
                   "© 2026 NEWITT Media. Todos los derechos reservados. Los derechos creativos, la marca, los logotipos, los nombres, los diseños y el contenido original asociados con NEWITT Media, NEWITT Skyline Media, NEWITT’s Paranormal Adventures y NEWITT Media Photography siguen siendo propiedad de NEWITT Media y no pueden copiarse, reproducirse, modificarse ni utilizarse sin permiso previo."
           }
 
       };
 
 
       /* =====================================================
          FIND / CREATE LANGUAGE SELECTOR
       ===================================================== */
 
       let languageSelector =
           document.querySelector(".language-selector");
 
       if (!languageSelector) {
 
           languageSelector =
               document.createElement("div");
 
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
 
           document.body.appendChild(languageSelector);
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
 
               languageMenu.hidden = true;
           };
 
 
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
 
                   languageMenu.hidden = isOpen;
               }
           );
 
 
           languageMenu
               .querySelectorAll("[data-lang]")
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
 
                           setLanguage(language);
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
 
 
           function setLanguage(language) {
 
               if (
                   !SUPPORTED_LANGUAGES.includes(
                       language
                   )
               ) {
                   language = "en";
               }
 
               const dictionary =
                   TRANSLATIONS[language];
 
               if (!dictionary) {
                   return;
               }
 
 
               /* --------------------------------------------
                  HTML LANGUAGE
               -------------------------------------------- */
 
               document.documentElement.lang =
                   language === "en"
                       ? "en-GB"
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
                  LANGUAGE BUTTON
               -------------------------------------------- */
 
               languageToggle.textContent =
                   language.toUpperCase();
 
               languageToggle.setAttribute(
                   "aria-label",
                   `Language: ${LANGUAGE_NAMES[language]}`
               );
 
 
               /* --------------------------------------------
                  DATA-I18N ELEMENTS
               -------------------------------------------- */
 
               document
                   .querySelectorAll("[data-i18n]")
                   .forEach((element) => {
 
                       const key =
                           element.getAttribute(
                               "data-i18n"
                           );
 
                       if (
                           !key ||
                           !Object.prototype.hasOwnProperty.call(
                               dictionary,
                               key
                           )
                       ) {
                           return;
                       }
 
                       element.textContent =
                           dictionary[key];
                   });
 
 
               /* --------------------------------------------
                  SOCIAL TICKER
               -------------------------------------------- */
 
               document
                   .querySelectorAll(
                       ".social-ticker-track span"
                   )
                   .forEach((element) => {
 
                       element.textContent =
                           dictionary.followSocial;
 
                   });
 
 
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
 
           let savedLanguage = "en";
 
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
 
               savedLanguage = "en";
 
           }
 
           setLanguage(savedLanguage);
       }
 
 
       /* =====================================================
          GALLERY / LIGHTBOX
       ===================================================== */
 
       const galleryImages =
           document.querySelectorAll(
               ".gallery-item img, .gallery-link img"
           );
 
       const lightbox =
           document.querySelector(".lightbox");
 
 
       if (
           galleryImages.length &&
           lightbox
       ) {
 
           const lightboxImage =
               lightbox.querySelector("img");
 
           const closeButton =
               lightbox.querySelector(
                   ".lightbox-close"
               );
 
 
           const closeLightbox = () => {
 
               lightbox.classList.remove("active");
 
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
 
 
           galleryImages.forEach((image) => {
 
               image.addEventListener(
                   "click",
                   (event) => {
 
                       event.preventDefault();
 
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
 
           });
 
 
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
           .querySelectorAll('a[href^="#"]')
           .forEach((link) => {
 
               link.addEventListener(
                   "click",
                   (event) => {
 
                       const targetId =
                           link.getAttribute("href");
 
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
           .querySelectorAll("img")
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
          PAGE READY
       ===================================================== */
 
       document.documentElement.classList.add(
           "newitt-js-ready"
       );
 
   });
 
})();
