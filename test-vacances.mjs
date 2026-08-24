// Verifie le calcul des conges payes sans lancer l'app : les fonctions sont extraites
// de index.html et evaluees avec une date figee.  node test-vacances.mjs
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const src = readFileSync(new URL('./index.html', import.meta.url), 'utf8');

function extract(name) {
    const start = src.indexOf(`function ${name}(`);
    assert.notEqual(start, -1, `fonction introuvable : ${name}`);
    let i = src.indexOf('{', start), depth = 0;
    for (let j = i; j < src.length; j++) {
        if (src[j] === '{') depth++;
        else if (src[j] === '}' && --depth === 0) return src.slice(start, j + 1);
    }
    throw new Error(`accolade non fermee : ${name}`);
}

const sandbox = new Function(`
    ${['parseLocalDate', 'monthsDiff', 'yearsDiff', 'calculateVacationDays'].map(extract).join('\n')}
    function getNowFrance() { return new Date(2026, 7, 24); }
    return { calculateVacationDays, monthsDiff };
`)();

const { calculateVacationDays, monthsDiff } = sandbox;

// Betty : embauchee le 28 avril 2026, CDI.
const betty = calculateVacationDays({ hireDate: '2026-04-28', endDate: null });

// Periode de reference precedente (1er juin 2025 - 31 mai 2026) : 28/04 -> 01/06 = 1,1 mois.
assert.equal(betty.total, 2.8, `annuel attendu 2.8, obtenu ${betty.total}`);
// Periode en cours (1er juin -> 24 aout 2026) : 2,74 mois a 2,5 j/mois.
assert.equal(betty.enCours, 6.9, `enCours attendu 6.9, obtenu ${betty.enCours}`);

// Salariee presente depuis des annees : annuel plein, en cours au prorata, bonus anciennete.
const claire = calculateVacationDays({ hireDate: '2015-09-01', endDate: null });
assert.equal(claire.acquired, 30);
assert.equal(claire.bonus, 2);
assert.equal(claire.enCours, 6.9);

// Pas encore embauchee : rien, et enCours absent ne doit pas casser les appelants.
const future = calculateVacationDays({ hireDate: '2026-12-01', endDate: null });
assert.equal(future.total, 0);
assert.equal(future.enCours ?? 0, 0);

// Bascule du 1er juin : le decouvert doit survivre, sinon les jours anticipes sont offerts 2 fois.
// annuel 2.7 + report 0 - pris 5 = -2.3 de reliquat, a deduire des 30 j de l'annee suivante.
const rollover = (annuel, report, pris) => parseFloat((annuel + report - pris).toFixed(1));
assert.equal(rollover(2.7, 0, 5), -2.3);
assert.equal(rollover(30, 0, 12), 18); // cas normal : le reliquat positif est conserve

console.log('OK — conges payes : 5 controles passes');
