const {FieldAccounts} = require("../model/model");

const FieldAccountsController = {
    getAnAccountByManagerId: async (req, res) => {
        try {
            const account = await FieldAccounts.find({
                owner: req.params.owner_id,
            });
            res.status(200).json(account);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },
}

module.exports = FieldAccountsController;