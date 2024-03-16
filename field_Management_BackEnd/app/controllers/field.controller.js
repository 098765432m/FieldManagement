const {Field, Sport, FieldManager, FieldAccounts} = require("../model/model");

const {deleteAllAccountsByFieldID} = require ("../utils/helpers.util.js");

const FieldController = {
    addField: async (req,res) => {
        try{
            const newField = new Field(req.body);
            const savedField = await newField.save();
            if(req.body.sport){
                const id = req.body.sport;
                const sport = Sport.findById(id);
                await sport.updateOne({$push: {fields: savedField._id}});
            }

                const phoneNumber = req.body.phoneNumber;
                const email = req.body.email;
                const newManager = new FieldManager({
                    username: phoneNumber,
                    password: '123',
                    phoneNumber: phoneNumber,
                    email: email,
                    role: 'owner'
                });

                const savedManager = await newManager.save();

                const newFieldAccounts = new FieldAccounts({
                    field: savedField._id,
                    owner: savedManager._id,
                })

                const savedFieldAccounts = newFieldAccounts.save();

            res.status(200).json(savedField);
        }catch(err){
            res.status(500).json(err);
        }
    },

    getAllFields: async (req,res) => {
        try {
            const fields = await Field.find();
            res.status(200).json(fields); 
        }catch (err){
            res.status(500).json(err);
        }
    },

    //Loc theo mon the thao
    getAllFieldsBySport: async (req, res) => {
        try {
            const index = req.params.sportId;
        const fields = await Field.find({sport: req.params.sportId}).populate("sport");
        res.status(200).json(fields);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //Tim kiem theo mon the thao va dia chi

    getAnField: async (req, res) => {
        try {
            const field = await Field.findById(req.params.id).populate("sport");
            res.status(200).json(field);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateField: async (req, res) =>{
        try {
            const field = await Field.findById(req.params.id);
            await field.updateOne(req.body);
            res.status(200).json("Update successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteField: async (req,res) => {
        try {
            await Sport.updateMany(
                { fields: req.params.id}, 
                {$pull: {fields: req.params.id}}
            );
            await deleteAllAccountsByFieldID(req.params.id);
            
            const count = await Field.findByIdAndDelete(req.params.id);
            res.status(200).json(`Số phần tử phần tử bị xóa là ${count != null ? count : 0}`);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteAllField: async (req, res) => {
        try{
            await Sport.updateMany(
                {},
                {$set :{fields : []}}
            )
            await Field.deleteMany();
            res.status(200).json("Delete All Things! You are a Demon!!!");
        }catch(err){
            res.status(500).json(err);
        }
    },

    findAccounts: async (req, res) => {
        try {
            // const accounts = await FieldAccounts.find({field: {_id: req.params.field_id}}).populate("field").populate("owner").populate("staff");
            // const owner = await FieldManager.findById(accounts[0].owner._id);
             await deleteAllAccountsByFieldID(req.params.field_id);
            
            res.status(200).json('');
        } catch (error) {
            console.error(error);
        }
    }
};

module.exports = FieldController;