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
3. Ouvrir un terminal dans Visual Studio Code
4. Supprimer dans le package.json la section "engines" sinon le projet ne fonctionnera pas
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
PG_USER="postgres" (Ou le nom d'utilisateur de postgresql)
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
        -- Create the table here then copy/past on terminal
        -- Create database only on local
        CREATE DATABASE garageveparrot;

        CREATE EXTENSION "uuid-ossp";

        CREATE TABLE images(
            imageid serial PRIMARY KEY,
            imagename VARCHAR(50)
        );

        CREATE TABLE users (
            user_id uuid PRIMARY KEY DEFAULT
            uuid_generate_v4(),
            user_name VARCHAR(50) NOT NULL,
            user_email VARCHAR(125) NOT NULL,
            user_paswword VARCHAR(75) NOT NULL
            );

        -- Inset new column
        ALTER TABLE users
        ADD user_role VARCHAR(255);

        CREATE TABLE Cars (
        carId serial PRIMARY KEY,
        carBrand VARCHAR(25) NOT NULL,
        carModel VARCHAR(25) NOT NULL,
        circulationDate int NOT NULL,
        engine VARCHAR (15),
        price int NOT NULL,
        distanceTravel int NOT NULL
        );

        CREATE TABLE schedule(
            dayName VARCHAR (10),
            hourStart TIME,
            hourPause TIME,
            hourStopPAUSE TIME,
            hourStop TIME
        );

        CREATE TABLE presInfo(
            infoId serial PRIMARY KEY,
            infoTitle VARCHAR(50) NOT NULL,
            infoText VARCHAR (350) NOT NULL
        );

        CREATE TABLE noticeMessage(
            noticeId serial PRIMARY KEY,
            noticeUserNAME VARCHAR(50) NOT NULL,
            noticeUserLASTNAME VARCHAR (50) NOT NULL,
            noticeUserMessage VARCHAR (350) NOT NULL,
            noticeUserNote SMALLINT NOT NULL
        );

        CREATE TABLE carsMessage(
            carMessageId serial PRIMARY KEY,
            carUserNAME VARCHAR(50) NOT NULL,
            carUserLASTNAME VARCHAR (50) NOT NULL,
            carUserMAIL VARCHAR (50) NOT NULL,
            carUserMessage VARCHAR (350) NOT NULL,
            dateMeet DATE,
            hourMeet TIME
        );

        -- Insert schedule basics
        INSERT INTO schedule VALUES ('Lundi', '8:00', '12:00', '14:00', '18:00');
        INSERT INTO schedule VALUES ('Mardi', '8:00', '12:00', '14:00', '18:00');
        INSERT INTO schedule VALUES ('Mercredi', '8:00', '12:00', '14:00', '18:00');
        INSERT INTO schedule VALUES ('Jeudi', '8:00', '12:00', '14:00', '18:00');
        INSERT INTO schedule VALUES ('Vendredi', '8:00', '12:00', '14:00', '18:00');
        INSERT INTO schedule VALUES ('Samedi', '8:00','12:00');

        -- Create the three basics informations
        INSERT INTO presInfo (infoTitle, infoText) VALUES ('Réparation', 'réparationtext');
        INSERT INTO presInfo (infoTitle, infoText) VALUES ('Ventes', 'ventestext');
        INSERT INTO presInfo (infoTitle, infoText) VALUES ('Entretien', 'entretientext');

        -- There is also the SET ROLE
    ```
9. Les données sont désormais affichées sur le site ! (Vérifier le dotenv et relancer le npm start)


### Créer un utilisateur
1. Allez sur le fichier `jwtAuth.js` dans `/routes` et sur la ligne 22 enlever `authorization,` et relancer le serveur.
1. Allez sur post man et crée une requête POST
2. Taper l'URL `http://localhost:5000/auth/createemployee`
3. Dans l'onglet `Body`, sélectionner `raw` et `JSON`
4. Taper le code suivant :
```json
{
    "name": "ExempleNom",
    "email": "ExempleEmail",
    "password": "ExempleMotDePasse"
}
```
5. Cliquer sur `Send`
6. L'utilisateur est désormais créé !
7. Allez sur postgres comme précédant et taper la commande suivante :
    ```UPDATE users SET user_role = 'admin' WHERE user_name = '(le nom de l'utilisateur)';```
8. L'utilisateur est désormais un administrateur ! Vous pouvez vous connectez sur le site avec ses identifiants !

### FINIS !

