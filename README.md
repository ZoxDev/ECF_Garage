## Liens
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
3. Ouvrir un terminal dans Visual Studio Code
4. Taper la commande `npm install` pour installer les dépendances
5. Taper la commande `npm start` pour lancer le serveur

##  Basse de données

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


