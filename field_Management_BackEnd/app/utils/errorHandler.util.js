const moment = require('moment');

const ApiError = require("../api-error");

const ErrorHandler = {
    //Function that check time (HH:mm)
    checkTimeIsValid : (timeString) => {
        const time = moment(timeString, "HH:mm");
        if(!time.isValid()){
            throw new ApiError(400, `Time data: ${timeString} is not valid - HH:mm`);
        }
    },

    // check if startTime > endTime
    checkTimeIsAfter : (startTime, endTime) => {
    const st = moment(startTime, "HH:mm");
    const et = moment(endTime, "HH:mm");

    if(st.isAfter(et)){
        throw new ApiError(400, `The startTime: ${startTime} is before the endTime: ${endTime}`);
    }
    },

    //Function that check time (DD-MM-YYYY)
    checkDateIsValid : (dateString) => {
        const date = moment(dateString, "DD-MM-YYYY");
        if(!date.isValid()){
            throw new ApiError(400, `Du lieu date: ${dateString} khong hop le - DD-MM-YYYY`);
        }
    },

    //Function that check value has exist or no
    checkUsernameIsUsed : async (fieldName ,username, Schema) => {
        try {
            //Use this instead cause you cant use Schema.find(fieldName: username) which your server look for field 'fieldName'
            const query = {};
            query[fieldName] = username;

            const documents = await Schema.find(query);
            
            if (documents.length !== 0) {
                const error = new ApiError(400, `${username} has been used. Please use another !`);
                throw error;
            }
        } catch (err) {
            const statusCode = err.statusCode || 500; 
            const error =  new ApiError(statusCode, err.message);
            throw error;
        }
    }
}

module.exports = {ErrorHandler}