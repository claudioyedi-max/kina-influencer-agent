# Kina Static Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a secure static website for Kina Influencer Agent.

**Architecture:** Use plain static files so GitHub Pages can host the site directly. Keep TikTok secrets out of browser code and present OAuth setup as a backend-owned flow.

**Tech Stack:** HTML, CSS, vanilla JavaScript, GitHub Pages.

---

### Task 1: Static Site Files

**Files:**
- Create: `index.html`
- Create: `tiktok-api.html`
- Create: `privacy.html`
- Create: `terms.html`
- Create: `assets/styles.css`
- Create: `assets/script.js`
- Create: `README.md`
- Create: `.gitignore`

- [x] Create the landing page, TikTok setup page, privacy page, terms page, shared styles, and small copy-to-clipboard helper.
- [x] Keep all API secrets out of frontend files.
- [x] Add README instructions for local preview and GitHub Pages.

### Task 2: Verify

**Files:**
- Inspect: all created site files

- [x] Check for TikTok secrets or token-like values.
- [x] Confirm pages are static and can open without a build step.
- [x] Confirm links between pages resolve locally.

### Task 3: Publish

**Files:**
- Commit: all created files

- [ ] Initialize git if needed.
- [ ] Commit the site.
- [ ] Create or connect a GitHub repository.
- [ ] Push the branch.
- [ ] Enable GitHub Pages if repository access allows it.
