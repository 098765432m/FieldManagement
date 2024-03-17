const router = require("express").Router();
const FieldManagerController = require("../controllers/fieldManager.controllers");

router.route("/")
    //lấy tất cả manager
    .get(FieldManagerController.getAllManagers)
    //Thêm một manager
    .post(FieldManagerController.addFieldManager);


router.route("/checkAuth")
    .post(FieldManagerController.checkAuth);

router.route("/staff/:id")
    .delete(FieldManagerController.deleteAStaff);

router.route("/owner/:id")
    .delete(FieldManagerController.deleteAnOwner);

router.route("/:id")
    //Lấy 1 manager dựa id
    .get(FieldManagerController.getAnManager)
    // Xóa 1 manager dựa id


module.exports = router;