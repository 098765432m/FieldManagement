const {Schedule, ChildField} = require("../model/model");
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

            const childField_ID = req.body.childField;
            const doc_ChildField = await ChildField.findById(childField_ID);
            if (doc_ChildField) {
                const newSchedule = new Schedule(req.body);
                const savedSchedule = await newSchedule.save();

                //Update Schedule trong ChildField
                await doc_ChildField.updateOne({
                    $push: { schedule: savedSchedule._id}
                })
                res.status(200).json(savedSchedule);                
            } else {
                return res.status(400).json({error: `khong tim thay Child Field voi id = ` + childField_ID});
            }
        }catch(err){
            const statusCode = err.statusCode || 500;
            res.status(statusCode).json({err : err.message});
        }
    },

    //Get Schedule by Id
    getASchedule: async (req,res) => {
        const id = req.params.id
        const schedule = await Schedule.findById(id);
        if (schedule) {
        res.status(200).json(schedule);   
        } else {
            res.status(400).json({error: `khong tim thay Schedule voi id = ` + id});
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
          res.status(200).json("Updated successfully");
      } else {
        res.status(400).json({error: 'Khong tim thay lich voi id' + id})
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
        //Xoa Id luu trong Field
        await ChildField.updateOne(
          {_id: schedule.childField},
          {$pull: {schedule: id}}
        )
        await schedule.deleteOne();

        res.status(200).json(`Deleted a Schedule`);
      } else {
        res.status(400).json({error: `Khong tim thay Schedule voi id = ` + id});
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
}

module.exports = ScheduleController;