# Justifieur de Texte API
Ce projet met en œuvre une API REST pour justifier un texte fourni en paramètre, en suivant les contraintes spécifiées.
# Objectif
- Les lignes du texte justifié doivent avoir une longueur de 80 caractères.
- L'endpoint doit être de la forme /api/justifier et doit retourner un texte justifié suite à une requête POST avec un body de ContentType text/plain.
- L'API doit utiliser un mécanisme d'authentification via un token unique. L'obtention du token se fait en utilisant l'endpoint /api/token, qui retourne un token à partir 
  d'une requête POST avec un corps JSON contenant l'adresse e-mail ({"email": "foo@bar.com"}).
- Un rate limit par token est appliqué à l'endpoint /api/justifier, fixé à 80 000 mots par jour. Si cette limite est dépassée, une erreur 402 Payment Required est renvoyée.
- Le code doit être déployé sur un URL ou une IP public.
- Le code doit être rendu sur GitHub (ou GitLab).
- Langage utilisé : Node.js avec TypeScript.
- Aucune utilisation de bibliothèque externe pour la justification du texte.

# Structure du Projet
1) Base de Données :
   Le fichier db.js gère la connexion à la base de données PostgreSQL, crée la table "users" et expose une instance de Pool pour l'utilisation dans d'autres modules.
   Authentification
2) Authentification:
   Le module createToken dans util/createToken.ts génère un token JWT avec une expiration de 24 heures.
   Le middleware authenticationToken dans middlewares/authmiddlewares.ts vérifie et décode les tokens JWT pour l'authentification.
3) Routes:
   Le router principal dans routes/index.ts combine les routes des justifications et des tokens.
   Le router justifierRouter dans justify.ts expose la route POST /justifier pour justifier un texte. Il applique le middleware d'authentification.
   Le router tokenRouter dans userToken.ts expose la route POST /token pour obtenir un token en fournissant une adresse e-mail.

4) Logique de justification : 
   La logique de justification du texte est gérée par la fonction justifier dans le fichier justify.ts. Cette fonction prend en entrée une chaîne de caractères (str) et une 
   longueur cible (len) pour les lignes justifiées.
5) Application express :
   L'application Express est configurée dans app.ts pour gérer les routes et les types de données.
6) Variables d'Environnement:
   Les variables d'environnement, telles que le port, la clé secrète du token, et l'URL de la base de données, sont stockées dans le fichier .env.
# Installation 
- Installez les dépendances : npm install   
- Créez un fichier .env avec les variables d'environnement nécessaires.
# Run the project 
- npm start
# Déploiement
- Le code a été déployé sur Render, et la base de données a été déployée sur Vercel. Assurez-vous de configurer les variables d'environnement appropriées pour chaque 
  plateforme.



