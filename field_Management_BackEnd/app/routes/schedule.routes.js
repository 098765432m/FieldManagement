const router = require("express").Router();
const ScheduleController = require("../controllers/schedule.controller");
const { Schedule } = require("../model/model");

router.route("/")
    //add 1 Schedule
    .post(ScheduleController.addSchedule);

router.route("/:id")
    .get(ScheduleController.getASchedule)
    .patch(ScheduleController.updateASchedule)
    .delete(ScheduleController.deleteASchedule);

module.exports = router;