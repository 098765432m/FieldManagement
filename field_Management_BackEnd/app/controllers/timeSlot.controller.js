const {TimeSlot, ChildField, Schedule} = require("../model/model");
const moment  = require('moment');

const TimeSlotController = {

    //Function that check time (HH:mm)
    checkTimeIsValid : (timeString) => {
        const time = moment(timeString, "HH:mm");
        if(!time.isValid()){
            const error = new Error(`Du lieu time: ${timeString} khong hop le - HH:mm`);
            error.statusCode = 400;
            throw error;
        }
    },

    // check if startTime > endTime
    checkTimeIsBefore : (startTime, endTime) => {
      const st = moment(startTime, "HH:mm");
      const et = moment(endTime, "HH:mm");

      if(st.isAfter(et)){
        const error = new Error(`The startTime: ${startTime} is before the endTime: ${endTime}`);
        error.statusCode = 400;
        throw error;
      }
    },

    // add TimeSlot
    addTimeSlot: async (req,res) => {
        try{

            const validationError = new TimeSlot(req.body).validateSync();
            // Check req.body
            if(validationError){
                return res.status(400).json({error: validationError.message});
            }

            const startTimeString = req.body.startTime;
            const endTimeString = req.body.endTime;

            //check Start and End Time Data is correct format or valid
            TimeSlotController.checkTimeIsValid(startTimeString);
            TimeSlotController.checkTimeIsValid(endTimeString);
            
            TimeSlotController.checkTimeIsBefore(startTimeString, endTimeString);

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