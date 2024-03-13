const router = require("express").Router();
const { get } = require("mongoose");
const SportController = require("../controllers/sport.controllers");

router.route("/")
    .get(SportController.getAllSport) //Tìm tất cả môn thể thao
    .post(SportController.addSport);   //Thêm một môn thể thao


router.route("/:id")
    .get(SportController.getAnSport)
    .put(SportController.updateSport)
    .delete(SportController.deleteSport);

module.exports = router;