
// Importation du module jwt depuis 'jsonwebtoken'
import jwt from 'jsonwebtoken';

// Importation de la clé secrète du token, la durée de validité du token, et la date de création depuis le fichier '../env'
import { TOKEN_SECRET, TOKEN_EXPIRE, TOKEN_ISSUED_AT } from '../env';

// Fonction pour créer un token d'authentification avec une expiration et une date de création définies par l'environnement
const createToken = (email: string): string => {
  // Date de création du token (en secondes depuis l'époque)
  const issuedAt = Math.floor(Date.now() / 1000);

  // Signature du token en utilisant l'adresse e-mail, la clé secrète, la durée de validité, et la date de création
  return jwt.sign({ email, iat: issuedAt }, TOKEN_SECRET as string, { expiresIn: TOKEN_EXPIRE });
};

// Exportation de la fonction pour permettre son utilisation dans d'autres fichiers
export { createToken };


