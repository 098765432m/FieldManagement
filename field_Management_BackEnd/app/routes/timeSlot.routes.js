const router = require('express').Router();

const TimeSlotController = require('../controllers/timeSlot.controller');

router.route('/')
    .post(TimeSlotController.addTimeSlot);

router.route('/book/:id')
    .patch(TimeSlotController.bookTimeSlot);

router.route('/unBook/:id')
    .patch(TimeSlotController.unBookTimeSlot);

router.route('/:id')
    .get(TimeSlotController.getATimeSlot)
    .delete(TimeSlotController.deleteATimeSlot);


module.exports = router;