# Cyber Credo

Personal cybersecurity blog. Built with Jekyll, hosted on GitHub Pages.

## Setup (one time)

1. Create a new repo on GitHub named `YOUR_USERNAME.github.io`
2. Push this entire folder to the `main` branch
3. Go to repo Settings → Pages → Source: `main` branch, `/ (root)` folder
4. Your site is live at `https://YOUR_USERNAME.github.io`

That's it. GitHub builds Jekyll automatically — no config needed.

## Writing a new post

Create a file in `_posts/` named:

```
YYYY-MM-DD-your-post-title.md
```

Add this header at the top:

```yaml
---
layout: post
title: "Your Post Title"
date: 2026-04-11
tags: [blue-team, SIEM]
excerpt: "One sentence summary shown in post cards."
read_time: 5
---

Your content in Markdown here.
```

Then either:
- **On GitHub.com**: click Add file → Create new file in `_posts/`
- **Locally**: create the file, then `git add . && git commit -m "new post" && git push`

GitHub builds and deploys automatically within ~60 seconds.

## Activating ads (when ready)

1. Apply for Google AdSense at adsense.google.com
2. Once approved, get your Publisher ID (`ca-pub-XXXXXXXX`)
3. In `_layouts/default.html`, uncomment the AdSense script and replace `YOUR_ADSENSE_ID`
4. In each ad zone, uncomment the `<ins class="adsbygoogle">` tag and replace `YOUR_ID` / `YOUR_SLOT`
5. In `assets/js/main.js`, uncomment the `adsbygoogle.push` block

Ad containers are already sized — no layout shift when ads load.

## Adding a custom domain (later)

1. Create file `CNAME` in the repo root with just your domain: `cybercredo.com`
2. Point your domain's DNS A records to GitHub's IPs (check docs.github.com for current IPs)
3. In repo Settings → Pages → Custom domain, enter your domain and enable HTTPS

## File structure

```
_layouts/       page templates
_includes/      nav, footer (shared across pages)
_posts/         your blog posts (Markdown)
assets/css/     stylesheet
assets/js/      minimal JS
blog/           blog index
skills/         skills page
projects/       projects page
certifications/ certs page
interview-prep/ interview Q&A
about/          about page
```
