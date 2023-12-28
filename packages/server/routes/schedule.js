const app = require("express").Router();
const authorization = require("../middleware/authorization");
const scheduleController = require("../controllers/ScheduleController");

app.get("", scheduleController.getSchedule);

app.put("/:id", authorization, scheduleController.updateSchedule);

module.exports = app;