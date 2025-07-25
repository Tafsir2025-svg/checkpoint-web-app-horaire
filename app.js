const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware horaire
app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 = Dimanche, 6 = Samedi
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Période autorisée
  } else {
    res.send(`
      <h1>Heures d'ouverture de la plateforme</h1>
      <p>Notre site est disponible du lundi au vendredi, de 9h à 17h.</p>
    `);
  }
});

// Fichiers statiques (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
