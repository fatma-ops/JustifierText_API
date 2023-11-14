// Importation du module Pool depuis la bibliothèque pg
import {Pool} from 'pg' ; 

import { DATABASE_URL } from '../env';
// Création d'une nouvelle instance de Pool pour gérer la connexion à la base de données
const DataBase = new Pool({
  connectionString: DATABASE_URL + "?sslmode=require"}); 

// Exportation de l'instance de Pool pour permettre son utilisation dans d'autres modules
export { DataBase };