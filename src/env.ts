// Importation du module dotenv pour la gestion des variables d'environnement
import dotenv from 'dotenv';

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Récupération de la valeur de la variable d'environnement PORT
const PORT = process.env.PORT;

// Récupération de la valeur de la clé secrète du token depuis les variables d'environnement
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// Récupération de la valeur de l'URL de la base de données depuis les variables d'environnement
const DATABASE_URL = process.env.DATABASE_URL;

// Récupération de la valeur de la durée d'expiration du token depuis les variables d'environnement
const TOKEN_EXPIRE = process.env.TOKEN_EXPIRE;

// Exportation des variables d'environnement pour permettre leur utilisation dans d'autres fichiers
export { PORT, TOKEN_SECRET, DATABASE_URL, TOKEN_EXPIRE };
