const { ChildField, Field} = require("../model/model");


const ChildFieldController = {

  // add ChildField
  addChildField: async (req, res) => {
    try {
      
      const validationError = new ChildField(req.body).validateSync();

      //Validate Model of Mongoose (ChildField)
      if (validationError) {
        return res.status(400).json({ error: validationError.message });
      }
      const fieldID = req.body.field;
      const doc_Field = await Field.findById(fieldID);
      if(doc_Field){
        
      const newChildField = new ChildField(req.body);
      const savedChildField = await newChildField.save();
      //Update ChildField cho Field
        await doc_Field.updateOne({$push: {childField: savedChildField._id}})

       return res.status(200).json(savedChildField);
      } else {
        return res.status(400).json({error: `Khong tim thay Field voi id = ` + fieldID});
      }
    } catch (err) {
     const statusCode = err.statusCode || 500;
     return res.status(statusCode).json({err: err.message});
    }
  },

  //Get ChildField by Id
  getAChildField: async (req,res) => {
    const id = req.params.id
    const childField = await ChildField.findById(id);
    if (childField) {
    res.status(200).json(childField);   
    } else {
        res.status(400).json({error: `khong tim thay ChildField voi id = ` + id});
    }
},

  //update a childField by id
  updateChildField: async (req, res) => {
    try {
      
      const validationError = new ChildField(req.body).validateSync();

      if(validationError){
        return res.status(400).json({ error: validationError.message});
      }
      //get params id
      const id = req.params.id;

      const childField = await ChildField.findById(id);

      //Kiểm xem có tìm thấy childField không
      if(childField){
          await childField.updateOne(req.body);
          res.status(200).json("Updated successfully");
      } else {
        res.status(400).json({error: 'Khong tim thay san con cua id'})
      }

    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Xoa 1 san con by ID
  deleteAChildField: async (req, res) => {
    try {
      const id = req.params.id;
      const document  = await ChildField.findById(id);

      if(document){
        //Xoa Id luu trong Field
        await Field.updateOne(
          {_id: document.field},
          {$pull: {childField: id}}
        )
        await document.deleteOne();

        res.status(200).json(`Deleted a ChildField`);
      } else {
        res.status(400).json({error: `Khong tim thay ChildField voi id = ` + id});
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
};

module.exports = ChildFieldController;
