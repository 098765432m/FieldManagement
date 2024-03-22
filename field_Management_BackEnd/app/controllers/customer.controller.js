const ApiError = require("../api-error");
const {Customer} = require("../model/model");
const {ErrorHandler} = require("../utils/errorHandler.util");

const CustomerController = {

    //add An customer
    addCustomer: async (req, res) => {
        try{
            
            //Check req.body
            const validationError = new Customer(req.body).validateSync();
            if(validationError)
                return res.status(400).json({error: validationError.message});

            // check username has already use
            const username = req.body.username;
            await ErrorHandler.checkUsernameIsUsed(`username`, username, Customer);

            const newCustomer = new Customer(req.body);
            const savedCustomer = await newCustomer.save();

            return res.status(200).json(savedCustomer);
        }catch(err){
            const statusCode = err.statusCode || 500
            return res.status(statusCode).json(err.message);
        }
    },

    // Get All Customers 
    getAllCustomers: async (req, res) => {
        try {
            const customers = await Customer.find();
            return res.status(200).json(customers);
        } catch (err) {
            const statusCode = err.statusCode || 500
            return res.status(statusCode).json(err.message);
        }
    },

    // Return a Customer By ID
    getACustomer: async (req,res) => {
        try {
            const id = req.params.id;
            const customer = await Customer.findById(id);
            if(!customer)
                throw new ApiError(400, `Customer with id = ${id} has not been found`);

            return res.status(200).json(customer);
        } catch (err) {
            const statusCode = err.statusCode || 500
            return res.status(statusCode).json(err.message);
        }
    },

    // Remove A Customer By ID
    deleteACustomer: async (req,res) => {
        try {
            const id = req.params.id;
            const customer = await Customer.findById(id);
            if(!customer)
                throw new ApiError(400, `Customer with id = ${id} has not been found`);

            await customer.deleteOne();
            return res.status(200).json("Deleted a Customer");
        } catch (err) {
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json(err.message);
        }
    }
}

module.exports = CustomerController;