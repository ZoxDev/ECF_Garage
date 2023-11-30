const app = require("express").Router();
const authorization = require("../middleware/authorization");
const authController = require("../controllers/AuthController");

app.get("/getemployee", authController.getEmployee);

app.post("/createemployee", authorization, authController.createemployee);

app.delete("/delete/:id", authorization, authController.deleteEmployee);

app.post("/login", authController.login);

module.exports = app;