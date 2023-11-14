// Importation du module jwt pour la gestion des tokens JWT
import jwt from 'jsonwebtoken';
// Importation des types Request, Response, NextFunction depuis 'express'
import { Request, Response, NextFunction } from 'express';
// Importation de la clé secrète pour la vérification des tokens JWT depuis le fichier '../env'
import { TOKEN_SECRET } from '../env';

// Middleware pour l'authentification basée sur les tokens JWT
const authenticationToken = (req: Request, res: Response, next: NextFunction) => {

  // Récupération de l'en-tête 'Authorization' de la requête
  const authHeader = req.headers['authorization'];
  // Extraction du token du header s'il existe
  const token = authHeader && authHeader.split(' ')[1];
  // Vérification de la présence d'un token dans la requête
  if (!token) return res.status(403).json({ error: 'Token non fourni' });

  try {
  // Vérification et décodage du token à l'aide de la clé secrète
    const decoded = jwt.verify(token, TOKEN_SECRET as string);
    // Assignation des informations utilisateur décodées à l'objet 'user' dans la requête
    // @ts-ignore  (permet d'ignorer l'erreur TypeScript car le type de 'user' a été ajouté dynamiquement)
    req.user = decoded;

    next();
  // Gestion des erreurs en cas de token invalide
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: 'La token est invalide ' });
  }
};

export { authenticationToken };