import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const app = express();
const secretKey = 'yourSecretKey'; // Change this with a strong secret key in production

app.use(bodyParser.json());

const users: { email: string }[] = [];

// Route pour créer un utilisateur
app.post('/api/signup', (req: Request, res: Response) => {
    const { email } = req.body;

    // Vérifie si l'email est déjà utilisé
    if (users.find(user => user.email === email)) {
        return res.status(409).json({ error: 'Email already in use' });
    }

    // Ajoute l'utilisateur à la liste (simulé, utilise une base de données en production)
    users.push({ email });

    res.json({ message: 'User created successfully' });
});

// Route pour obtenir un token JWT
app.post('/api/login', (req: Request, res: Response) => {
    const { email } = req.body;

    // Vérifie si l'utilisateur existe
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Crée un token JWT
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    res.json({ token });
});

// Route protégée nécessitant une authentification avec JWT
app.get('/api/protected', (req: Request, res: Response) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        res.json({ message: 'Protected resource accessed successfully', user: decoded });
    });
});



app.use(bodyParser.text()); // Ajoutez cette ligne pour gérer le texte brut
//function justifyText(text: string): string {
 //   if (typeof text !== 'string') {
      // Si le texte n'est pas une chaîne de caractères, renvoyer une erreur
 //     throw new Error('Input must be a string');
  //  }
  
  //  const words = text.split(' ');
  //  const lines: string[] = [];
   // let currentLine = words[0];
  
   // for (let i = 1; i < words.length; i++) {
    //  const word = words[i];
     // if ((currentLine.length + 1 + word.length) <= 80) {
        // Ajouter le mot à la ligne actuelle
    //    currentLine += ' ' + word;
     // } else {
        // Commencer une nouvelle ligne avec le mot actuel
      //  lines.push(currentLine);
       // currentLine = word;
      //}
   // }
  
    // Ajouter la dernière ligne
    //lines.push(currentLine);
  
   // return lines.join('\n');
 // }
  
//app.post('/api/justify', (req: Request, res: Response) => {
  //const inputText: string = req.body;
  //console.log(inputText)
 // const justifiedText = justifyText(inputText);

 // res.send(justifiedText);
//});
// server.ts










  
  
  
  
  
  
   



