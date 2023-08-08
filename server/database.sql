-- Create the table here then copy/past on terminal


CREATE TABLE [IF NOT EXISTS] users (
    userId serial PRIMARY KEY,
    userMail VARCHAR (150) NOT NULL,
    userPassword VARCHAR (150) NOT NULL,
);

CREATE TABLE [IF NOT EXISTS] Cars (
   carId serial PRIMARY KEY,
   carBrand VARCHAR(25) NOT NULL,
   carModel VARCHAR(25) NOT NULL,
   circulationDate int(4) NOT NULL,
   engine VARCHAR (15),
   distanceTravel int (8) NOT NULL
);

CREATE TABLE [IF NOT EXISTS] schedule(
    dayName VARCHAR (10),
    hourStart DATE TIME,
    hourPause DATE TIME,
    hourStopPAUSE DATE TIME,
    hourStop DATE TIME,
);


CREATE TABLE [IF NOT EXISTS]  presInfo(
    infoId serial PRIMARY KEY,
    infoTitle VARCHAR(50) NOT NULL,
    infoText VARCHAR (350) NOT NULL
);

CREATE TABLE [IF NOT EXISTS]  noticeMessage(
    noticeId serial PRIMARY KEY,
    noticeUserNAME VARCHAR(50) NOT NULL,
    noticeUserLASTNAME VARCHAR (50) NOT NULL,
    noticeUserMessage VARCHAR (350) NOT NULL
);

CREATE TABLE [IF NOT EXISTS]  carsMessage(
    carMessageId serial PRIMARY KEY,
    carUserNAME VARCHAR(50) NOT NULL,
    carUserLASTNAME VARCHAR (50) NOT NULL,
    carUserMAIL VARCHAR (50) NOT NULL,
    carUserMessage VARCHAR (350) NOT NULL,
    dateMeet DATE,
    hourMeet DATE TIME,
);
