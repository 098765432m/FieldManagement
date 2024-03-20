const express = require('express');
const cors = require("cors");
const app = express();
const morgan = require('morgan');

//Api Error

const ApiError = require("./app/api-error");

//import Router

const fieldsRouter = require("./app/routes/field.routes");
const sportsRouter = require("./app/routes/sport.routes");
const fieldManagerRouter = require("./app/routes/fieldManager.routes");
const fieldAccountsRouter = require("./app/routes/fieldAccounts.routes");
const customerRouter = require("./app/routes/customer.routes");
const ratingRouter = require("./app/routes/rating.routes");
const scheduleRouter = require("./app/routes/schedule.routes");
const childFieldRouter = require("./app/routes/childField.routes");
const timeSlotRouter = require('./app/routes/timeSlot.routes');

app.use(cors());
app.use(express.json());
//Morgan
app.use(morgan("common"));

//test server
app.get("/", (req, res) => {
    res.json({message: "Test Server"});
});

//Truyền Route
app.use("/api/Field", fieldsRouter);
app.use("/api/sports", sportsRouter);
app.use("/api/FieldManager", fieldManagerRouter);
app.use("/api/accounts", fieldAccountsRouter);
app.use("/api/customers", customerRouter);
app.use("/api/rating", ratingRouter);

app.use("/api/Schedule", scheduleRouter);
app.use("/api/ChildField", childFieldRouter);
app.use("/api/TimeSlot", timeSlotRouter);

//Lỗi 404
app.use((req,res,next) => {
    return next(new ApiError(404, "Không tìm thấy trang"));
});

//Lỗi hệ thống
app.use((err,req,res,next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Lỗi hệ thống",
    });
});

// const moment = require('moment');
// const duration = moment.duration('1:30', ).asMinutes();
// console.log(duration);


module.exports = app;