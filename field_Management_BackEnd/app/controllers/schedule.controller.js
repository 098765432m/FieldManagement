const {Schedule, Field} = require("../model/model");
const moment  = require('moment');

const ScheduleController = {

    //Function that check time (DD-MM-YYYY)
    checkDateIsValid : (dateString) => {
        const date = moment(dateString, "DD-MM-YYYY");
        if(!date.isValid()){
            const error = new Error(`Du lieu date: ${dateString} khong hop le - DD-MM-YYYY`);
            error.statusCode = 400;
            throw error;
        }
    },

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
            ScheduleController.checkDateIsValid(dateString);

            const field_ID = req.body.field;
            const doc_Field = await Field.findById(field_ID);

            //check Field is found ?
            if (doc_Field) {
                const newSchedule = new Schedule(req.body);
                const savedSchedule = await newSchedule.save();

                return res.status(200).json(savedSchedule);                
            } else {
                return res.status(400).json({error: `khong tim thay Field voi id = ` + field_ID});
            }
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
      ScheduleController.checkDateIsValid(dateString);

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

      if(schedule){
        //Lam xoa cac TimeSlot cua schedule nay
        
        await schedule.deleteOne();

        return res.status(200).json(`Deleted a Schedule`);
      } else {
        return res.status(400).json({error: `Khong tim thay Schedule voi id = ` + id});
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
}

module.exports = ScheduleController;