// Importation du module Router depuis 'express'
import { Router } from 'express';
// Importation de l'instance de Pool depuis le fichier '../database/db'
import { DataBase } from '../database/db';
// Importation du middleware d'authentification depuis '../middlewares/authmiddlewares'
import { authenticationToken } from '../middlewares/authmiddlewares';
// Création d'une instance de Router pour gérer les routes
const justifierRouter = Router();

// Fonction pour justifier une chaîne de texte en fonction d'une longueur spécifiée
const justifier = (str: string, len: number): string => {
  // Extraction des mots de la chaîne à l'aide de l'expression régulière
    const regex = RegExp('(?:\\s|^)(.{1,' + len + '})(?=\\s|$)', 'g');
    const tableauMots = [];
    const tableauJustifié = [];
  
    let motParse = regex.exec(str);
    while (motParse !== null) {
      tableauMots.push(motParse[1].trim());
      motParse = regex.exec(str);
    }
  // Boucle pour justifier les mots dans le tableauMots
    for (let i = 0; i < tableauMots.length - 1; i++) {
    // Vérification si le mot contient un espace
      if (tableauMots[i].indexOf(' ') !== -1) {
        // Boucle pour ajouter des espaces jusqu'à ce que la longueur du mot atteigne 'len'
        while (tableauMots[i].length < len) {
          for (let j = 0; j < tableauMots[i].length - 1; j++) {
            // Ajout d'un espace à la première occurrence d'un espace dans le mot
            if (tableauMots[i][j] === ' ') {
              tableauMots[i] = tableauMots[i].substring(0, j) + ' ' + tableauMots[i].substring(j);
            // Sortie de la boucle si la longueur du mot atteint 'len'
              if (tableauMots[i].length === len) break;
            // Déplacement du pointeur jusqu'à la prochaine caractère non espace

              while (tableauMots[i][j] === ' ') j++;
            }
          }
        }
      }
      // Ajout du mot justifié au tableau si le mot contient des caractères non espace
      if (tableauMots[i].search(/\S/g) !== -1) tableauJustifié.push(tableauMots[i]);
    }
    // Ajout du dernier mot au tableau justifié s'il contient des caractères non espace
    if (tableauMots[tableauMots.length - 1].search(/\S/g) !== -1) tableauJustifié.push(tableauMots[tableauMots.length - 1]);
    // Retourne la chaîne justifiée en joignant les mots avec des sauts de ligne
    return tableauJustifié.join('\n');
  };
  

// Définition d'une route POST '/justifier' sur le router justifierRouter, avec le middleware d'authentification
justifierRouter.post('/justifier', authenticationToken, async (req, res) => {
  // Récupération du texte à justifier depuis le corps de la requête
  const texte: string = req.body;
  console.log(texte);

  // Vérification si le texte est une chaîne de caractères
  if (typeof texte !== 'string') {
    return res.status(400).json({ erreur: 'Le texte doit être du type text/plain' });
  }

  // Calcul du nombre de mots dans le texte
  const mots = texte.trim().split(/\s+/).length;

  // Vérification si le nombre de mots dépasse la limite quotidienne de 80 000
  if (mots > 80000) return res.status(402).json({ erreur: 'Vous avez atteint la limite quotidienne de 80 000 mots' });

  try {
    // Récupération des informations utilisateur (last_used, nbr_mot) depuis la base de données
    // @ts-ignore
    const getUser = await DataBase.query('SELECT last_used, nbr_mot FROM users WHERE email = $1', [req.user]);

    // Vérification si l'utilisateur existe
    if (!getUser.rows[0]) return res.status(403).json({ erreur: "L'utilisateur n'existe pas" });

    let limiteQuotidienneMots: number;

    // Calcul de la nouvelle limite quotidienne en fonction de la dernière utilisation de l'utilisateur
    if (new Date().getTime() - getUser.rows[0].last_used.getTime() >= 86400000) {
      limiteQuotidienneMots = mots;
    } else {
      limiteQuotidienneMots = mots + getUser.rows[0].nbr_mot;
    }

    // Vérification si la nouvelle limite quotidienne dépasse 80 000 mots
    if (limiteQuotidienneMots > 80000) {
      return res.status(402).json({ erreur: 'Vous avez atteint la limite quotidienne de 80 000 mots' });
    } else {
      // Mise à jour de la base de données avec la nouvelle limite quotidienne des mots et la date d'utilisation actuelle
      const updateUser = await DataBase.query(
        'UPDATE users SET nbr_mot = $1, last_used = CURRENT_DATE WHERE email = $2',
        // @ts-ignore
        [limiteQuotidienneMots, req.user]
      );

      console.log(updateUser);
    }
  } catch (err) {
    // Gestion des erreurs lors de l'accès à la base de données
    console.log(err);
    return res.status(500).json({ erreur: 'Erreur interne' });
  }

  // Justification du texte et envoi de la réponse avec le texte justifié
  const texteJustifié = justifier(texte, 80);
  return res.setHeader('Content-Type', 'text/plain').status(200).send(texteJustifié);
});

// Exportation du router pour permettre son utilisation dans d'autres fichiers
export { justifierRouter };



