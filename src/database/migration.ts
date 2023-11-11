import { DataBase} from './db';

DataBase.on('connect', () => {
  console.log('connected to database');
});

//CREATE USER TABLE
const createUserTable = () => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
    (id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_on DATE NOT NULL DEFAULT CURRENT_DATE,
    last_used DATE NOT NULL DEFAULT CURRENT_DATE,
    limit_rate INT NOT NULL DEFAULT 0)`;
  
    DataBase
      .query(userCreateQuery)
      .then((result) => {
        console.log(result);  
        DataBase.end();
      })
      .catch((error) => {
        console.log(error);  
        DataBase.end();
      });
  };
  
  createUserTable();
  