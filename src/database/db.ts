import {Pool} from 'pg' ; 

import { DATABASE_URL } from '../env';

const DataBase = new Pool({
  connectionString: DATABASE_URL + "?sslmode=require"}); 

export { DataBase };