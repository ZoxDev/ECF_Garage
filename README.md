## Liens
- Lien du projet : (Désolé sur le document word le lien ne fonctionne pas)
https://garageecf-970df12b266a.herokuapp.com/

## Prérequis
Vous avez besoin en prérequis de : 
- Git
- Visual Studio Code
- Postman
- PostgreSQL
- NodeJS

## Installation
1. Cloner le projet sur votre machine
2. Ouvrir le projet dans Visual Studio Code
3. Ouvrir un terminal dans Visual Studio Coden
4. Taper la commande suivante :
    ```npm install```
5. Taper la commande suivante :
    ```cd client && npm install && npm install vite && npm run build```
6. Taper la commande suivante :
    ```npm start```
7. Vous voilà sur le site avec le port 5000 !

##  Basse de données
1. Installez postgresql
2. Retenir le mot de passe ainsi que le port de postgresql
3. Dans un fichier .env à la racine du projet, taper le code suivant :
```env
PG_USER="postgres" 
PG_PASSWORD="oui" (Ou le mot de passe de postgresql)
PG_HOST="localhost"
PG_PORT=5432 (Ou le port de postgresql)
PG_DATABASE="garagevparrot"

jwtSecret=cat123
```
4. Dans le terminal, taper la commande suivante :
    ```psql -U postgres``` (Ou le nom d'utilisateur de postgresql)
5. Taper le mot de passe de postgresql
6. Taper la commande suivante :
    ```CREATE DATABASE garagevparrot;```
7. Taper la commande suivante :
    ```\c garagevparrot```
8. Taper la commande suivante :
    ```
    
    ```



### Créer un utilisateur
1. Créer une requête POST
2. Taper l'URL `http://localhost:3000/api/auth/signup`
3. Dans l'onglet `Body`, sélectionner `raw` et `JSON`
4. Taper le code suivant :
```json
{
    "name": "",
    "email": "",
    "passowrd": ""
}
```
5. Cliquer sur `Send`


