import { Router } from 'express';

import { DataBase } from '../database/db';
import { authenticateToken } from '../middlewares/authmiddlewares';

const justifyRouter = Router();

const justifier = (str: string, len: number): string => {
    const regex = RegExp('(?:\\s|^)(.{1,' + len + '})(?=\\s|$)', 'g');
    const tableauMots = [];
    const tableauJustifié = [];
  
    let motParse = regex.exec(str);
    while (motParse !== null) {
      tableauMots.push(motParse[1].trim());
      motParse = regex.exec(str);
    }
  
    for (let i = 0; i < tableauMots.length - 1; i++) {
      if (tableauMots[i].indexOf(' ') !== -1) {
        while (tableauMots[i].length < len) {
          for (let j = 0; j < tableauMots[i].length - 1; j++) {
            if (tableauMots[i][j] === ' ') {
              tableauMots[i] = tableauMots[i].substring(0, j) + ' ' + tableauMots[i].substring(j);
              if (tableauMots[i].length === len) break;
              while (tableauMots[i][j] === ' ') j++;
            }
          }
        }
      }
      if (tableauMots[i].search(/\S/g) !== -1) tableauJustifié.push(tableauMots[i]);
    }
  
    if (tableauMots[tableauMots.length - 1].search(/\S/g) !== -1) tableauJustifié.push(tableauMots[tableauMots.length - 1]);
  
    return tableauJustifié.join('\n');
  };
  

justifyRouter.post('/justify', authenticateToken, async (req, res) => {

  const text: string = req.body;
  console.log(text)
  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'body must be of type text/plain' });
  }

  const words = text.trim().split(/\s+/).length;
  if (words > 80000) return res.status(402).json({ error: 'daily limit rate of 80000 words reached' });

  try {
    // @ts-ignore
    const getUser = await DataBase.query('SELECT last_used, limit_rate FROM users WHERE email = $1', [req.user]);

    if (!getUser.rows[0]) return res.status(403).json({ error: "user doesn't exist" });

    let updatedLimitRate: number;
    if (new Date().getTime() - getUser.rows[0].last_used.getTime() >= 86400000) updatedLimitRate = words;
    else updatedLimitRate = words + getUser.rows[0].limit_rate;

    if (updatedLimitRate > 80000) return res.status(402).json({ error: 'daily limit rate of 80000 words reached' });
    else {
      const updateUser = await DataBase.query(
        'UPDATE users SET limit_rate = $1, last_used = CURRENT_DATE WHERE email = $2',
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

export { justifyRouter };

