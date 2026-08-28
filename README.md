# NEWITT Media Website

## Official NEWITT Media Website

This repository contains the complete website for **NEWITT Media**.

Website:

https://newittmedia.co.uk/

NEWITT Media brings together three connected areas of creative work:

- **NEWITT Skyline Media**
- **NEWITT's Paranormal Adventures**
- **NEWITT Media Photography**

The website is designed as one unified NEWITT Media brand while giving each area its own identity, content and colour styling.

---

# NEWITT Media

## Brand Statement

**FROM ABOVE.  
AFTER DARK.  
AND EVERYTHING IN BETWEEN.**

NEWITT Media brings together aerial media, photography and paranormal adventures under one distinctive identity.

The website has been designed to be:

- Professional
- Modern
- Mobile friendly
- Fast loading
- Easy to navigate
- Search-engine friendly
- Suitable for future expansion
- Built around the NEWITT Media branding

---

# Website Structure

The website currently contains the following main pages:

| Page | Purpose |
|---|---|
| `index.html` | Main NEWITT Media homepage |
| `skyline.html` | NEWITT Skyline Media |
| `paranormal.html` | NEWITT's Paranormal Adventures |
| `photography.html` | NEWITT Media Photography |
| `contact.html` | Contact and enquiry page |

---

# Main Website Features

## Homepage

The homepage contains:

- NEWITT Media hero section
- Main NEWITT Media branding
- Three main brand areas
- NEWITT Skyline Media section
- NEWITT's Paranormal Adventures section
- NEWITT Media Photography section
- Social media hub
- Social media links
- Animated paranormal logo
- Moving gold social-media banner
- About / future content section
- Back-to-top control

The homepage is intended to act as the central hub for the entire NEWITT Media brand.

---

# NEWITT Skyline Media

NEWITT Skyline Media is the aerial-media side of the website.

It covers:

- Drone aerial photography
- Aerial video
- Views from above
- Locations
- Landscapes
- Aerial projects

The Skyline page currently includes a Gloucester Prison aerial gallery.

Gallery images are stored within:

`public/media/skyline/`

Current gallery assets include:

- `Gloucester-prison-aerial-01.webp`
- `Gloucester-prison-aerial-02.webp`
- `Gloucester-prison-aerial-03.webp`
- `Gloucester-prison-aerial-04.webp`

The corresponding full-resolution gallery files use the `.JPG` filenames referenced by the page.

---

# NEWITT's Paranormal Adventures

NEWITT's Paranormal Adventures is the paranormal side of NEWITT Media.

It covers:

- Paranormal investigations
- Haunted locations
- Strange stories
- Unexplained experiences
- Investigation content
- Social-media content

The Paranormal page includes the NEWITT Paranormal TikTok creator embed.

Social links are also provided through the main website.

---

# NEWITT Media Photography

NEWITT Media Photography is the photography side of the brand.

It is intended for:

- Landscapes
- Locations
- People
- Places
- Adventures
- Unusual moments
- Future photographic projects

The photography gallery area is designed to be expanded as the photography collection grows.

---

# Social Media

The website contains social links for the NEWITT Media brands.

## NEWITT Skyline Media

TikTok:

https://www.tiktok.com/@newittskylinemedia

YouTube:

https://www.youtube.com/@Newitt-skyline-media

---

## NEWITT's Paranormal Adventures

TikTok:

https://www.tiktok.com/@nw13ttt

Instagram:

https://www.instagram.com/nw13ttt/

YouTube:

https://www.youtube.com/@NewittsParanormalAdventures

Facebook:

https://www.facebook.com/share/1AiSkdbyM4/

---

# Contact

The website uses hidden mail links so the email addresses do not need to be visibly displayed as plain text on the website.

## Skyline Media

`n.skyline.media@gmail.com`

## Paranormal Adventures

`nw13ttt@gmail.com`

These addresses are used for the appropriate contact buttons.

---

# Design System

The website uses a dark premium design.

## Main NEWITT Media

Primary identity:

- Black
- Gold
- White

## Skyline

Primary identity:

- Blue
- Black
- White

## Paranormal

Primary identity:

- Red
- Black
- White

## Photography

Primary identity:

- Green
- Black
- White

The colour identities are controlled through CSS variables in:

`public/style.css`

---

# Website Backgrounds

The main website background is:

`background.png.PNG`

The dedicated homepage social-media background is:

`newitt-social-hub-background.PNG`

The social-media artwork is deliberately restricted to the Social Hub section.

The main website background remains visible behind the normal page content.

---

# Important Image Filename Rule

The current website intentionally uses the existing image filenames supplied for the project.

Some filenames contain:

`.png.png`

These filenames should **not be renamed casually** unless the corresponding references in every affected HTML file are changed at the same time.

For example:

`newitt-media-logo.png.png`

is currently referenced by the website.

If an image is renamed, every corresponding HTML, CSS, metadata, Open Graph, Twitter and structured-data reference must also be updated.

---

# JavaScript Features

The website uses:

`public/script.js`

The master JavaScript handles:

- Mobile navigation
- Mobile menu closing
- Internal smooth scrolling
- Gallery lightbox
- Lightbox closing
- Escape-key controls
- Back-to-top button
- Paranormal logo movement
- Social Hub ambient animation
- Image loading behaviour
- Reduced-motion handling

The JavaScript is shared across the website pages.

---

# CSS

The master stylesheet is:

`public/style.css`

The stylesheet controls:

- Global layout
- Typography
- Navigation
- Mobile navigation
- Hero sections
- Buttons
- Content panels
- Brand cards
- Social Hub
- Social media cards
- Social media animation
- Moving social banner
- Galleries
- TikTok containers
- Contact sections
- Footer
- Lightbox
- Responsive mobile layouts
- Reduced-motion support

The main website background is deliberately handled by the `body` background.

Normal sections do not use a full-page black overlay.

The Social Hub has its own dedicated artwork layer.

---

# SEO

The website includes:

- Page titles
- Meta descriptions
- Canonical URLs
- Robots directives
- Open Graph metadata on the homepage
- Twitter metadata on the homepage
- Organization structured data
- Social profile references
- XML sitemap
- `robots.txt`

---

# Sitemap

The sitemap is:

`public/sitemap.xml`

It currently contains:

- `/`
- `/skyline.html`
- `/paranormal.html`
- `/photography.html`
- `/contact.html`

---

# Robots

The website uses:

`public/robots.txt`

Current configuration allows search engines to crawl the website and points them to the XML sitemap.

---

# Cloudflare

The website is configured for Cloudflare Workers Assets.

The Cloudflare configuration is:

`wrangler.jsonc`

The site assets are served from:

`./public`

The project name is:

`newitt-website`

The compatibility date currently used by the project is:

`2026-08-23`

---

# Project Structure

The expected project structure is:

```text
newitt-website/
│
├── public/
│   │
│   ├── index.html
│   ├── skyline.html
│   ├── paranormal.html
│   ├── photography.html
│   ├── contact.html
│   │
│   ├── style.css
│   ├── script.js
│   ├── robots.txt
│   ├── sitemap.xml
│   │
│   ├── background.png.PNG
│   ├── newitt-social-hub-background.PNG
│   ├── newitt-media-logo.png.png
│   ├── sky-logo.png.png
│   ├── paranormal-logo.png.png
│   │
│   └── media/
│       └── skyline/
│           ├── Gloucester-prison-aerial-01.webp
│           ├── Gloucester-prison-aerial-02.webp
│           ├── Gloucester-prison-aerial-03.webp
│           ├── Gloucester-prison-aerial-04.webp
│           ├── Gloucester-prison-aerial-01.JPG
│           ├── Gloucester-prison-aerial-02.JPG
│           ├── Gloucester-prison-aerial-03.JPG
│           └── Gloucester-prison-aerial-04.JPG
│
├── README.md
└── wrangler.jsonc
