const router = require("express").Router();
const CustomerController = require("../controllers/customer.controller");
const { Customer } = require("../model/model");

router.route("/")
    //Lấy tất cả khách hàng
    .get(CustomerController.getAllcustomers)
    //Thêm 1 Customer
    .post(CustomerController.addCustomer)

router.route("/:id")
    .get(CustomerController.getACustomer)
    .delete(CustomerController.deleteACustomer);

module.exports = router;