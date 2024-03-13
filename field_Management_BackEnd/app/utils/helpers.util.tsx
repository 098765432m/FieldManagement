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

module.exports = { deleteAllAccountsByFieldID };
