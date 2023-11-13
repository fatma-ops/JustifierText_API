import { Router } from 'express';
import { DataBase } from '../database/db';
import { createToken } from '../util/createToken';

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const tokenRouter = Router();

tokenRouter.post('/token', async (req, res) => {
  const email = req.body.email;
  
  if (!email) {
    return res.status(400).json({ error: 'email address is required' });
  }

  // Validation de l'e-mail en utilisant l'expression régulière
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'invalid email address' });
  }

  const token = createToken(email);

  try {
    await DataBase.query('INSERT INTO users(email) VALUES ($1) ON CONFLICT DO NOTHING', [email]);
  } catch (error) {
    return res.status(500).json({ error: 'internal server error' });

  }

  return res.status(200).json(token);
});

export { tokenRouter };

