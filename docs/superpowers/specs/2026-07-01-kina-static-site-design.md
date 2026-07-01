# Kina Static Site Design

## Goal

Create a fast, secure static website for `Kina Influencer Agent` that can be hosted from GitHub Pages and used during TikTok developer/API setup.

## Pages

- `index.html`: public landing page for Kina Influencer Agent.
- `tiktok-api.html`: TikTok API setup and app-review support page.
- `privacy.html`: plain-language privacy page for developer review.
- `terms.html`: plain-language terms page for developer review.

## Design

The site uses a clean white interface with deep charcoal text, teal primary actions, coral highlights, and light gray structure. The homepage shows Kina as an influencer campaign operations tool with a product workflow, campaign table, and security-focused messaging. The TikTok page reads like a calm setup console rather than a marketing page.

## Security

The frontend must not contain TikTok client secrets, access tokens, refresh tokens, or backend token exchange logic. TikTok authentication is represented as a backend-owned flow that should start from `/api/auth/tiktok/start` once a backend exists.

## Hosting

The site is dependency-free static HTML/CSS/JS. It can be pushed to GitHub and hosted from GitHub Pages.
