const app = require("express").Router();
const authorization = require("../middleware/authorization");
const infoController = require("../controllers/InfoController");

app.get("", infoController.getInfo);

app.post("", authorization, infoController.postInfo);

app.put("/:id", authorization, infoController.putInfo);

module.exports = app;