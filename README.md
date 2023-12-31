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
   Le module createToken dans util/createToken.ts génère un token JWT .
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
. Le code a été déployé sur Render, et la base de données a été déployée sur Vercel. Assurez-vous de configurer les 
  variables d'environnement appropriées pour chaque plateforme.
  (https://dashboard.render.com/ ) , (https://vercel.com/login)
. Vous pouvez accéder à l'application en suivant ce lien : https://final-testt.onrender.com/api/

# Base URL 
Si vous souhaitez utiliser l'API localement, vous pouvez effectuer des requêtes en utilisant l'adresse http://127.0.0.1:4000. Voici les endpoints :
- Obtenir un token d'authentification : `http://127.0.0.1:4000/api/token` (méthode POST avec un corps JSON `{"email": "votre@email.com"}`)
- Justifier un texte : `http://127.0.0.1:  4000/api/justifier` (méthode POST avec un corps de type texte et l'en-tête d'autorisation
  *POST /api/token
-  <img width="627" alt="image" src="https://github.com/fatma-ops/ticatrip/assets/73761826/3817ce50-162a-42b2-87b6-ac89c73128f7">
  * POST /api/justifier
<img width="674" alt="image" src="https://github.com/fatma-ops/ticatrip/assets/73761826/c024ee3c-8d09-4403-b0d6-73154d59cebf">

<img width="668" alt="image" src="https://github.com/fatma-ops/ticatrip/assets/73761826/666f7766-f857-48cc-8ef7-1908aae4dea9">





  







