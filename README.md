# PLPH

Private staff scheduling app for Pharmacie Charnal (Quéven).

## URLs

- **Production:** https://marcvrick.github.io/PLPH/
- **Public alias:** https://www.pharmaciecharnal.com/planning (redirects here via `planning/index.html` in the site repo)

## Stack

- Static HTML single-file (`index.html`)
- Firebase Firestore (real-time sync)
- SheetJS for export

## Firestore collections

- `demandes` — absence/vacances/échange/récupération requests
- `config/vacances_solde` — vacation balances per employee
- `config/staff_contracts` — contract type, hire date, work arrangement
- `config/staff_schedule` — custom schedule overrides
- `config/deleted_employees` — persistent deletion list
- `config/closed_days` — exceptional pharmacy closures (pont, etc.)
- `config/backup_tracker` — last weekly auto-backup timestamp
- `config/heures_sup` — extra hours credit balance per employee

## Deploy

Auto-deploy via GitHub Pages from `main`.

## Related repos

- Main public site: https://github.com/Marcvrick/Pharmacie-Charnal
  - Hosts the `/planning` redirect (`planning/index.html` → this repo's Pages URL)

## History

- Apr 30, 2026 — added "Heures supplémentaires" feature: employees declare extra hours worked (date + hours + reason), manager validates from dashboard, hours are credited to `config/heures_sup`. Employees can then request time off against their credit (free-text note, e.g. "arrivée à 11h"), manager approves and hours are debited. Balance visible in real time for employee ("Demandes en cours" card) and manager (new "Heures supp." tab in solde dashboard).
- Apr 26, 2026 — added "Fermetures exceptionnelles" feature: manager can declare closed days (pont, exceptional closures) with optional reason. Hours that employees would have worked are auto-credited to their balance per French labor law Art. L3122-27 (récupération d'heures). Cascade through `isJourOuvrable`, tensions calendars, vacances calendar, récup slots, échanges validation, backup/import. New Firebase doc `config/closed_days`.
- Apr 19, 2026 — extracted from the main site repo to its own repo after a force-push incident wiped the site's history. Repo was initially created as `pharmacie-charnal-planning`, then renamed to `PLPH` to avoid exposing "planning" in the repo URL.

## Rules

- No `git push --force` on main (branch protection is enforced)
- Before any session: `git fetch && git pull --rebase`
- Never commit passwords, credentials, or personal data
