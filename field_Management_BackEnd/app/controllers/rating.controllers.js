const ApiError = require("../api-error");
const { Field, Customer, Rating } = require("../model/model");
const { calculateAverage } = require("../utils/helpers.util");

const RatingController = {

    // Add Rating
    addRating: async (req, res) => {
        try {
            //check req.body
            const validationError = new Rating(req.body).validateSync();
            if(validationError){
                throw new ApiError(400, validationError.message);
            }

            //check field ID
            const field_ID = req.body.field;
            const doc_Field = await Field.findById(field_ID);

            if(!doc_Field)
                throw new ApiError(400, `Field id: ${field_ID} is not exist`);

            // check customer ID
            const customer_ID = req.body.customer;
            const doc_Customer = await Customer.findById(customer_ID);

            if(!doc_Customer)
                throw new ApiError(400, `Customer id: ${customer_ID} is not exist`);

            const newRating = new Rating(req.body);
            const savedRating = await newRating.save();

            // Update Rating and Average Rating from Field
            doc_Field.rating.push(savedRating.rate);
            
            doc_Field.averageRating = calculateAverage(doc_Field.rating);
            await doc_Field.save();

            return res.status(200).json(savedRating);
        } catch (err) {
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json(err.message);
        }
    },

    // getAverageRatingByField: (req, res) => {
    //     try {
    //         const average = 0;
    //     } catch (err) {
    //         const statusCode = err.statusCode || 500;
    //         return res.status(statusCode).json(err.message);
    //     }
    // }

    // getRatingById: async (req, res) => {
    //     try {
    //         const ratingById = await Rating.findById(req.params.id).populate("field").populate("customer");
    //         res.status(200).json(ratingById);
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // },

    // getRatingByField: async (req,res) => {
    //     try {
    //         //Khai bao ObjectId nhưng phải cùng loại ObjectId với mongoose nếu không thì báo lỗi
    //         var ObjectId = require("mongoose").Types.ObjectId;
    //         const ratings = await Rating.find({field: new ObjectId(req.params.fieldId)});
    //         res.status(200).json(ratings);
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // },

    deleteRatingById: async (req, res) => {
        try {
            //check Rating ID
            const id = req.params.id;
            const doc_Rating = await Rating.findById(id);

            if(!doc_Rating){
                throw new ApiError(400, `There is no Rating with id: ${id}`);
            }

            //Check field id exist ?
            const field_ID = doc_Rating.field;
            const doc_Field = await Field.findById(field_ID);
            
            //Update rating and Average rating on Field
            const indexToRemove = doc_Field.rating.indexOf(doc_Rating.rate);
            //Remove 1 element in array
            doc_Field.rating.splice(indexToRemove, 1);
            
            doc_Field.averageRating = calculateAverage(doc_Field.rating);

            await doc_Field.save();

            await doc_Rating.deleteOne();
            return res.status(200).json("Deleted a rating");
        } catch (err) {
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({err : err.message})
        }
    },

    updateRatingById: async (req, res) => {
        try {
            //check id
            const id = req.params.id;
            const {comment, rate, field} = req.body;
            
            const doc_Rating = await Rating.findById(id);
            if(!doc_Rating)
                throw new ApiError(400, `There is no rating with id: ${id}`);

            if(rate === undefined || rate < 0 || rate > 5)
                throw new ApiError(400, `Rate is not valid`);

            if(field === undefined)
                throw new ApiError(500, `field ID are missing`);

            // Replace old rate
            const doc_Field = await Field.findById(field);
            const indexToRemove = doc_Field.rating.indexOf(doc_Rating.rate);

            doc_Field.rating.splice(indexToRemove, 1);
            doc_Field.rating.push(rate);
            doc_Field.averageRating = calculateAverage(doc_Field.rating);

            await doc_Field.save();

            //Update
            doc_Rating.rate = rate;
            doc_Rating.comment = comment;
            await doc_Rating.save();
            
            return res.status(200).json(doc_Rating);

        } catch (err) {
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({err: err.message});
        }
    }
}

module.exports = RatingController;