const router = require("express").Router();
const RatingController = require("../controllers/rating.controllers");

router.route("/")
    .post(RatingController.addRating)

router.route("/:id")
    .get(RatingController.getRatingById)
    .put(RatingController.updateRatingById)
    .delete(RatingController.deleteRatingById)

router.route("/field/:fieldId")
    .get(RatingController.getRatingByField)

module.exports = router;