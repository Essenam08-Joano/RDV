/**
 * Trie une liste de rendez-vous par date croissante.
 * @param {Array} rendezvous - Tableau d'objets { date: 'YYYY-MM-DD', ... }
 * @returns {Array} - Liste triée par date.
 */
function trierParDate(rendezvous) {
  return [...rendezvous].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
}

/**
 * Détecte les conflits entre créneaux (même date).
 * @param {Array} rendezvous - Tableau d'objets { date, ... }
 * @returns {Array} - Liste des conflits : chaque élément { date, occurrences: [...] }
 */
function detecterConflits(rendezvous) {
  const map = new Map();
  rendezvous.forEach(rdv => {
    if (!map.has(rdv.date)) {
      map.set(rdv.date, []);
    }
    map.get(rdv.date).push(rdv);
  });
  const conflits = [];
  for (const [date, occurrences] of map.entries()) {
    if (occurrences.length > 1) {
      conflits.push({ date, occurrences });
    }
  }
  return conflits;
}

// Exemple de démonstration
const exemple = [
  { nom: 'Alice', date: '2026-08-12' },
  { nom: 'Bob', date: '2026-08-10' },
  { nom: 'Charlie', date: '2026-08-12' }
];

console.log('Trié :', trierParDate(exemple));
console.log('Conflits :', detecterConflits(exemple));