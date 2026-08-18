document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rdvForm');
  const feedback = document.getElementById('formFeedback');
  let timeoutId = null;

  // Fonction améliorée pour afficher les messages
  function setFeedback(msg, type) {
    // Supprime l'ancien timeout s'il existe
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    // Icônes selon le type
    
    feedback.innerHTML = ` ${msg}`;
    feedback.className = `feedback ${type}`;
    feedback.style.opacity = '1';
    feedback.style.transform = 'translateY(0)';

    // Auto-effacement après 8 secondes (sauf pour les erreurs critiques, mais on laisse)
    if (type !== 'error') {
      timeoutId = setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          feedback.innerHTML = '';
          feedback.className = 'feedback';
          feedback.style.opacity = '1';
          feedback.style.transform = 'translateY(0)';
          timeoutId = null;
        }, 300);
      }, 8000);
    }
  }

  // --- Gestion de la soumission ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // on retire l'ancien feedback
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    feedback.innerHTML = '';
    feedback.className = 'feedback';
    feedback.style.opacity = '1';

    // Récupération des champs ...
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const telephone = document.getElementById('telephone').value.trim();
    const date = document.getElementById('date').value;
    const message = document.getElementById('message').value.trim();
    const honeypot = document.getElementById('website').value;

    // --- Validations (identiques, mais on utilise setFeedback amélioré) ---
    if (!nom || !email || !telephone || !date) {
      setFeedback('Tous les champs marqués * sont obligatoires.', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFeedback('Veuillez entrer une adresse email valide.', 'error');
      return;
    }
    // Adaptation pour numéro français et Béninois
    const phoneRegex = /^(?:(?:\+33|0)[1-9]\d{8}|(?:\+229|0)[1-9]\d{8})$/;
    if (!phoneRegex.test(telephone.replace(/\s/g, ''))) {
      setFeedback('Veuillez entrer un numéro de téléphone valide (de type français ou Béninois).', 'error');
      return;
    }
    const today = new Date();
    today.setHours(0,0,0,0);
    const selectedDate = new Date(date + 'T00:00:00');
    if (selectedDate < today) {
      setFeedback('La date ne peut pas être antérieure à aujourd\'hui.', 'error');
      return;
    }
    if (honeypot) {
      setFeedback('Votre demande a été envoyée (anti-spam).', 'success');
      form.reset();
      return;
    }

    // --- Envoi ---
    try {
      const response = await fetch('/api/rendezvous', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, telephone, date, message })
      });
      const result = await response.json();
      if (response.ok) {
        setFeedback(' Rendez-vous enregistré avec succès ! Nous vous recontacterons.', 'success');
        form.reset();
      } else {
        setFeedback( (result.error || 'Erreur serveur.'), 'error');
      }
    } catch (err) {
      setFeedback(' Erreur réseau. Vérifiez votre connexion.', 'error');
    }
  });
});
