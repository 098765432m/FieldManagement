const {Field, Sport, FieldManager, FieldAccounts} = require("../model/model");

const {deleteAllAccountsByFieldID} = require ("../utils/helpers.util.js");

const { ErrorHandler } = require('../utils/errorHandler.util.js');
const FieldController = {

    //Add a field
    addField: async (req,res) => {
        try{

            const validationError = new Field(req.body).validateSync();
            // Check req.body
            if(validationError){
                return res.status(400).json({error: validationError.message});
            }

            const startTimeString = req.body.startWorkAt;
            const endTimeString = req.body.endWorkAt;

            ErrorHandler.checkTimeIsValid(startTimeString);
            ErrorHandler.checkTimeIsValid(endTimeString);
            ErrorHandler.checkTimeIsAfter(startTimeString, endTimeString);

            const newField = new Field(req.body);
            const savedField = await newField.save();

            const sport_ID = req.body.sport;
            const sport = Sport.findById(sport_ID);
            if(!sport)
                return res.status(400).json({err: `Sport is not Found with ${sport_ID}`});
            
            const fieldAccounts_ID = req.body.fieldAccounts;
            const fieldAccounts = FieldAccounts.findById(fieldAccounts_ID);

            if(!fieldAccounts)
                return res.status(400).json({err: `FieldAccounts is not Found with ${sport_ID}`});

            await sport.updateOne({$push: {fields: savedField._id}});
            await fieldAccounts.updateOne({
                field: savedField._id,
            });

            return res.status(200).json(savedField);
        }catch(err){
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({err : err.message});
        }
    },

    getAllFields: async (req,res) => {
        try {
            const fields = await Field.find();
            return res.status(200).json(fields); 
        }catch (err){
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({err : err.message});
        }
    },

    //Loc theo mon the thao
    getAllFieldsBySport: async (req, res) => {
        try {
            const id = req.params.sportId;
        const fields = await Field.find({sport: req.params.sportId}).populate("sport");
        return res.status(200).json(fields);
        } catch (error) {
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({err : err.message});
        }
    },

    //Tim kiem theo mon the thao va dia chi

    // getAnField: async (req, res) => {
    //     try {
    //         const field = await Field.findById(req.params.id).populate("sport");
    //         res.status(200).json(field);
    //     } catch (err) {
    //         const statusCode = err.statusCode || 500;
    //         return res.status(statusCode).json({err : err.message});
    //     }
    // },

    // updateField: async (req, res) =>{
    //     try {
    //         const field = await Field.findById(req.params.id);
    //         await field.updateOne(req.body);
    //         res.status(200).json("Update successfully");
    //     } catch (err) {
    //         const statusCode = err.statusCode || 500;
    //         return res.status(statusCode).json({err : err.message});
    //     }
    // },

    // deleteField: async (req,res) => {
    //     try {
    //         await Sport.updateMany(
    //             { fields: req.params.id}, 
    //             {$pull: {fields: req.params.id}}
    //         );
    //         await deleteAllAccountsByFieldID(req.params.id);
            
    //         const count = await Field.findByIdAndDelete(req.params.id);
    //         res.status(200).json(`Số phần tử phần tử bị xóa là ${count != null ? count : 0}`);
    //     } catch (err) {
    //         const statusCode = err.statusCode || 500;
    //         return res.status(statusCode).json({err : err.message});
    //     }
    // },

    // deleteAllField: async (req, res) => {
    //     try{
    //         await Sport.updateMany(
    //             {},
    //             {$set :{fields : []}}
    //         )
    //         await Field.deleteMany();
    //         res.status(200).json("Delete All Things! You are a Demon!!!");
    //     }catch(err){
    //         const statusCode = err.statusCode || 500;
    //         return res.status(statusCode).json({err : err.message});
    //     }
    // },

    // findAccounts: async (req, res) => {
    //     try {
    //         // const accounts = await FieldAccounts.find({field: {_id: req.params.field_id}}).populate("field").populate("owner").populate("staff");
    //         // const owner = await FieldManager.findById(accounts[0].owner._id);
    //          await deleteAllAccountsByFieldID(req.params.field_id);
            
    //         res.status(200).json('');
    //     } catch (err) {
    //         const statusCode = err.statusCode || 500;
    //         return res.status(statusCode).json({err : err.message});
    //     }
    // }
};

module.exports = FieldController;