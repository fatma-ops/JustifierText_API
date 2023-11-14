// Importation de l'instance d'application Express depuis le fichier 'app'
const { app } = require('./app');

// Importation de la variable PORT depuis le fichier 'env'
const { PORT } = require('./env');

// Démarrage du serveur Express en écoutant sur le port spécifié
app.listen(PORT, () => console.log(`En cours d'exécution sur le port ${PORT}`));

