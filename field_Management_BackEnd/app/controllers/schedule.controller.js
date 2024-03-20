const {Schedule, Field, TimeSlot, ChildField} = require("../model/model");
const moment  = require('moment');

const TimeSlotController = require('./timeSlot.controller');

const { ErrorHandler } = require('../utils/errorHandler.util');

const ScheduleController = {

    // add Schedule
    addSchedule: async (req,res) => {
        try{

            const validationError = new Schedule(req.body).validateSync();
            // Check req.body
            if(validationError){
                return res.status(400).json({error: validationError.message});
            }

            const dateString = req.body.date;
            //check date data is correct formar or valid
            ErrorHandler.checkDateIsValid(dateString);

            const field_ID = req.body.field;
            const doc_Field = await Field.findById(field_ID).populate('startWorkAt').populate('endWorkAt');

            //check Field is found ?
            if (!doc_Field) {
                return res.status(400).json({error: `khong tim thay Field voi id = ` + field_ID});
            }

            const {startWorkAt, endWorkAt, duration, childField} = doc_Field;
            ErrorHandler.checkTimeIsValid(startWorkAt);
            ErrorHandler.checkTimeIsValid(endWorkAt);
            ErrorHandler.checkTimeIsValid(duration);

            console.log(childField);

            //Add a Schedule
            const newSchedule = new Schedule(req.body);
            const savedSchedule = await newSchedule.save();

            //Add Many TimeSlot
            await TimeSlotController.addManyTimeSlot(childField,
              savedSchedule._id,
              startWorkAt,
              endWorkAt,
              duration
            );
            
            return res.status(200).json(savedSchedule);      
            
        }catch(err){
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({err : err.message});
        }
    },

    //Get Schedule by Id
    getASchedule: async (req,res) => {
        const id = req.params.id
        const schedule = await Schedule.findById(id);
        if (schedule) {
          return res.status(200).json(schedule);   
        } else {
          return res.status(400).json({error: `khong tim thay Schedule voi id = ` + id});
        }
    },

    //update a schedule by id
  updateASchedule: async (req, res) => {
    try {
      
      const validationError = new Schedule(req.body).validateSync();
        //check req.boy
      if(validationError){
        return res.status(400).json({ error: validationError.message});
      }

      //check date data is correct formar or valid
      const dateString = req.body.date;
      ErrorHandler.checkDateIsValid(dateString);

      //get params id
      const id = req.params.id;

      const schedule = await Schedule.findById(id);

      //Kiểm xem có tìm thấy schedule không
      if(schedule){
          await schedule.updateOne(req.body);
          return res.status(200).json("Updated successfully");
      } else {
        return res.status(400).json({error: 'Khong tim thay lich voi id' + id})
      }

    } catch (err) {
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({err: err.message});
    }
  },

  //Xoa 1 san con by ID
  deleteASchedule: async (req, res) => {
    try {
      const id = req.params.id;
      const schedule  = await Schedule.findById(id);

      if(!schedule){
        return res.status(400).json({error: `Khong tim thay Schedule voi id = ` + id});
      }

      //Check if This Schedule has any TimeSlots
      if(schedule.timeSlot.length != 0){
        //check if Any TimeSlot that going to delete is booked
        const TimeSlots = await TimeSlot.find({schedule: id, available: false});
        if(TimeSlots.length !== 0){
          return res.status(400).json({error: `At least A TimeSlot is booked, you can't delete this Schedule`});
        }

        //Delete Any TimeSlots this Schedule have
        await TimeSlot.deleteMany({
          schedule: id
        });
      }

        //Delete this SChedule
        await schedule.deleteOne();

        return res.status(200).json(`Deleted a Schedule`);
      
    } catch (err) {
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({err: err.message});
    }
  },
}

module.exports = ScheduleController;