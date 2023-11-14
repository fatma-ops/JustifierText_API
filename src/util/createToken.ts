
// Importation du module jwt depuis 'jsonwebtoken'
import jwt from 'jsonwebtoken';

// Importation de la clé secrète du token et la durée de validité du token depuis le fichier '../env'
import { TOKEN_SECRET , TOKEN_EXPIRE} from '../env';

// Fonction pour créer un token d'authentification avec une expiration de 24 heures
const createToken = (email: string): string => {
  // Signature du token en utilisant l'adresse e-mail et la clé secrète
  // L'option expiresIn définit la durée de validité du token (ici, 24 heures)
  return jwt.sign({ email }, TOKEN_SECRET as string);
};

// Exportation de la fonction pour permettre son utilisation dans d'autres fichiers
export { createToken };

