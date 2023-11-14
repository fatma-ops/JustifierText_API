

import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../env';

const createToken = (email: string): string => {
  return jwt.sign(email, TOKEN_SECRET as string );
};

export { createToken };
