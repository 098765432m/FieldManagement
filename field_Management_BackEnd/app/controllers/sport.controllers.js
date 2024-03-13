const {Sport, Field} = require("../model/model");

const SportController = {
    addSport: async (req,res) => {
        try{
            const newSport = new Sport(req.body);
            const savedSport = await newSport.save();
            res.status(200).json(savedSport);
        }catch(err){
            res.status(500).json(err);
        }
    },

    getAllSport: async (req,res) => {
        try{
            const sports = await Sport.find();
            res.status(200).json(sports);
        }catch(err){
            res.status(500).json(err);
        }
    },

    getAnSport: async (req, res) => {
        try {
            const sport = await Sport.findById(req.params.id).populate("fields"); //populate giúp hiển thị đủ thông tin trường được ref
            res.status(200).json(sport);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateSport: async (req, res) => {
        try {
            const sport = await Sport.findById(req.params.id);
            await sport.updateOne(req.body);
            res.status(200).json("Update successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteSport: async (req,res) => {
        try {
            await Field.updateMany(
                {sports: req.params.id},
                {$pull: {sports: req.params.id}}
            )
            await Sport.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },
}

module.exports = SportController;