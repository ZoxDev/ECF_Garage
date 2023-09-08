-- Create the table here then copy/past on terminal


CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(125) NOT NULL,
    user_paswword VARCHAR(75) NOT NULL
);

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


-- Inset new column

ALTER TABLE users
ADD user_role VARCHAR(255);


-- There is also the SET ROLE