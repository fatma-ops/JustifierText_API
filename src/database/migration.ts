// Importation de l'instance de Pool depuis le fichier './db'
import { DataBase} from './db';

// Gestionnaire d'événement pour la connexion à la base de données
DataBase.on('connect', () => {
  console.log('connected to database');
});

//la creation de la table users 
const creationUser = () => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
    (id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_on DATE NOT NULL DEFAULT CURRENT_DATE,
    last_used DATE NOT NULL DEFAULT CURRENT_DATE,
    nbr_mot INT NOT NULL DEFAULT 0)`;

    // Exécution de la requête SQL à l'aide de l'instance de Pool
    DataBase
      .query(userCreateQuery)
      .then((result) => {
       // Affichage du résultat de la création de la table
        console.log(result); 
       // Fermeture de la connexion à la base de données
        DataBase.end();
      })
      .catch((error) => {
        console.log(error); 
       // Fermeture de la connexion à la base de données en cas d'erreur
        DataBase.end();
      });
  };
  //Appel de la fonction creationUser
  creationUser();
  