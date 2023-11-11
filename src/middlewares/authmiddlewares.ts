import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { TOKEN_SECRET } from '../env';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(403).json({ error: 'No token provided.' });

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET as string);

    // @ts-ignore
    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

export { authenticateToken };