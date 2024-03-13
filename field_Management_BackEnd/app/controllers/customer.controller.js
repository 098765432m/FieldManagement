const {Customer} = require("../model/model");

const CustomerController = {
    addCustomer: async (req,res) => {
        try{
            const newCustomer = new Customer(req.body);
            const savedCustomer = await newCustomer.save();
            res.status(200).json(savedCustomer);
        }catch(err){
            res.status(500).json(err);
        }
    },

    getAllcustomers: async (req,res) => {
        try {
            const customers = await Customer.find();
            res.status(200).json(customers);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getACustomer: async (req,res) => {
        const customer = await Customer.findById(req.params.id);
        res.status(200).json(customer);
    },

    deleteACustomer: async (req,res) => {
        try {
            await Customer.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted a Customer");
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = CustomerController;