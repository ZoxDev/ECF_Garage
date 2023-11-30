const app = require("express").Router();
const authorization = require("../middleware/authorization");
const CarsMessageController = require("../controllers/CarsMessageController");

app.get("", CarsMessageController.getCarsMessage);

app.post("", CarsMessageController.postCarsMessage);

app.delete("/:id", authorization, CarsMessageController.deleteCarsMessage);

module.exports = app;