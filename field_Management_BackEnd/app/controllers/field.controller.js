const {Field, Sport, FieldManager, FieldAccounts} = require("../model/model");

const {deleteAllAccountsByFieldID} = require ("../utils/helpers.util.js");

const { ErrorHandler } = require('../utils/errorHandler.util.js');
const { duration } = require("moment");
const FieldController = {
    timeKeys :['startWorkAt', 'endWorkAt'],

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
            const durationString = req.body.duration;

            ErrorHandler.checkTimeIsValid(startTimeString);
            ErrorHandler.checkTimeIsValid(endTimeString);
            ErrorHandler.checkTimeIsValid(durationString);
            ErrorHandler.checkTimeIsAfter(startTimeString, endTimeString);

            const newField = new Field(req.body);
            const savedField = await newField.save();


            const sport_ID = req.body.sport;
            const sport = Sport.findById(sport_ID);
            
            //check if sport is valid or found
            if(!sport)
                return res.status(400).json({err: `Sport is not Found with ${sport_ID}`});
            
            
            const fieldAccounts_ID = req.body.fieldAccounts;
            const fieldAccounts = FieldAccounts.findById(fieldAccounts_ID);

            // check account is found ?
            if(!fieldAccounts)
                return res.status(400).json({err: `FieldAccounts is not Found with ${sport_ID}`});

            //update 'fields' field in sport collection
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

    //Get all Fields
    getAllFields: async (req,res) => {
        try {
            const fields = await Field.find();
            return res.status(200).json(fields); 
        }catch (err){
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({err : err.message});
        }
    },

    //Get Fields By Sport adn Address
    getAllFieldsByFilter: async (req, res) => {
        try {
            //Return fields that match sport: SportID
            const req_query = req.query;
            const sport_ID = req.params.sportId;

            //Initialize query
            const query = {
                sport: sport_ID,
            }

            //Check if user get any more element
            Object.entries(req_query).forEach(([key, value]) => {
                if(value !== undefined)
                    query[`fieldAddress.${key}`] = value;    
            });
            
            const fields = await Field.find(query);
            return res.status(200).json(fields);
        } catch (err) {
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({err : err.message});
        }
    },

    // Return An Field By ID
    getAnField: async (req, res) => {
        try {
            const id = req.params.id;
            const field = await Field.findById(id);

            // Check if field has been found
            if(!field)
                return res.status(400).json(`Cannot found field with id = ${id}`);

            // if Found return that Field
            return res.status(200).json(field);
        } catch (err) {
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({err : err.message});
        }
    },

    // Update Field By ID
    //Change Basic info such as fieldName, fieldAddress, startWorkAt, endWorkAt
    updateField: async (req, res) =>{
        const validInfo = ['fieldName', 'fieldAddress', 'startWorkAt', 'endWorkAt', 'duration'];
        try {
            const id = req.params.id;
            const field = await Field.findById(id);
            if(!field)
            return res.status(400).json(`Cannot found field with id = ${id}`);
            const query = {}

            //get request query of URL
            const body = req.body;
            Object.entries(body).forEach(([key, value]) => {
                //Check startWorkAt and endWorkAt is valid
                if(FieldController.timeKeys.includes(key))
                    ErrorHandler.checkTimeIsValid(value);

                if(validInfo.includes(key) && value !== undefined){
                    if(key !== 'fieldAddress'){
                        query[`${key}`] = value;
                    } else {
                        Object.entries(value).forEach(([address_key, address_value]) => {
                            if(address_key !== undefined)
                                query[`${key}.${address_key}`] = address_value;
                        })
                    }
                }
            })

            //Check Time input an Time in data is valid to each other
            //Get time data from database
            const [a, b] = [field.startWorkAt, field.endWorkAt];
            const durationString = query.duration;
            ErrorHandler.checkTimeIsValid(durationString);

            if(query.startWorkAt !== undefined && query.endWorkAt !== undefined){
                //User send both data
                ErrorHandler.checkTimeIsAfter(query.startWorkAt, query.endWorkAt);
            } else if(query.startWorkAt !== undefined){
                //User just send startWorkAt
                ErrorHandler.checkTimeIsAfter(query.startWorkAt, b);
            } else {
                //User just send endWorkAt
                ErrorHandler.checkTimeIsAfter(a, query.endWorkAt);
            }
            
            
            console.log(query);
            await field.updateOne(query);
            return res.status(200).json("Update successfully");
        } catch (err) {
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({err : err.message});
        }
    },

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