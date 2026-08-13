# 🏛️ Centre TENONKPO – Prise de rendez-vous

Mini‑application de prise de rendez‑vous avec interface moderne (thème noir & gold) et stockage persistant dans un fichier JSON.

---

## 📦 Contenu du projet

- `frontend/index.html` – page HTML du formulaire  
- `frontend/style.css` – design noir & gold avec effets de verre et dorure  
- `frontend/script.js` – validation des champs, envoi au serveur, messages dynamiques  
- `backend/server.js` – serveur Node.js / Express avec API REST et stockage JSON  
- `backend/data.json` – fichier contenant tous les rendez‑vous (créé automatiquement)  
- `package.json` – dépendances et scripts de lancement  

---

## 🚀 Installation et lancement

```bash
# 1. Cloner ou télécharger le projet
cd back-end

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur (mode production)
npm start

# 4. (Optionnel) Lancer en mode développement avec rechargement automatique
npm run dev

Le serveur démarre sur http://localhost:3000
Ouvrez cette adresse dans votre navigateur.

```


## 🧭 Utilisation

1. Remplissez le formulaire avec vos informations.

2. Cliquez sur « Envoyer ma demande ».

3. Le système vérifie :

* tous les champs obligatoires sont remplis,

* l’email est valide,

* le téléphone est au format correct (06XXXXXXXX ou +33XXXXXXXXX),

* la date n’est pas dans le passé.

4. Si tout est correct, les données sont envoyées au serveur et stockées dans data.json.

5. Un message de succès ou d’erreur s’affiche en bas du formulaire.


## 🔧 Fonctionnalités techniques

### Frontend (JavaScript)
- Validation des champs en temps réel avant l’envoi.

- Envoi des données au serveur via fetch / API REST.

- Affichage de messages avec icônes et couleurs (succès / erreur).

- Disparition automatique des messages de succès après 8 secondes.

- Champ honeypot invisible pour bloquer les robots spammeurs.

### Backend (Node.js + Express)
Route POST /api/rendezvous pour enregistrer un rendez‑vous.

Validation redondante côté serveur (sécurité).

Vérification des doublons (même email + même date).

Stockage dans data.json (base de données simplifiée).

Réponses JSON structurées avec codes HTTP (201, 400, 409, 500).

### Fonctions utilitaires (exemple)
- ``trierParDate()`` – trie les rendez‑vous par date croissante.

- ``detecterConflits()`` – trouve les dates où plusieurs rendez‑vous existent.


## 📁 Structure du projet
```text
projet/
├── backend/
│   ├── server.js          # Serveur Express
│   └── data.json  
|   |── package.json         # Stockage des rendez‑vous (créé automatiquement)
├── frontend/
│   ├── index.html         # Formulaire
│   ├── style.css          # Thème noir & gold
│   └── script.js          # Validation et envoi          # Dépendances et scripts
└── README.md              # Ce fichier
```


## ⚙️ Dépendances principales

- Package	Utilisation
- Express	Serveur web et API REST
- Nodemon	Rechargement automatique en développement

## 🛡️ Sécurité implémentée

- Validation des données côté client (UX) et côté serveur (sécurité).

- Contrôle des formats (email, téléphone, date).

- Anti‑spam via champ honeypot.

- Vérification des doublons avant l’enregistrement.


## 👨‍💻 Auteur

**Essenam Perside Joanice ALOTCHO** – projet réalisé dans le cadre du test pratique du stage académique 2025-2026.


## 📅 Date de rendu
Vendredi 14/08/2026 à 17h 00

## 📜 Licence
Ce projet est réalisé à des fins pédagogiques.
Toute réutilisation est autorisée dans le cadre de l’apprentissage.

``` ASCII
[Utilisateur]
│
▼
[Formulaire HTML]
│
▼
[JavaScript] – Validation (email, téléphone, date)
│
▼
[fetch POST /api/rendezvous]
│
▼
[serveur Express] – Validation + anti‑doublon
│
▼
[data.json] – Stockage persistant
│
▼
[Message de succès / erreur] ← retour au navigateur

```
