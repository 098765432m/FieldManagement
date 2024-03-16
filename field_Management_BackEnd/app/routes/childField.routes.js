const router = require("express").Router();
const ChildFieldController = require("../controllers/childField.controller");
const { ChildField } = require("../model/model");

router.route("/")
    
    //add 1 ChildField
    .post(ChildFieldController.addChildField);


router.route("/:id")
    //get 1 ChildField by Id
    .get(ChildFieldController.getAChildField)
    .patch(ChildFieldController.updateChildField)
    .delete(ChildFieldController.deleteAChildField);

module.exports = router;