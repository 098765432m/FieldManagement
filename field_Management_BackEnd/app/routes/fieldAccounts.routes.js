const router = require('express').Router();
const FieldAccountsController = require("../controllers/fieldAccounts.controller");

router.route('/owner/:owner_id')
    .get(FieldAccountsController.getAnAccountByManagerId)

module.exports = router;