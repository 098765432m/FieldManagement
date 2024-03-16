const { FieldManager, FieldAccounts } = require("../model/model");

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

// Actual logic
// import moment package
const moment = require("moment");
const splitTime = (startTime, endTime, interval) => {
  const result = [startTime.toString()];
  let time = startTime.add(interval, "m");
  while (time.isBetween(startTime, endTime, undefined, [])) {
    result.push(time.toString());
    time = time.add(interval, "m");
  }

  let timeChunk = [];
  for (let i = 0; i < result.length - 1; i++) {
    timeChunk.push(result[i] + " - " + result[i + 1]);
  }

  return timeChunk;
};

// You change these values according to your needs

// const interval = 60;
// const startTime = new moment({ hour: 0, minute: 0 });
// const endTime = new moment({ hour: 12, minute: 0 });

// const timeSlices = splitTime(startTime, endTime, interval);

// console.log(timeSlices);

// For printing out the intervals

// for (let i = 0; i < timeSlices.length - 1; i++) {
//   console.log(timeSlices[i] + " - " + timeSlices[i + 1]);
// }

module.exports = { deleteAllAccountsByFieldID, splitTime };
