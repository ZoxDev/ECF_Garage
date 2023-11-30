const app = require("express").Router();
const authorization = require("../middleware/authorization");
const postImage = require("../controllers/ImageController");

// Post image
app.post("", authorization, postImage);

module.exports = app;