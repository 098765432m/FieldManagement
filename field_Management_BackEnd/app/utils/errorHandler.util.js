const moment = require('moment');

const ErrorHandler = {
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
checkTimeIsAfter : (startTime, endTime) => {
  const st = moment(startTime, "HH:mm");
  const et = moment(endTime, "HH:mm");

  if(st.isAfter(et)){
    const error = new Error(`The startTime: ${startTime} is before the endTime: ${endTime}`);
    error.statusCode = 400;
    throw error;
  }
},

//Function that check time (DD-MM-YYYY)
checkDateIsValid : (dateString) => {
    const date = moment(dateString, "DD-MM-YYYY");
    if(!date.isValid()){
        const error = new Error(`Du lieu date: ${dateString} khong hop le - DD-MM-YYYY`);
        error.statusCode = 400;
        throw error;
    }
},
}

module.exports = {ErrorHandler}