const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require('path');
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 5000;

// DotEnv
require("dotenv").config();

// Use of app
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Create user JWT AUTH
app.use("/auth", require("./routes/jwtAuth"));

// Infos
app.use("/infos", require("./routes/infos"));

// Schedule
app.use("/schedule", require("./routes/schedule"));

// Cars
app.use("/cars", require("./routes/cars"));

//Image
app.use("/image", require("./routes/image"));

//Carsmessage
app.use("/carsmessage", require("./routes/carsmessage"));

//Noticemessage
app.use("/noticemessage", require("./routes/noticemessage"));


// Middleware
const authorization = require("./middleware/authorization")

// Dev
if (PORT == 5000) {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get('*', function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '..', 'client', 'dist') });
    });
}

// Production
if (process.env.NODE_ENV === "production") {
    // server static content
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get('/*', function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '..', 'client', 'dist') });
    });
}

// Listening app
app.listen(PORT, () => {
    console.log("server start port : " + PORT)
});