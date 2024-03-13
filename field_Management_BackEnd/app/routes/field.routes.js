const router = require("express").Router();
const fields = require("../controllers/field.controller");

router.route("/")
    .get(fields.getAllFields) //get all fields
    .post(fields.addField) //add a field
    .delete(fields.deleteAllField);

router.route("/find/:id")
    .get(fields.getAnField) // Lấy field bằng id
    .put(fields.updateField) //update field bằng id
    .delete(fields.deleteField);

router.route("/sports/:sportId")
    .get(fields.getAllFieldsBySport)

router.route("/test/:field_id")
    .get(fields.findAccounts);

module.exports = router;