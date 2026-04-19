# PLPH

Private staff scheduling app.

## Stack

- Static HTML single-file
- Firebase Firestore (real-time sync)
- SheetJS for export

## Deploy

Auto-deploy via GitHub Pages from `main`.

## Rules

- No `git push --force` on main
- Before any session: `git fetch && git pull --rebase`
- Never commit passwords, credentials, or personal data
