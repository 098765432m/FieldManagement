const { FieldManager, FieldAccounts } = require("../model/model");
const {ErrorHandler}  = require("./errorHandler.util");

async function deleteAllAccountsByFieldID(field_id) {
  const accounts = await FieldAccounts.find({ field: { _id: field_id } })
    .populate("owner")
    .populate("staff");

  console.log(accounts[0]);

  await FieldManager.deleteOne({ _id: accounts[0].owner._id });

  if (accounts[0].staff[0]) {
    accounts[0].staff.forEach(async (staff) => {
      await FieldManager.deleteOne(staff._id);
    });
  }
  await FieldAccounts.deleteOne({ field: { _id: field_id } });
}

//Convert String HH:mm to Time
function toTime(timeString){
  try {
    ErrorHandler.checkTimeIsValid(timeString);
    return moment(timeString, 'HH:mm');
  } catch (err) {
    console.log({err: err.message});
  }
}

function toDuration(durationString){
  return moment.duration(durationString).asMinutes();
}

// Actual logic
// import moment package
const moment = require("moment");
const splitTime = (startTime, endTime, interval) => {
  const result = [startTime.format('HH:mm')];
  let time = startTime.add(interval, "m");
  while (time.isBetween(startTime, endTime, undefined, [])) {
    result.push(time.format('HH:mm'));
    time = time.add(interval, "m");
  }

  let timeChunk = [];
  for (let i = 0; i < result.length - 1; i++) {
    timeChunk.push({startTime: result[i], endTime: result[i + 1]});
  }

  return timeChunk;
};

// You change these values according to your needs

// const interval = 60;
// const startTime = new moment('6:00', 'HH:mm');
// const endTime = new moment('8:00', 'HH:mm');
// console.log(`${startTime} \n ${endTime}`);

// const timeSlices = splitTime(startTime, endTime, interval);

// console.log(timeSlices);

// For printing out the intervals

// for (let i = 0; i < timeSlices.length - 1; i++) {
//   console.log(timeSlices[i] + " - " + timeSlices[i + 1]);
// }



//Calculate Average
function calculateAverage(ratings){
  const total = ratings.reduce((acc, curr) => acc + curr, 0);
  const roundedAverage = (total/ratings.length).toFixed(2);
  return parseFloat(roundedAverage);
}

module.exports = { deleteAllAccountsByFieldID, splitTime, toTime, toDuration, calculateAverage };
