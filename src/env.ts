import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const DATABASE_URL= process.env.DATABASE_URL;
const TOKEN_EXPIRE=process.env.TOKEN_EXPIRE

export { PORT, TOKEN_SECRET, DATABASE_URL , TOKEN_EXPIRE};