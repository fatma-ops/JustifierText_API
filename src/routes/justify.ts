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
  

  justifierRouter.post('/justify', authenticationToken, async (req, res) => {
    const text: string = req.body;
      console.log('Requête POST reçue sur /api/justify');
  
    if (typeof text !== 'string') {
      return res.status(400).json({ error: 'body must be of type text/plain' });
    }
  
    const words = text.trim().split(/\s+/).length;
    if (words > 80000) return res.status(402).json({ error: 'daily limit rate of 80000 words reached' });
  
    try {
      // @ts-ignore
      const getUser = await poolPG.query('SELECT last_used, limit_rate FROM users WHERE email = $1', [req.user]);
  
      if (!getUser.rows[0]) return res.status(403).json({ error: "user doesn't exist" });
  
      let updatedLimitRate: number;
      if (new Date().getTime() - getUser.rows[0].last_used.getTime() >= 86400000) updatedLimitRate = words;
      else updatedLimitRate = words + getUser.rows[0].limit_rate;
  
      if (updatedLimitRate > 80000) return res.status(402).json({ error: 'daily limit rate of 80000 words reached' });
      else {
        const updateUser = await DataBase.query(
          'UPDATE users SET nbr_mot = $1, last_used = CURRENT_DATE WHERE email = $2',
          // @ts-ignore
          [updatedLimitRate, req.user]
        );
  
        console.log(updateUser);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'internal error' });
    }
  
    const justifiedText = justifier(text, 80);
    return res.setHeader('Content-Type', 'text/plain').status(200).send(justifiedText);
  });
  
  export { justifierRouter };

