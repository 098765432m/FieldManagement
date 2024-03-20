const {TimeSlot, ChildField, Schedule} = require("../model/model");

const {ErrorHandler} = require('../utils/errorHandler.util');
const {splitTime, toTime, toDuration} = require("../utils/helpers.util");

const moment  = require('moment');

const TimeSlotController = {

    // add TimeSlot
    addTimeSlot: async (req, res) => {
        try{
            const validationError = new TimeSlot(req.body).validateSync();
            // Check req.body
            if(validationError){
                return res.status(400).json({error: validationError.message});
            }

            const startTimeString = req.body.startTime;
            const endTimeString = req.body.endTime;

            //check Start and End Time Data is correct format or valid
            ErrorHandler.checkTimeIsValid(startTimeString);
            ErrorHandler.checkTimeIsValid(endTimeString);
            
            ErrorHandler.checkTimeIsAfter(startTimeString, endTimeString);
            
            const childField_ID = req.body.childField;
            const doc_ChildField = await ChildField.findById(childField_ID);

            const schedule_ID = req.body.schedule;
            const doc_Schedule = await Schedule.findById(schedule_ID);

            //check ChildField is found ?
            if (!doc_ChildField) 
              return res.status(400).json({error: `khong tim thay ChildField voi id = ` + childField_ID});
            
            if(!doc_Schedule)
              return res.status(400).json({error: `khong tim thay Schedule voi id = ` + schedule_ID});


                const newTimeSlot = new TimeSlot(req.body);
                const savedTimeSlot = await newTimeSlot.save();

                //Them TimeSlot vao Schedule
                await doc_Schedule.updateOne({
                  $push: {timeSlot: savedTimeSlot._id}
                })

                return res.status(200).json(savedTimeSlot);                
            
        }catch(err){

            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({err: err.message});
        }
    },

    //Create Many TimeSlots within 
    addManyTimeSlot: async (childField, schedule, startWorkAt, endWorkAt, duration) => {
      try {

        // Check if ChildField and Schedule exist
        if(childField.length === 0){
          const error = new Error('Field does not have any childFields');
          error.statusCode = 400; // Set the status code
          throw error;
        }
          

        if(schedule === undefined){
          const error = new Error('Schedule are undefined');
          error.statusCode = 400; // Set the status code
          throw error;
        }

        const doc_Schedule = await Schedule.findById(schedule);

        if(!doc_Schedule){
          const error = new Error('Schedule has not been found');
          error.statusCode = 400; // Set the status code
          throw error;
        }

        let query = {
          schedule: schedule,
        }

        //Get Work time to create TimeSlot
        
        ErrorHandler.checkTimeIsValid(startWorkAt);
        ErrorHandler.checkTimeIsValid(endWorkAt);
        ErrorHandler.checkTimeIsAfter(startWorkAt, endWorkAt);

        startWorkAt = toTime(startWorkAt);
        endWorkAt = toTime(endWorkAt);
        duration = toDuration(duration);

        //Get divide work time into chunks of TimeSlot
        const timeChunk = splitTime(startWorkAt, endWorkAt, duration);

        //Create Many time TimeSlot for each childField
        const promises = childField.map( async (childField_ID) => {
          query[`childField`] = childField_ID;

          //Create A TimeSlot for each time chunk
          const timeSlotPromises = timeChunk.map( async ({startTime, endTime}) => {
            query[`startTime`] = startTime;
            query[`endTime`] = endTime;
            console.log(query);
  
            //Add a TimeSlot
            const newTimeSlot = new TimeSlot(query);
            const savedTimeSlot = await newTimeSlot.save();
  
            //Then update timeSlot on Schedule
            await doc_Schedule.updateOne({
              $push: {timeSlot: savedTimeSlot._id}
            })
          });

          return Promise.all(timeSlotPromises);
        })

        await Promise.all(promises);

        return timeChunk;

        } catch (err) {
          const statusCode = err.statusCode || 500;
          const error = new Error(err.message);
          error.statusCode = statusCode;
          throw error;
        }
    },

    //Get TimeSlot by Id
    getATimeSlot: async (req,res) => {
        try {
          const id = req.params.id;
          const timeSlot = await TimeSlot.findById(id);
          if (timeSlot) {
            return res.status(200).json(timeSlot);   
          } else {
            return res.status(400).json({error: `khong tim thay TimeSlot voi id = ` + id});
          }
        } catch (error) {
            const statusCode = error.statusCode || 500;
            return res.status(statusCode).json({error: error.message});
        }
    },

    //Book this TimeSlot
    bookTimeSlot: async (req, res) => {
      try {
        const id = req.params.id;
        const customerName = req.body.customerName;
        // Check customeName != null
        if(!customerName)
        return res.status(400).json({error: `Khong co Customer Name`});

        //check TimeSlot voi id 
        const timeSlot = await TimeSlot.findById(id);
        if(!timeSlot)
        return res.status(400).json({error: `Khong tim thay TimeSlot voi id = ${id}`});

        // Throw Error if TimeSlot is unavailable
        if(timeSlot.available === false)
          return res.status(400).json({err: `TimeSlot hien da co nguoi Book`});


        //book voi customerName va set available = false
          await timeSlot.updateOne({
            customerName: customerName,
            available: false
          },
        );

        return res.status(200).json('Dat San Thanh Cong');

      } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({error: error.message});
      }
    },

    //UnBook this TimeSlot
    unBookTimeSlot: async (req, res) => {
      try {
        const id = req.params.id;

        //check TimeSlot voi id 
        const timeSlot = await TimeSlot.findById(id);
        if(!timeSlot)
          return res.status(400).json({error: `Khong tim thay TimeSlot voi id = ${id}`});

        // Throw Error if TimeSlot is available
        if(timeSlot.available === true)
          return res.status(400).json({err: `TimeSlot hien khong co nguoi Book`});

        //unBook xoa customerName va set available = true
        await timeSlot.updateOne({
          customerName: '',
          available: true
        })

        return res.status(200).json('Da unBook TimeSlot voi id = ' + id);

      } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({error: error.message});
      }
    },

    //Xoa 1 san con by ID
  deleteATimeSlot: async (req, res) => {
    try {
      const id = req.params.id;
      const timeSlot  = await TimeSlot.findById(id);

      //If a TimeSlot is booked, you cant delete it
      if(timeSlot.available === false)
      return res.status(400).json({error: `This TimeSlot is booked, you can't delete it`});

      if(timeSlot){
        //Lam xoa TimeSlot cua Schedule
        await Schedule.updateOne({
          _id: timeSlot.schedule
        },{
          $pull: { timeSlot: id },
        });

        await timeSlot.deleteOne();

        return res.status(200).json(`Deleted a TimeSlot`);
      } else {
        return res.status(400).json({error: `Khong tim thay TimeSlot voi id = ` + id});
      }
    } catch (err) {
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({error: err.message});
    }
  },

    //update a timeSlot by id
  // updateATimeSlot: async (req, res) => {
  //   try {
      
  //     const validationError = new TimeSlot(req.body).validateSync();
  //       //check req.boy
  //     if(validationError){
  //       return res.status(400).json({ error: validationError.message});
  //     }

  //     //check date data is correct formar or valid
  //     const timeString = req.body.date;
  //     TimeSlotController.checkDateIsValid(timeString);

  //     //get params id
  //     const id = req.params.id;

  //     const timeSlot = await TimeSlot.findById(id);

  //     //Kiểm xem có tìm thấy timeSlot không
  //     if(timeSlot){
  //         await timeSlot.updateOne(req.body);
  //         return res.status(200).json("Updated successfully");
  //     } else {
  //       return res.status(400).json({error: 'Khong tim thay lich voi id' + id})
  //     }

  //   } catch (err) {
  //     const statusCode = err.statusCode || 500;
  //     return res.status(statusCode).json({err: err.message});
  //   }
  // },

  
}

module.exports = TimeSlotController;