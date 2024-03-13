const mongoose = require("mongoose");

const address = new mongoose.Schema({
    duong: {
        type: String, 
        required: true
    },

    phuong: {
        type: String, 
        required: true
    },
    
    quan: {
        type: String, 
        required: true
    },
})

const fieldSchema = new mongoose.Schema({
    fieldName: {
        type: String,
        required: true,
        min: [4, "At least 4 characters, got {VALUE}"]
    },

    fieldAddress: {
        type: address, 
    },

    priceFrom: {
        type: Number,
        min: 0,
    },

    priceTo: {
        type: Number,
        min: 0,
    },

    ownerPhoneNumber: {
        type: String
    },

    rating: {
        type: Number,
        default: 0,
        min: [0, "Rating is too low, got {VALUE}"],
        max: [5, "Rating is too high, got {VALUE}"]
    },

    sport: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sport",
            required: true
        },
});

//Field's Manager Accounts
const FieldAccountsSchema = mongoose.Schema({
    //field
    //owner
    //staff

    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Field",
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FieldManager"
    },

    staff: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FieldManager"
        }
    ]
    
})

const sportSchema = mongoose.Schema({
    sportName: {
        type: String,
        required: true,
    },
    fields: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Field",
        },
    ]
});

const fieldManagerSchema = mongoose.Schema({
    // username
    // password
    // email
    // phoneNumber
    // role
    
    username: {
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },

    email: {
        type: String,
    },

    phoneNumber: {
        type: String,
    },

    role: {
        type: String,
        enum: {
            values: ['staff', 'owner'],
            message: `{VALUE} is not supported`,
        },
        default: 'staff',
    },
});

const customerSchema = mongoose.Schema({
    // username
    // password
    // email
    // phoneNumber

    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
    }
});

const RatingSchema = mongoose.Schema({
    rate: {
        type: Number,
        required: true,
        min: [0, "Rating is too low, got {VALUE}"],
        max: [5, "Rating is too high, got {VALUE}"]
    },

    comment: {
        type: String,
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },

    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Field",
        required: true,
    }
})

let Field = mongoose.model("Field", fieldSchema);
let Sport = mongoose.model("Sport", sportSchema);
let FieldManager = mongoose.model("FieldManager", fieldManagerSchema);
let FieldAccounts = mongoose.model("FieldAccounts", FieldAccountsSchema);
let Customer = mongoose.model("Customer", customerSchema);
let Rating = mongoose.model("Rating", RatingSchema);

module.exports = { Field, Sport, FieldManager, FieldAccounts , Customer, Rating};