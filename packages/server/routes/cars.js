const app = require("express").Router();
const authorization = require("../middleware/authorization");

// Controller
const carsController = require("../controllers/CarsController");

app.get("", carsController.getCars);

app.post("", authorization, carsController.postCars);

app.put("/:id", authorization, carsController.putCars);

app.delete("/:id", authorization, carsController.deleteCars);

module.exports = app;

