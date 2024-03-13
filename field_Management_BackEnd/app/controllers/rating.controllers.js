const { Field, Customer, Rating } = require("../model/model");

const RatingController = {
    addRating: async (req, res) => {
        try {
            const newRating = new Rating(req.body);
            const savedRating = await newRating.save();
            res.status(200).json(savedRating);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getRatingById: async (req, res) => {
        try {
            const ratingById = await Rating.findById(req.params.id).populate("field").populate("customer");
            res.status(200).json(ratingById);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getRatingByField: async (req,res) => {
        try {
            //Khai bao ObjectId nhưng phải cùng loại ObjectId với mongoose nếu không thì báo lỗi
            var ObjectId = require("mongoose").Types.ObjectId;
            const ratings = await Rating.find({field: new ObjectId(req.params.fieldId)});
            res.status(200).json(ratings);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteRatingById: async (req, res) => {
        try {
            await Rating.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted a rating");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateRatingById: async (req, res) => {
        try {
            // Tạo biến update rỗng
            let update = {};
            let filter = { _id: req.params.id };

            //check xem có giá trị rate trong input ?
            if (req.body.rate)
                update.rate = req.body.rate;

            //check xem có giá trị comment trong input ?
            if (req.body.comment)
                update.comment = req.body.comment;

            //tiến hành update giá trị
            // const rating = await Rating.findOneAndUpdate(filter, update);
            const rating = await Rating.updateOne(
                {_id: req.params.id},
                update
            )
            res.status(200).json(rating);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = RatingController;