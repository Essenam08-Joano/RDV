const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../front-end')));

// Fichier de stockage
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialiser le fichier s'il n'existe pas
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Lire les données
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE);
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Écrire les données
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Route POST /api/rendezvous
app.post('/api/rendezvous', (req, res) => {
  try {
    const { nom, email, telephone, date, message } = req.body;

    // --- Validation côté serveur (redondante mais sécurisée) ---
    if (!nom || !email || !telephone || !date) {
      return res.status(400).json({ error: 'Champs obligatoires manquants.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email invalide.' });
    }
    // Pour numéro français et Béninois
    const phoneRegex = /^(?:(?:\+33|0)[1-9]\d{8}|(?:\+229|0)[1-9]\d{7})$/;;
    if (!phoneRegex.test(telephone.replace(/\s/g, ''))) {
      return res.status(400).json({ error: 'Téléphone invalide.' });
    }
    const today = new Date();
    today.setHours(0,0,0,0);
    const selectedDate = new Date(date + 'T00:00:00');
    if (selectedDate < today) {
      return res.status(400).json({ error: 'La date ne peut pas être antérieure à aujourd\'hui.' });
    }

    // Anti-doublon : même email + même date
    const existing = readData();
    const duplicate = existing.some(
      (r) => r.email === email && r.date === date
    );
    if (duplicate) {
      return res.status(409).json({ error: 'Un rendez-vous existe déjà pour cet email à cette date.' });
    }

    // Enregistrement
    const newRdv = {
      id: Date.now(),
      nom,
      email,
      telephone,
      date,
      message: message || '',
      createdAt: new Date().toISOString()
    };
    existing.push(newRdv);
    writeData(existing);

    res.status(201).json({ message: 'Rendez-vous créé', rdv: newRdv });
  } catch (err) {
    console.error('Erreur serveur :', err);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
