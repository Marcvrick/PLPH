# PLPH

Private staff scheduling app for Pharmacie Charnal (Quéven).

## URLs

- **Production:** https://marcvrick.github.io/PLPH/
- **Public alias:** https://www.pharmaciecharnal.com/planning (redirects here via `planning/index.html` in the site repo)

## Stack

- Static HTML single-file (`index.html`)
- Firebase Firestore (real-time sync)
- SheetJS for export

## Deploy

Auto-deploy via GitHub Pages from `main`.

## Related repos

- Main public site: https://github.com/Marcvrick/Pharmacie-Charnal
  - Hosts the `/planning` redirect (`planning/index.html` → this repo's Pages URL)

## History

- Apr 19, 2026 — extracted from the main site repo to its own repo after a force-push incident wiped the site's history. Repo was initially created as `pharmacie-charnal-planning`, then renamed to `PLPH` to avoid exposing "planning" in the repo URL.

## Rules

- No `git push --force` on main (branch protection is enforced)
- Before any session: `git fetch && git pull --rebase`
- Never commit passwords, credentials, or personal data
