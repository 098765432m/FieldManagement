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
});

const TimeSlotSchema = new mongoose.Schema({
    customerName: {
        type: String,
    },
    startTime: {
        type:String,
        required: true,
    },
    endTime: {
        type:String,
        required: true,
    },

    childField: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChildField",
        required: true,
    },

    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
        required: true,
    },

    available: {
        type: Boolean,
        default: true,
    },
});

const ChildFieldSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    
    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Field",
        required: true,
    },
    
});



const ScheduleSchema = new mongoose.Schema({
    date: {
        type:String,
        required: true,
    },
    
    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Field",
        required: true,
    },
    
    timeSlot :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TimeSlot'
        }
    ]
    
})

const fieldSchema = new mongoose.Schema({
    //fieldName
    //fieldAddress
    //startWorkAt
    //endWorkAt
    //ownerPhoneNumber
    //childField
    //rating
    //Sport

    fieldName: {
        type: String,
        required: true,
        minlength: [4, "At least 4 characters, got {VALUE}"]
    },

    fieldAddress: {
        type: address,
        required: true
    },

    startWorkAt: {
        type: String,
        required: true,
    },

    endWorkAt: {
        type: String,
        required: true,
    },

    duration: {
        type: String,
        required: true,
    },

    fieldAccounts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FieldAccounts",
        required: true,
    },
    
    childField: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChildField",
        }
    ],

    rating: {
        type: Number,
        default: 0,
        min: [0, "Rating is too low, got {VALUE}"],
        max: [5, "Rating is too high, got {VALUE}"]
    },

    sport: {
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
        ref: "FieldManager",
        required: true
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
        default: '123',
    },

    email: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
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

let ChildField = mongoose.model("ChildField", ChildFieldSchema);
let Schedule = mongoose.model("Schedule", ScheduleSchema);
let TimeSlot = mongoose.model("TimeSlot", TimeSlotSchema);

module.exports = { Field, Sport, FieldManager, FieldAccounts , Customer, Rating, ChildField, Schedule, TimeSlot};