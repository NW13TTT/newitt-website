# NEWITT Media Website

## 🌐 Official NEWITT Media Website

**https://newittmedia.co.uk/**

**https://www.newittmedia.co.uk/**

Official website for **NEWITT Media**.

NEWITT Media brings together three connected areas of creative work:

- **NEWITT Skyline Media**
- **NEWITT's Paranormal Adventures**
- **NEWITT Media Photography**

---

# NEWITT Media

## From Above. After Dark. And Everything In Between.

NEWITT Media is the central home for the NEWITT brand, bringing together aerial media, photography and paranormal adventures under one distinctive identity.

The website is designed to be:

- Professional
- Modern
- Mobile friendly
- Responsive
- Fast loading
- Easy to navigate
- Search-engine friendly
- Accessible
- Ready for future expansion

---

# Official Website Addresses

The NEWITT Media website is available through both domain versions:

### Main domain

**https://newittmedia.co.uk/**

### WWW domain

**https://www.newittmedia.co.uk/**

Both addresses represent the official NEWITT Media website.

---

# Website Structure

The website currently contains five main pages:

| Page | Purpose |
|---|---|
| `index.html` | Main NEWITT Media homepage |
| `skyline.html` | NEWITT Skyline Media |
| `paranormal.html` | NEWITT's Paranormal Adventures |
| `photography.html` | NEWITT Media Photography |
| `contact.html` | Contact and enquiries |

---

# Homepage

The homepage acts as the central hub for NEWITT Media.

It contains:

- NEWITT Media hero section
- Main NEWITT Media branding
- Three brand sections
- NEWITT Skyline Media
- NEWITT's Paranormal Adventures
- NEWITT Media Photography
- Social media hub
- Social media links
- Animated paranormal logo
- Moving gold social-media banner
- Future content section
- Back-to-top button

The homepage brings the three sides of NEWITT Media together while keeping their individual identities.

---

# NEWITT Skyline Media

NEWITT Skyline Media is the aerial-media side of NEWITT Media.

It covers:

- Drone aerial photography
- Aerial video
- Views from above
- Landscapes
- Locations
- Landmarks
- Aerial projects

## Skyline Gallery

The Skyline page currently includes a Gloucester Prison aerial gallery.

Gallery assets are stored in:

`public/media/skyline/`

Current images include:

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
- Future investigations and locations

The Paranormal page includes the NEWITT Paranormal TikTok creator embed.

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
- Featured photographs
- Future photographic projects

The photography collection can be expanded as new work becomes available.

---

# Social Media

## NEWITT Skyline Media

### TikTok

https://www.tiktok.com/@newittskylinemedia

### YouTube

https://www.youtube.com/@Newitt-skyline-media

---

## NEWITT's Paranormal Adventures

### TikTok

https://www.tiktok.com/@nw13ttt

### Instagram

https://www.instagram.com/nw13ttt/

### YouTube

https://www.youtube.com/@NewittsParanormalAdventures

### Facebook

https://www.facebook.com/share/1AiSkdbyM4/

---

# Contact

The website uses mail links for enquiries.

The email addresses are used by the appropriate contact buttons.

## NEWITT Skyline Media

`n.skyline.media@gmail.com`

## NEWITT's Paranormal Adventures

`nw13ttt@gmail.com`

---

# Brand Design

NEWITT Media uses a dark premium visual design.

## NEWITT Media

Primary identity:

- Black
- Gold
- White

## NEWITT Skyline Media

Primary identity:

- Blue
- Black
- White

## NEWITT's Paranormal Adventures

Primary identity:

- Red
- Black
- White

## NEWITT Media Photography

Primary identity:

- Green
- Black
- White

The colour system is controlled through:

`public/style.css`

---

# Website Background

The main website background is:

`background.png.PNG`

The dedicated Social Hub background is:

`newitt-social-hub-background.PNG`

The Social Hub artwork is intentionally contained within the Social Hub section.

The main website background remains visible behind the normal page content.

---

# Important Image Filename Rule

The current project intentionally uses the existing image filenames.

Some filenames contain:

`.png.png`

For example:

`newitt-media-logo.png.png`

These filenames should not be renamed unless all corresponding references are updated.

When changing an image filename, check:

- HTML
- CSS
- JavaScript
- Open Graph metadata
- Twitter metadata
- Structured data
- Other image references

A filename change without updating its references can cause images to disappear from the live website.

---

# JavaScript

The master JavaScript file is:

`public/script.js`

It controls:

- Mobile navigation
- Mobile menu opening and closing
- Internal smooth scrolling
- Gallery lightbox
- Lightbox closing
- Escape-key controls
- Back-to-top button
- Slow paranormal logo movement
- Social Hub ambient animation
- Moving social-media ticker
- Image loading behaviour
- Reduced-motion handling

The JavaScript is shared across the website.

---

# CSS

The master stylesheet is:

`public/style.css`

It controls:

- Global layout
- Typography
- Navigation
- Mobile navigation
- Hero sections
- Buttons
- Content panels
- Brand cards
- Social Hub
- Social-media panels
- Social-media artwork
- Social-media animation
- Moving gold banner
- Galleries
- TikTok sections
- Contact sections
- Footer
- Lightbox
- Responsive layouts
- Reduced-motion support

The main website background is controlled by the `body` background.

Normal sections are transparent so the main background remains visible.

The Social Hub has its own dedicated artwork layer.

---

# SEO

The website includes:

- Page titles
- Meta descriptions
- Canonical URLs
- Robots directives
- Open Graph metadata
- Twitter metadata
- Organization structured data
- Social profile references
- XML sitemap
- `robots.txt`

The official website addresses are:

**https://newittmedia.co.uk/**

**https://www.newittmedia.co.uk/**

---

# Sitemap

The sitemap is:

`public/sitemap.xml`

It currently contains:

- `https://newittmedia.co.uk/`
- `https://newittmedia.co.uk/skyline.html`
- `https://newittmedia.co.uk/paranormal.html`
- `https://newittmedia.co.uk/photography.html`
- `https://newittmedia.co.uk/contact.html`

If additional public pages are added, the sitemap should be updated.

---

# Robots

The website uses:

`public/robots.txt`

Current configuration allows search engines to crawl the website and points search engines towards the XML sitemap.

---

# Cloudflare

The website is configured for Cloudflare Workers Assets.

The Cloudflare configuration file is:

`wrangler.jsonc`

The project name is:

`newitt-website`

The website assets directory is:

`./public`

The current compatibility date is:

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
