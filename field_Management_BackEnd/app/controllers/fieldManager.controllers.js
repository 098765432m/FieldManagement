const {FieldManager} = require("../model/model");

const { setCookie } = require("cookies-next");
const FieldManagerController = {
    addFieldManager: async (req,res) => {
        try{
            const newManager = new FieldManager(req.body);
            const savedManager = await newManager.save();
            res.status(200).json(savedManager);
        }catch(err){
            res.status(500).json(err);
        }
    },

    getAllManagers: async (req,res) => {
        try {
            const managers = await FieldManager.find();
            res.status(200).json(managers);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getAnManager: async (req,res) => {
        const manager = await FieldManager.findById(req.params.id);
        res.status(200).json(manager);
    },

    deleteAManager: async (req,res) => {
        try {
            await FieldManager.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted a Manager");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    checkAuth: async (req, res) => {
        console.log(req.body);
        // try {
            const {username, password} = req.body;
        if(username && password){
            const acc = await FieldManager.find({
                username: username,
                password: password,
            })

            // Check if FieldManager exist
            if(Object.keys(acc).length !== 0){
            const userString = JSON.stringify(acc[0]);
            // set cookie co ten la 'userData' voi tui tho la 60 * 6 * 24 giay
            setCookie('userData', userString, { req, res, maxAge: 60 * 6 * 24 })
            
            }
            res.status(200).json(acc);
            
        }
        else {
            res.status(200).json([]);
        }
        // } catch (error) {
        //  res.status(500).json(error);
        // }
    }
}

module.exports = FieldManagerController;