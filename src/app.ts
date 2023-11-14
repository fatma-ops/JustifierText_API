// Importation du module express
import express from 'express';

// Importation du router depuis le fichier des routes
import { router } from './routes';

// Création d'une instance d'Express
const app = express();

// Configuration de l'application pour traiter les données textuelles
app.use(express.text());

// Configuration de l'application pour traiter les données encodées dans l'URL
app.use(express.urlencoded({ extended: true }));

// Configuration de l'application pour traiter les données au format JSON
app.use(express.json());

// Configuration de l'application pour formater la sortie JSON avec une indentation de 2 espaces
app.set('json spaces', 2);

// Utilisation du router pour gérer les routes sous le préfixe '/api'
app.use('/api', router);

// Exportation de l'application pour permettre son utilisation dans d'autres fichiers
export { app };
