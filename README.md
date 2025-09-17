# Customr — Static Preview

This repo is a static HTML/CSS/JS preview of the Customr site for stakeholder review (GitHub Pages).

## How to publish
1. Create a new GitHub repo and upload these files to the repo root.
2. Enable **Settings → Pages** → Source: **Deploy from a branch**, Branch: **main**.
3. Visit the GitHub Pages URL.

### Where to edit copy
- **Home:** `index.html` (hero + service cards)
- **Services:** `services.html`
- **About:** `about.html`
- **Contact:** `contact.html`
- **Colors & logo:** `site.config.json` and `/assets/images/logo-customr.svg`

## Palette
Derived from supplied SVG assets:
- Primary: #2b303a
- Surface: #f4e9e2
- Accent: #1c84d9 (alt: #10ad66)

## Notes
- Forms post to Formspree (placeholder) — replace with your endpoint.
- Minimal JS (menu, scroll fades, tour). No build step.
