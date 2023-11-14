// Importation du module jwt depuis 'jsonwebtoken'
import jwt from 'jsonwebtoken';
// Importation de la clé secrète du token depuis le fichier '../env'
import { TOKEN_SECRET } from '../env';

// Fonction pour créer un token d'authentification avec une expiration de 24 heures
const createToken = (email: string): string => {
  // Signature du token en utilisant l'adresse e-mail et la clé secrète
  return jwt.sign(email, TOKEN_SECRET as string );
};
// Exportation de la fonction pour permettre son utilisation dans d'autres fichiers
export { createToken };
