const router = require("express").Router();
const { query } = require("express");
const fields = require("../controllers/field.controller");

router.route("/")
    .get(fields.getAllFields) //get all fields
    .post(fields.addField) //add a field

// Remember to send query to URL for more filter
// Such as ?duong=Tran Vinh Kiet&&phuong=Loi
router.route("/sports/:sportId")
    .get(fields.getAllFieldsByFilter) ////Get Fields By Sport adn Address

    
router.route("/:id")
    .get(fields.getAnField) // Lấy field bằng id
    .patch(fields.updateField) //update field bằng id

module.exports = router;