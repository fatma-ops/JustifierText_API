// Importation du module Router depuis 'express'
import { Router } from 'express';

// Importation de l'instance de Pool depuis le fichier '../database/db'
import { DataBase } from '../database/db';

// Importation de la fonction createToken depuis le fichier '../util/createToken'
import { createToken } from '../util/createToken';

// Expression régulière pour la validation de l'adresse e-mail
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Création d'une instance de Router pour gérer les routes
const tokenRouter = Router();

// Route POST '/token' pour la création et la récupération de jetons d'authentification
tokenRouter.post('/token', async (req, res) => {
  // Récupération de l'adresse e-mail depuis le corps de la requête
  const email = req.body.email;
  
  // Vérification si l'adresse e-mail est fournie
  if (!email) {
    return res.status(400).json({ erreur: 'L\'adresse e-mail est requise' });
  }

  // Validation de l'e-mail en utilisant l'expression régulière
  if (!emailRegex.test(email)) {
    return res.status(400).json({ erreur: 'Adresse e-mail invalide' });
  }

  // Création d'un jeton d'authentification en utilisant la fonction createToken
  const token = createToken(email);

  try {
    // Insertion de l'adresse e-mail dans la base de données, en évitant les conflits
    await DataBase.query('INSERT INTO users(email) VALUES ($1) ON CONFLICT DO NOTHING', [email]);
  } catch (error) {
    // Gestion des erreurs lors de l'accès à la base de données
    console.error('Erreur :', error);
    return res.status(500).json({ erreur: 'Erreur interne' });
  }

  // Réponse avec le jeton d'authentification
  return res.status(200).json(token);
});

// Exportation du router pour permettre son utilisation dans d'autres fichiers
export { tokenRouter };


